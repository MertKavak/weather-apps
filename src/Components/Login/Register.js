import React, { useState } from "react";
import { style } from "./styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Lottie from "lottie-react";
import loadings from "../Assets/loading.json";
import app from "../auth";
import {
  Button,
  Card,
  Link,
  Grid,
  TextField,
  Typography,
  Box,
  Slide,
  Alert,
  InputAdornment,
  Avatar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { EmailRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import EarthCloudsMap from "../Assets/8k_earth_clouds.jpg";

export const auth = getAuth(app);
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir email adresi giriniz.")
      .required("Email gerekli."),
    password: Yup.string()
      .required("Şifre alanı boş bırakılamaz")
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor.")
      .required("Tekrar şifre gerekli."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Firebase'e e-posta ve şifre ile kayıt olma isteği gönder
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        setLoading(false);
        navigate("/Home");
      } catch (error) {
        console.error("Kayıt olma hatası:", error.message);
        setLoading(false);
      }
    },
  });

  // const handlePassword = (passwordValue) => {
  //   const strengthChecks = {
  //     length: 0,
  //     hasUpperCase: false,
  //     hasLowerCase: false,
  //     hasDigit: false,
  //     hasSpecialChar: false,
  //   };

  //   strengthChecks.length = passwordValue.length >= 8 ? true : false;
  //   strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
  //   strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
  //   strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
  //   strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

  //   let verifiedList = Object.values(strengthChecks).filter((value) => value);

  //   let strength =
  //     verifiedList.length == 5
  //       ? "Strong"
  //       : verifiedList.length >= 2
  //       ? "Medium"
  //       : "Weak";

  //   setPassword(passwordValue);
  //   setProgress(`${(verifiedList.length / 5) * 100}%`);
  //   setMessage(strength);

  //   console.log("verifiedList: ", `${(verifiedList.length / 5) * 100}%`);
  // };

  // const getActiveColor = (type) => {
  //   if (type === "Strong") return "#8BC926";
  //   if (type === "Medium") return "#FEBD01";
  //   return "#FF0054";
  // };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
            <Grid
              container
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
                sm={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  required
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  id="email"
                  label="Email Giriniz"
                  name="email"
                  type="email"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  required
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  margin="normal"
                  id="password"
                  label="Şifre Giriniz"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
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
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  margin="normal"
                  required
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  id="confirmPassword"
                  label="Tekrar Şifre Giriniz"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
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
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <LoadingButton
                  loading={loading}
                  disabled={formik.isSubmitting || !formik.isValid}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, mb: 2 }}
                >
                  Kayıt Ol
                </LoadingButton>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Grid item>Üyeliğiniz varsa</Grid>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Tıklayın
                  </Link>
                </Grid>
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
          KULLANICI KAYIT
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Register;
