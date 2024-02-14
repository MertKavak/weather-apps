import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import EarthDayMap from "../Assets/8k_earth_daymap.jpg";
import EarthNormalMap from "../Assets/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../Assets/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../Assets/8k_earth_clouds.jpg";
import { TextureLoader } from "three";
import Earth from "./Earth";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const LetterByLetterText = ({ text }) => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const handleContinueClick = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#01040c",
      }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
          <Stars
            radius={300}
            depth={60}
            count={20000}
            factor={7}
            saturation={0}
            fade={true}
          />
          <ambientLight intensity={1} />

          <Earth />
        </Suspense>
      </Canvas>
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          color: "#fff",

          padding: "10px",
        }}
        variant="p"
        component="h2"
        textAlign="center"
        fontWeight={300}
      >
        <LetterByLetterText text="En Güncel Hava Durumu Servisi İçin Hoşgeldiniz." />
      </Typography>
      <LoadingButton
        type="submit"
        variant="contained"
        sx={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -20%)",
        }}
        onClick={handleContinueClick}
      >
        Devam Et
      </LoadingButton>
    </div>
  );
}

export default Home;
