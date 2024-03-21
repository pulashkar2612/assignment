import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifyOTP from "./components/VerifyOTP";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Home from "./components/Home";
// import Logout from "./components/Logout";
// import Admin from "./components/Admin";

function App() {

  const navigate = useNavigate();
  const handleLogout = () => {
    const checkedProducts = JSON.parse(localStorage.getItem("checkedProducts"));
    const updateCheckedProducts = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        if (authToken && checkedProducts) {
          const response = await fetch(`http://localhost:8081/updateCheckedProducts/${userId}`, {
            method: 'PUT', // or 'POST' depending on your backend API
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
        navigate('/login');
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
        <Route path="/login" element={<Login />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="*" element={<>Route Not Found</>} /> */}
      </Routes>
    </div>
  );
}

export default App;

