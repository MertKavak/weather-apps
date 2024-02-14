import React, { useEffect, useState } from "react";
import "./Weather.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import gunes_icon from "../Assets/images/günesli.png";
import inceyagmur_icon from "../Assets/images/ince-yagmur.png";
import kar_icon from "../Assets/images/karli.png";
import nem_icon from "../Assets/images/nem.png";
import parcali_icon from "../Assets/images/parcali-bulutlu.png";
import rain_icon from "../Assets/images/rain.png";
import wind_icon from "../Assets/images/wind.png";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { signOut, getAuth } from "firebase/auth";
import app from "../auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AirTwoTone,
  Logout,
  Translate,
  WaterTwoTone,
} from "@mui/icons-material";
export const auth = getAuth(app);

function Weather() {
  const location = useLocation();
  const user = location.state.user;

  console.log(user); // Burada kullanıcı verisini görebilmelisiniz
  let api_key = "6ffdce13cc0862fb1bf5746e93f5f00e";
  const [city, setCity] = useState(null);
  const [watherData, setWatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState([39.9334, 32.8597]);
  const navigate = useNavigate();

  console.log(position);

  const [wicon, setWicon] = useState(gunes_icon);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [zoom, setZoom] = useState(13);
  const [mapKey, setMapKey] = useState(Date.now());

  console.log(mapKey)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    try {
      await signOut(auth);

      navigate("/");
    } catch (error) {
      console.error("Çıkış hatası:", error.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&appid=${api_key}&units=metric`
        );
        setWatherData(response.data);
        const watherIcon = watherData.weather[0].icon;
        let iconMapping = gunes_icon; // Default icon if no match found

        switch (weatherIcon) {
          case "01d":
          case "01n":
            iconMapping = gunes_icon;
            break;
          case "02d":
          case "02n":
            iconMapping = parcali_icon;
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            iconMapping = inceyagmur_icon;
            break;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            iconMapping = rain_icon;
            break;
          case "11d":
          case "11n":
            iconMapping = kar_icon;
            break;
          // Add more cases as needed
          default:
            break;
        }

        setWicon(iconMapping);
      } catch (error) {
        return;
      }
    };
    fetch();
  }, [position, api_key]);

  useEffect(() => {
    const fetch = async () => {
      if (city !== null) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
          );
          console.log(response.data);
          setWatherData(response.data);
          const newPosition = [
            response.data.coord.lat,
            response.data.coord.lon,
          ];
          setPosition(newPosition);
          setMapKey(Date.now());
          const watherIcon = watherData.weather[0].icon;
          let iconMapping = gunes_icon; // Default icon if no match found

          switch (weatherIcon) {
            case "01d":
            case "01n":
              iconMapping = gunes_icon;
              break;
            case "02d":
            case "02n":
              iconMapping = parcali_icon;
              break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              iconMapping = inceyagmur_icon;
              break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
              iconMapping = rain_icon;
              break;
            case "11d":
            case "11n":
              iconMapping = kar_icon;
              break;
            // Add more cases as needed
            default:
              break;
          }

          setWicon(iconMapping);
        } catch (error) {
          return;
        }
      }
    };
    fetch();
  }, [city]);
  useEffect(() => {
    setPosition(position);
  }, [position]);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCity(search);
  };

  const costumIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [38, 38],
  });

  // Update the position and zoom when the map view changes

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log("Clicked at:", lat, lng);
    setPosition([lat, lng]);
  };
  return (
    <div className="container">
      <div className="map">
        <MapContainer key={mapKey} center={position} zoom={10}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={costumIcon}>
            <Popup>Seçilen Konum</Popup>
          </Marker>
          <MapEventWrapper handleMapClick={handleMapClick} />
        </MapContainer>
        <form className="form" onSubmit={handleSearchSubmit}>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box></Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TextField
                label="Şehir Giriniz"
                sx={{ bgcolor: "#fff" }}
                value={search}
                onChange={handleSearch}
                size="small"
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "rgb(244, 87, 87)",
                }}
              >
                Ara
              </Button>
            </Box>
            <Box>
              <Tooltip title="Profil">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, bgcolor: "rgb(244, 87, 87)" }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      src={user.photo}
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
                </IconButton>
              </Tooltip>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  sx={{
                    ":hover": { bgcolor: "rgb(244, 87, 87)" },
                  }}
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </form>
        {watherData && (
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translate(-50%, -10%)",
              zIndex: 100,
              bgcolor: "rgb(244, 87, 87)",
              padding: "0 10px",
            }}
          >
            <img
              src={wicon}
              loading="lazy"
              style={{
                scale: 0.6,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            />
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography component="div" variant="h5" color="#fff">
                  {watherData.main.temp.toFixed(0)} °C{" "}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {watherData.name}{" "}
                </Typography>
              </Box>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AirTwoTone sx={{ color: "text.secondary" }} />
                  <Typography
                    component="div"
                    variant="h5 "
                    color="text.secondary"
                  >
                    {watherData.wind.speed}km/h
                  </Typography>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <WaterTwoTone sx={{ color: "text.secondary" }} />
                  <Typography
                    component="div"
                    variant="h5 "
                    color="text.secondary"
                  >
                    {watherData.main.humidity}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
function MapEventWrapper({ handleMapClick }) {
  const map = useMapEvents({
    click: handleMapClick,
  });

  return null;
}

export default Weather;
