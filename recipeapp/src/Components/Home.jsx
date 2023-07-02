import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material';

const Home = () => {
  const [cuisines, setCuisines] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCuisineData, setSelectedCuisineData] = useState(null);
  const [editedCuisine, setEditedCuisine] = useState('');
  const [editedDuration, setEditedDuration] = useState(0);
  const [editedServing, setEditedServing] = useState(0);
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      const response = await axios.get('/recipeslist');
      setCuisines(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch cuisine recipes. Please try again.');
    }
  };

  const deleteCuisine = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this cuisine?');
    if (confirmDelete) {
      try {
        await axios.delete(`/delete/${id}`);
        setCuisines((prevCuisines) => prevCuisines.filter((cuisine) => cuisine._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditClick = (cuisine) => {
    setSelectedCuisineData(cuisine);
    setEditedCuisine(cuisine.cuisineName);
    setEditedDuration(cuisine.duration);
    setEditedServing(cuisine.serving);
    setEditedImage(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('cuisineName', editedCuisine);
      formData.append('duration', editedDuration);
      formData.append('serving', editedServing);
      formData.append('image', editedImage || selectedCuisineData.image);

      await axios.put(`/updateitem/${selectedCuisineData._id}`, formData);
      setOpenDialog(false);
      // Refresh the cuisine list after updating
      fetchCuisines();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '140px 20px 20px 20px' }}>
      <br />
      {error ? (
        <div>{error}</div>
      ) : (
        <Grid container spacing={2}>
          {cuisines.map((cuisine) => (
            <Grid item xs={12} sm={6} md={3} key={cuisine._id}>
              <Card variant="outlined" style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Cuisine Name: {cuisine.cuisineName}
                  </Typography>
                  <img
                    src={cuisine.image}
                    alt="Cuisine"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon style={{ marginRight: '5px' }} />
                    <span>Duration: {cuisine.duration} minutes</span>
                    <div style={{ width: '10px' }}></div>
                    <GroupAddIcon style={{ marginRight: '9px' }} />
                    <span>Serving: {cuisine.serving}</span>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex' }}>
                    <Button variant="contained" onClick={() => handleEditClick(cuisine)}>
                      Edit
                    </Button>
                    <div style={{ width: '10px' }}></div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteCuisine(cuisine._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Cuisine</DialogTitle>
        <DialogContent style={{ paddingTop: '40px' }}>
          <TextField
            label="Cuisine Name"
            value={editedCuisine}
            onChange={(e) => setEditedCuisine(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <TextField
            label="Duration (minutes)"
            type="number"
            value={editedDuration}
            onChange={(e) => setEditedDuration(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <TextField
            label="Serving"
            type="number"
            value={editedServing}
            onChange={(e) => setEditedServing(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditedImage(e.target.files[0])}
          />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;







