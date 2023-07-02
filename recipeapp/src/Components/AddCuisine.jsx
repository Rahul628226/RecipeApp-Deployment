import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, MenuItem } from '@mui/material';
import axios from 'axios';

const AddCuisine = () => {
  const [inp, setInp] = useState({
    cuisineCategory: '',
    cuisineName: '',
    duration: '',
    serving: '',
    image: null,
    language1: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const inpHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setInp((inp) => ({ ...inp, image: files[0] }));
    } else {
      setInp((inp) => ({ ...inp, [name]: value }));
    }
  };

  const clickHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('cuisineCategory', inp.cuisineCategory);
      formData.append('cuisineName', inp.cuisineName);
      formData.append('duration', inp.duration);
      formData.append('serving', inp.serving);
      formData.append('image', inp.image);
      formData.append('language1', inp.language1);

      const response = await axios.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);

      setSuccessMessage('Cuisine added successfully!');

      setInp({
        cuisineCategory: '',
        cuisineName: '',
        duration: '',
        serving: '',
        image: null,
        language1: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ paddingTop: '120px' }}>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Cuisine Details
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Cuisine Category"
                onChange={inpHandler}
                name="cuisineCategory"
                value={inp.cuisineCategory}
                fullWidth
                required
              >
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cuisine Name"
                onChange={inpHandler}
                name="cuisineName"
                value={inp.cuisineName}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration"
                onChange={inpHandler}
                name="duration"
                value={inp.duration}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Serving"
                onChange={inpHandler}
                name="serving"
                value={inp.serving}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                label="Image"
                onChange={inpHandler}
                name="image"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                onChange={inpHandler}
                name="language1"
                value={inp.language1}
                style={{ display: inp.language1 ? 'block' : 'none' }}
              />
            </Grid>
            {successMessage && (
              <Typography variant="body1" align="center" color="success" gutterBottom>
                {successMessage}
              </Typography>
            )}
            <Grid item xs={12}>
              <Button type="button" variant="contained" color="primary" onClick={clickHandler}>
                Add Cuisine
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddCuisine;

