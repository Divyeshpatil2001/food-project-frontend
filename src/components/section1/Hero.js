// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import frankie1 from './frankie.jpg'
// import spicy from './spicy.jpg'
// import salad from './salad.jpeg'
// const Hero = () => {
//   return (
//         <Box
//             sx={{
//             position: 'relative',
//             height: '600px',
//             backgroundImage: `url(${frankie1})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             textAlign: 'left',
//             color: 'white',
//         }}
//     >
//         <Box sx={{ position: 'absolute', top: '38%', left: '28%', transform: 'translate(-50%, -50%)', zIndex: 1 ,fontSize:'xlarger'}}>
//             <Typography variant="h2" component="h1" gutterBottom sx={{fontFamily:"splash , cursive",color:'tomato'}}>
//                 Customized Dishes that Convince
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom >
//             "Bringing the perfect blend of taste and innovation to your plate."
//             </Typography>
//             <Button variant="contained" color="primary" size="large" style={{borderRadius:'50%',backgroundColor:'tomato'}}>
//             Order Now
//             </Button>
//         </Box>
//         </Box>
    

    


// )}
// export default Hero;





import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import frankie1 from './frankie.jpg';
import newsalad from './newsalad.jpg';
import chessy from './chessy.jpg';
import tandori from './tandori.jpg';
import gjthali from './gujaratithali.webp';
import TextField from '@mui/material/TextField';


const images = [frankie1, newsalad, chessy, tandori, gjthali];

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    centerMode: false,
    variableWidth: false,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Box
            sx={{
              position: 'relative',
              height: '100vh',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <img
              src={image}
              alt="Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                color: 'white',
              }}
            >
              <Typography variant="h2" component="h1" gutterBottom>
                Customized Dishes that Convince
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                "Bringing the perfect blend of taste and innovation to your plate."
              </Typography>
              <Button variant="contained" color="primary" size="large" style={{ borderRadius: '10%', fontSize:"25px", backgroundColor: 'white', color: 'black',marginTop:"25px" }}>
                Order Now
              </Button>
              
            </Box>
          </Box>
        </div>
      ))}
    </Slider>
  );
};

export default Hero;









