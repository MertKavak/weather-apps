import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import app from "../auth";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CardHeader,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  CheckBox,
  EmailRounded,
  Google,
  KeyOutlined,
  Password,
  PasswordOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export const auth = getAuth(app);
function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userMessage, setUserMessage] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir email adresi giriniz.")
      .required("Email gerekli."),
    password: Yup.string()
      .required("Şifre alanı boş bırakılamaz")
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Firebase'e e-posta ve şifre ile kayıt olma isteği gönder
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        navigate("/Home");
      } catch (error) {
        setUserMessage(true);
      }
    },
  });
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;

      const serializableUser = {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      navigate("/Home", { state: { user: serializableUser } });
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.
      const email = error.customData ? error.customData.email : null;

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      // Handle the error or display a message to the user
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={6} sm={6} container>
        <Box
          sx={{
            mt: 5,
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Slide
            direction="right"
            in={userMessage}
            mountOnEnter
            unmountOnExit
            sx={{ position: "relative", left: 0 }}
          >
            <Alert severity="error">Kayıtlı Kullanıcı Bulunamadı</Alert>
          </Slide>

          <Avatar sx={{ width: 40, height: 40 }}>
            <img
            src="https://www.logovector.org/wp-content/uploads/logos/png/d/dunya_logo.png"
              alt="User Photo"
              style={{
                display: "block",
                margin: "auto",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </Avatar>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              size="small"
              id="email"
              label="Email Address"
              name="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              margin="normal"
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              size="small"
              name="password"
              label="Şifre"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOff
                        fontSize="small"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Visibility
                        fontSize="small"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Button
              
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Giriş Yap
            </Button>
            <Button
              endIcon={<img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" style={{ width:"20px", height:"20px"}} /> }
              onClick={handleGoogleSignIn}
              fullWidth
              variant="outlined"
              
              sx={{  mb: 2 }}
             
            >
              Google Giriş
            </Button>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Grid item>Don't have an account?</Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        sx={{
          position: "relative",
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%", // Set the height to cover the entire Grid item
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            backdropFilter: "blur(5px)",
            opacity: "0.8",
          }}
          variant="h4"
          component="h2"
          textAlign="center"
          fontWeight={400}
        >
          GİRİŞ YAP
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Login;
