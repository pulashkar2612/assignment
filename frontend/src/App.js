import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifyOTP from "./components/VerifyOTP";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Home from "./components/Home";

function App() {

  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };
  const handleLogout = () => {
    const checkedProducts = JSON.parse(localStorage.getItem("checkedProducts"));
    const updateCheckedProducts = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        if (authToken && checkedProducts) {
          const response = await fetch(`http://localhost:8081/updateCheckedProducts/${userId}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ checkedProducts })
          });
          const data = await response.json();
          console.log('Updated checkedProducts data:', data);
        }
        localStorage.clear();
        navigate('/');
      } catch (error) {
        console.error('Error updating checkedProducts:', error);
      }
    };

    updateCheckedProducts();
  };
  return (
    <div className="App">
      <AppBar position="fixed" sx={{ color: 'black', backgroundColor: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ECOMMERCE
          </Typography>
          {localStorage.getItem('token') && <ExitToAppIcon onClick={handleLogout} />}

        </Toolbar>
      </AppBar>
      <Box pt={7} sx={{ backgroundColor: '#c1c1c18f' }}>
        <Typography>
          Get 10% off on business sign up
        </Typography>
      </Box>


      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        {isAuthenticated() ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

