import React from "react";
import ImageMap from "./Components/HumanModel";
import organsMapping from "./assets/mapping_pc.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ direction: "rtl" }}>
      <Router>
            <Routes>
                <Route path="/" element={<ImageMap />} />
                {organsMapping.map((organ, index) => (
                    <Route key={index} path={organ.route} element={<h1>انا {organ.title}</h1>} />
                ))}
            </Routes>
        </Router>
    </div>
  );
}

export default App;
