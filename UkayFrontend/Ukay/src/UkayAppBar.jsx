import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Checkroom as CheckroomIcon, AccountCircle as AccountCircleIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import CartPage from './CartPage';
import ProductsPage from './ProductsPage';

const pages = ['Product Listing', 'Sell A Product'];
const settings = ['Login', 'Register', 'Orders', 'Update Account'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.sellId === product.sellId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.sellId === product.sellId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setCartDrawerOpen(true);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page) => {
    if (page === 'Sell A Product') {
      navigate('/sell');
    } else if (page === 'Product Listing') {
      navigate('/products');
    } else if (page === 'Cart') {
      navigate('/cart');
    } else if (page === 'Buyer Payment'){
      navigate('/payment');
    }
    handleCloseNavMenu();
  };

  const handleSettingClick = (setting) => {
    if (setting === 'Login') {
      navigate('/login');
    } else if (setting === 'Register') {
      navigate('/register');
    } else if (setting === 'Cart') {
      navigate('/cart');
    } else if (setting === 'Orders') {
      navigate('/order');
    } else if(setting === 'Buyer Payment'){
      navigate('/payment');
    }
    handleCloseUserMenu();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleDrawerClose = () => {
    setCartDrawerOpen(false);
  };

  const handleUpdateQuantity = (index, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0D0F1F' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CheckroomIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Lobster, Sans Serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                position: 'relative',
                textDecoration: 'none',
                color: '#E99E00',
                background: 'linear-gradient(to right, #E99E00, white)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 100%',
                backgroundPosition: '200% 0',
                transition: 'background-position 1.0s ease',
                '&:hover': {
                  backgroundPosition: '0 0',
                  WebkitTextFillColor: 'transparent',
                },
              }}
            >
              U-Kay
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={() => handlePageClick(page)} 
              variant="text" 
              sx={{ 
                width: '30%', 
                color: '#f5f5f5', 
                borderRadius: '0px', 
                position: 'relative', 
                textTransform: 'capitalize',
                overflow: 'hidden',
                '&:focus': { outline: 'none' },
                '&::after': {
                  content: '""', 
                  position: 'absolute', 
                  bottom: 0, 
                  left: '0%', 
                  width: '100%', 
                  height: '1.5px',
                  backgroundColor: '#0D0F1F',  
                  transform: 'scaleX(0)', 
                  transformOrigin: 'bottom right',
                  transition: 'transform 1s ease, background-color 0.5s ease', 
                },
                '&:hover': { 
                  '&::after': {
                    backgroundColor: '#E99E00', 
                    transform: 'scaleX(1)', 
                    transformOrigin: 'bottom left',
                  },
                },
              }} 
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx: 2}}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              sx={{ backgroundColor: 'white', borderRadius: 1, width: '500px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Cart">
              <IconButton onClick={() => setCartDrawerOpen(true)} 
                sx={{ p: 0, color: 'white', mr: 2,'&:focus': { outline: 'none' },'&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }  }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} 
                sx={{ p: 0, color: 'white','&:focus': { outline: 'none' },'&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }  }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Cart Drawer using CartPage Component */}
      <CartPage
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        handleViewCart={() => {}}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;