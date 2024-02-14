import Login from "./Components/Login/Login";
import Weather from "./Components/Home/Weather";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Components/auth";

import Register from "./Components/Login/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";

export const auth = getAuth(app);
function App() {
 

  return (
    <Routes>
            <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Home" element={<Weather />} />

    </Routes>
  );
}

export default App;
