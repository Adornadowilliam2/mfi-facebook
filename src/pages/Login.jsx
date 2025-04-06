import { useState } from "react";
import { TextField, Button, Container, Box, Typography, IconButton } from "@mui/material";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material"; // Import visibility icons
import { login as loginApi } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import $ from "jquery";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

import Home from "./Home";
import checkAuth from "../hoc/checkAuth";

function Login({ retrieve }) {
  const user = useSelector((state) => state.auth.user);
  const [warnings, setWarnings] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: $("#username").val(),
      password: $("#password").val(),
    };
    loginApi(body).then((res) => {
      if (res?.ok) {
        toast.success(res.message);
        setWarnings({});
        navigate("/");
        setCookie("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
    
      } else {
        toast.error(res.message);
        setWarnings(res?.errors);
      }
    });
  };

  return (
    <>
      {!user ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
          id="bg"
        >
          <>
            <img
              src="https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"
              alt="mfi logo"
              style={{
                width: "100px",
                display: "block",
                margin: "0 auto",
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ccc",
              }}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              style={{
                width: "300px",
                padding: "20px",
                borderRadius: "5px",
                marginTop: "10px",
                border: "1px solid #ccc",
              }}
              id="form"
            >
              <h2 style={{ textAlign: "center" }}>Login</h2>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                id="username"
                InputProps={{
                  startAdornment: <Person style={{ marginRight: "8px" }} />,
                }}
                placeholder="Enter your username"
            
                required
              />

              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"} 
                fullWidth
                margin="normal"
                id="password"
                InputProps={{
                  startAdornment: <Lock style={{ marginRight: "8px" }} />,
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />} 
                    </IconButton>
                  ),
                }}
                placeholder="Enter your password"
          
                required
              />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
                <Link to="/register" style={{ color: "black", textDecoration: "none" }}>
                  Don't have an account? <span style={{ color: "blue" }}>Register</span>
                </Link>
              </Typography>
            </Box>
          </>
        </Container>
      ) : (
        <Home />
      )}
    </>
  );
}

export default checkAuth(Login);
