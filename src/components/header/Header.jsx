import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar, ListItem, ListItemButton, Menu, MenuItem, Drawer, List, ListItemText, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import image1 from './iconfoody.png';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
});

const MenuBox = styled(Box)({
  display: 'flex',
  gap: 20,
  cursor: 'pointer',
});

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const user = useSelector(state => state.user.user);

  const renderAddToCart = () => {
    if (user) {
      return (
        <IconButton color="inherit" component={Link} to="/addtocart">
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      );
    }
    return null;
  };

  const handleOrderNow = () => {
    // Navigate the user to the cart page
    navigate('/order');
  };

  const handleProfile = () => {
    navigate('/profile')
  }

  return (
    <React.Fragment>
      <AppBar color='default' position='sticky' elevation={2} sx={{ minHeight: '50px' }}>
        <StyledToolbar>
          <Box flex={{ xs: 25, md: 1 }} sx={{ padding: "5px" }}>
            <Link to='/' className='logo'>
              <img alt='food logo' src={image1} width={'60px'} />
            </Link>
          </Box>
          <Box flex={7} sx={{ fontSize: "35px" }}>
            <Link to='/' style={{ textDecoration: "none", fontFamily: "Open Sans , sans-serif", color: "black" }}>
              FoodCrafters
            </Link>
          </Box>
          <MenuBox flex={1} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <ListItem button>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
            </ListItem>
            <ListItem button>
              <Link to="/catering" style={{ textDecoration: "none", color: "black" }}>Catering</Link>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleClick}>Menu</ListItemButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem component={Link} to="/menu-products" onClick={handleClose}>Product</MenuItem>
                {/* <MenuItem component={Link} to="/fixed-dish" onClick={handleClose}>Fixed Dish</MenuItem> */}
                <MenuItem component={Link} to="/menu-custom-dish" onClick={handleClose}>Custom Dish</MenuItem>
              </Menu>
            </ListItem>
            {renderAddToCart()}
            <ListItem button onClick={handleOrderNow}>
              <ListItemText primary="Order" />
            </ListItem>
            <AccountCircleIcon fontSize='medium' onClick={handleProfile}/>
            {user ? (
              <ListItem key="logout" button component={Link} to="/logout">
                <ListItemText primary="Logout" onClick={async () => {
                  await dispatch(logout())
                  navigate('/login')
                }} />
              </ListItem>
            ) : (
              <>
                <ListItem key="signup" button component={Link} to="/register">
                  <ListItemText primary="SignUp" />
                </ListItem>
                <ListItem key="signin" button component={Link} to="/login">
                  <ListItemText primary="SignIn" />
                </ListItem>
              </>
            )}
            
          </MenuBox>
          <Box flex={1} sx={{ marginLeft: "25px" }}>
            <MenuIcon
              sx={{ display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
              onClick={handleDrawerToggle}
            />
          </Box>
        </StyledToolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/catering">
            <ListItemText primary="Catering" />
          </ListItem>
          <ListItem button component={Link} to="/menu-products">
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem button component={Link} to="/custom-dish">
            <ListItemText primary="Custom Dish" />
          </ListItem>
          {/* <ListItem button component={Link} to="/fixed-dish">
            <ListItemText primary="Fixed Dish" />
          </ListItem> */}
          {renderAddToCart()}
          {user ? (
            <ListItem button onClick={async () => {
              await dispatch(logout());
              navigate('/login');
            }}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <>
              <ListItem button component={Link} to="/register">
                <ListItemText primary="SignUp" />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="SignIn" />
              </ListItem>
            </>
          )}
          <ListItem button onClick={handleOrderNow}>
            <ListItemText primary="Order" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;







// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppBar, Box, Toolbar, Typography, List, ListItem, Menu, MenuItem } from '@mui/material';
// import styled from '@emotion/styled';
// import MenuIcon from '@mui/icons-material/Menu';
// import image1 from './iconfoody.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../features/userSlice';
// import { ListItemText } from '@mui/material';

// const StyledToolbar = styled(Toolbar)({
//   display: 'flex',
//   alignItems: 'center',
// });

// const MenuBox = styled(Box)({
//   display: 'flex',
//   gap: 20,
//   cursor: 'pointer',
// });

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDocumentClick = (event) => {
//     if (anchorEl && !anchorEl.contains(event.target)) {
//       setAnchorEl(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleDocumentClick);

//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//     };
//   }, [anchorEl]);

//   const user = useSelector(state => state.user.user);

//   return (
//     <AppBar color='default' position='sticky' elevation={2} sx={{ minHeight: '50px' }}>
//       <StyledToolbar>
//         <Box flex={{ xs: 25, md: 1 }} sx={{ padding: "5px" }}>
//           <Link to='/' className='logo'>
//             <img alt='food logo' src={image1} width={'60px'} />
//           </Link>
//         </Box>
//         <Box flex={7} sx={{ fontSize: "35px" }}>
//           <Link to='/' style={{ textDecoration: "none", fontFamily: "Open Sans , sans-serif", color: "black" }}>
//             FoodCrafters
//           </Link>
//         </Box>
//         <MenuBox flex={1} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          // <ListItem button>
          //   <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
          // </ListItem>
          // <ListItem button>
          //   <Link to="/catering" style={{ textDecoration: "none", color: "black" }}>Catering</Link>
          // </ListItem>
//           <ListItem
//             button
//             ref={anchorEl}
//             id="demo-positioned-button"
//             aria-controls={open ? 'demo-positioned-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//             onClick={handleClick}
//           >
//             Menu
//             <Menu
//               id="demo-positioned-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={open}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//                 getContentAnchorEl: null
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'center',
//               }}
//             >
//               <MenuItem component={Link} to="/menu-products" onClick={handleClose} key="products">Product</MenuItem>
//               <MenuItem component={Link} to="/custom-dish" onClick={handleClose} key="custom-dish">Custom Dish</MenuItem>
//               <MenuItem component={Link} to="/fixed-dish" onClick={handleClose} key="fixed-dish">Fixed Dish</MenuItem>
//             </Menu>
//           </ListItem>
//           {user ? (
//             <ListItem key="logout" button component={Link} to="/logout">
//               <ListItemText primary="Logout" onClick={async () => {
//                 await dispatch(logout())
//                 navigate('/login')
//               }} />
//             </ListItem>
//           ) : (
//             <>
//               <ListItem key="signup" button component={Link} to="/register">
//                 <ListItemText primary="SignUp" />
//               </ListItem>
//               <ListItem key="signin" button component={Link} to="/login">
//                 <ListItemText primary="SignIn" />
//               </ListItem>
//             </>
//           )}
//         </MenuBox>
//         <Box flex={1} sx={{ marginLeft: "25px" }}>
//           <MenuIcon
//             sx={{ display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
//             onClick={handleClick}
//           />
//         </Box>
//       </StyledToolbar>
//     </AppBar>
//   );
// };

// export default Header;





