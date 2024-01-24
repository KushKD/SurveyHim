"use client";
import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Image from "next/image";

import Paper from "@mui/material/Paper";
import axios from "../network/api";
import Logo from "../assets/BackgroundLogin";

import AppLogo from "../assets/svg/himachal_logoo.svg";

import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Swal from "sweetalert2";

// import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from "../network/actions/login";
import { useDispatch, useSelector } from "react-redux";

import { saveToken, getUserName, getUlb } from "../utils/cookie";
// import handler from './api/hello';

import login from "../pages/api/signIn";
import withAuth from "../utils/withAuth";
import Head from "next/head";
import Script from "next/script";

const img = require("../../public/himachal_bg.jpeg");
const styling = {
  backgroundImage: `url('${img}')`,
  width: "100%",
  height: "100%",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="primary" align="center" {...props}>
      {"©"}
      <Link color="inherit" href="www.google.com">
        2023 Department of Digital Technologies and Governance
      </Link>
      {""}
      {/* {new Date().getFullYear()} */}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

function SignIn(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.login);

  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showAlert, setShowAlert] = React.useState(false);

  const [message, setMessage] = React.useState({ message: "", type: "" });

  const [loginCalled, setLoginCalled] = React.useState(false);

  const [user, setuser] = React.useState(false);
  const [ulb, setulb] = React.useState(false);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };

  useEffect(() => {
    if (loginCalled) {
      const { data: user_data } = data || {};

      const { token } = user_data || {};

      setLoginCalled(false);

      if (user_data.data) {
        handleClick();
        console.log("user_data.data", user_data.data);
        saveToken(user_data.data);
        setMessage({ message: "Access Granted", type: "success" });
        router.push("/dashboard");
      } else if (data?.error?.message.includes("401")) {
        handleClick();
        setMessage({ message: "Access denied", type: "error" });
      }
    }
  }, [data]);

  useEffect(() => {
    let username = getUserName();
    let ulb = getUlb();

    if (username) {
      username = JSON.parse(username);
      setuser(username);
    }
    if (ulb) {
      ulb = JSON.parse(ulb);
      setulb(ulb);
    }

    console.log(username, ulb, "askjdqwkjadqowialksdaioskl");

    // if (ulb && username) {
    //   Swal.fire({
    //     title: "You have already Logged In. Proceed to Dashboard",
    //     showClass: {
    //       popup: `
    //     animate__animated
    //     animate__fadeInUp
    //     animate__faster
    //   `
    //     },
    //     hideClass: {
    //       popup: `
    //     animate__animated
    //     animate__fadeOutDown
    //     animate__faster
    //   `
    //     }
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       router.push('/dashboard');
    //     }
    //   });

    // }
  }, []);

  const showAlreadyLoggedIn = () => {};

  const handlePost = () => {
    setLoginCalled(true);

    console.log("asldaskmdalkdalfeiow");
    dispatch(onLogin(username, password));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const getIframe = () => {
    getIframeSSO("10000041");
  };

  return (
    <div
      style={{
        backgroundImage: `url('/urban/himachal_bg.jpeg')`, // Reference the image in the public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%", // Set the desired height
        backgroundColor: "rgba(0, 0, 0, 0.1)", // 0.5 opacity (adjust as needed)
      }}
    >
      <div class="backdrop"></div>{" "}
      <div id="iframeContainer" class="iframe-container"></div>
      <Script src="https://sso.hp.gov.in/nodeapi/iframe/iframe.js" />
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Paper
          elevation={15}
          style={{ margin: 20, padding: 10, borderRadius: 10 }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* < Logo /> */}
              <Image src={AppLogo} width={80} height={50} alt="Logo" />

              <Typography
                align="center"
                color="inherit"
                sx={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  mb: 1,
                }}
                variant="h3"
              >
                Welcome to{" "}
                <Box sx={{ color: "#6366F1" }} target="_blank">
                  Himachal Parivar Register (Urban)
                </Box>
              </Typography>

              {user && ulb ? (
                <>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "28px",
                      mb: 1,
                      mt: 6,
                    }}
                  >
                    Welcome {user}
                  </Typography>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      router.push("./dashboard");
                    }}
                  >
                    Proceed
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      lineHeight: "28px",
                      mb: 1,
                    }}
                  >
                    Please Sign In to Continue
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Username"
                      name="email"
                      autoComplete="email"
                      onChange={(event) => setUsername(event.target.value)}
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        handlePost();
                      }}
                    >
                      Sign In
                    </Button>
                    {/* 
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={getIframe}
                      style={{ marginTop: 10 }}
                    >
                      Sign In with SSO
                    </Button> */}

                    {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
                  </Box>
                </>
              )}
            </Box>

            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Paper>
      </Grid>
    </div>
  );
}

export default withAuth(SignIn);
