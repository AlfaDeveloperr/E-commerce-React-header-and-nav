import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box } from '@mui/material';
import { ShoppingCart, Login } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import './Nav.css';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const BrandSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
});

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  width: '100%',
  maxWidth: '500px',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
}));

function Nav() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '' && !searchHistory.includes(searchQuery)) {
      setSearchHistory([...searchHistory, searchQuery]);
    }
    setSearchQuery('');
  };

  return (
    
    <AppBar position="static" color="default"><br />
      <StyledToolbar>
        <BrandSection>
          <img
            alt="E-Commerce Logo"
            src="https://www.svgrepo.com/show/250771/ecommerce.svg"
            width="30"
            height="30"
          />
          <Typography variant="h6" color="warning" style={{ fontWeight: 'bold' }}>
            E-Commerce
          </Typography>
        </BrandSection>

        <SearchWrapper ref={wrapperRef}>
          <SearchIcon style={{ marginRight: '8px', color: '#757575' }} />
          <TextField
            variant="standard"
            placeholder="Bugün ne arıyorsunuz?"
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setIsFocused(true)}
          />
        </SearchWrapper>

        <ButtonGroup>
          <Button variant="outlined" color="warning" startIcon={<ShoppingCart />}>
            Sepet
          </Button>
          <Button variant="outlined" color="error" startIcon={<Login />}>
            Giriş
          </Button>
        </ButtonGroup>
      </StyledToolbar><br />

      {isFocused && searchHistory.length > 0 && (
        <div className="search-history">
          <Typography variant="h6">🔥 Popüler Aramalar</Typography>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </AppBar>
  );
}

export default Nav;
