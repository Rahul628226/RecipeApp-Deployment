import React from 'react'
import { AppBar, Button, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

        <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', height:'90px',background:"#3f8ac4" }}>
            <div>
            
            <Typography variant='h6'>Recipe App</Typography><img src='https://play-lh.googleusercontent.com/3L30Tsrmfd4JXDHEJmFk4tdYCqXVI5lZ4Ya-6lyKgGadgPxMwLwi3obg7HDqFXxjYPA' alt='Logo' style={{width:"60px",height:'60px'}}></img>
            </div>
            <div>
            <Button style={{ color: 'white' }}><Link to={'/Recipe-App'} style={{textDecoration:'none', color:"White",fontSize:"20px"}}>Home</Link></Button>
            <Button style={{ color: 'white' }}><Link to={'/addcuisine'} style={{textDecoration:'none', color:"White",fontSize:"20px"}}>Add Cuisine</Link></Button>
            <Button style={{ color: 'white' }}><Link to={'/Indian'} style={{textDecoration:'none', color:"White",fontSize:"20px"}}>Indian</Link></Button>
            <Button style={{ color: 'white' }}><Link to={'/Italian'} style={{textDecoration:'none', color:"White",fontSize:"20px"}}>Italian</Link></Button>
            <Button style={{ color: 'white' }}><Link to={'/Chines'} style={{textDecoration:'none', color:"White",fontSize:"20px"}}>Chinese</Link></Button>
            </div>
        </Toolbar>
        </AppBar>

      
    </div>
  )
}

export default Navbar
