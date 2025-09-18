import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import TaxCalculator from './TaxCalculator';
import AboutPage from './AboutPage';

function App() {
  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.35)',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'common.white',
                fontWeight: 600,
                letterSpacing: 0.4,
              }}
            >
              Tax Strategy Calculator
            </Typography>
            <Box>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 500, mr: 1 }}
              >
                Calculator
              </Button>
              <Button
                component={Link}
                to="/about"
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, display: 'flex' }}>
          <Routes>
            <Route path="/" element={<TaxCalculator />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
