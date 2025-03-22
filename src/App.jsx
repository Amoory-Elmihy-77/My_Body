import React from "react";
import organsMapping from "./assets/mapping_pc.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HumanModel from "./Components/HumanModel";
import "@fontsource/harmattan";
import Heart from "./Pages/Heart";

function App() {
  return (
    <div className="font-[Harmattan]" style={{ direction: "rtl" }}>
      <Router>
            <Routes>
                <Route path="/" element={<HumanModel />} />
                {organsMapping.map((organ, index) => (
                    <Route key={index} path={organ.route} element={<Heart />} />
                ))}
            </Routes>
        </Router>
    </div>
  );
}

export default App;
