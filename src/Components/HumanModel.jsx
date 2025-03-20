import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Body from '../assets/images/final_body.png';
import organsMapping from '../assets/mapping_pc.json';


const ImageMap = () => {
  const navigate = useNavigate();

  // Function to handle area clicks
  const handleAreaClick = (path) => {
    navigate(path);
  };

    return (
        <div>
            <div
                style={{ maxHeight: '100vh' }}
                className="body flex justify-center items-center py-6">
                <img
                    className='max-h-screen aspect-auto'
                src={Body} // Replace with your image URL
                alt="Image Map"
                useMap="#image-map"
            />
            <map name="image-map">
                {/* Define clickable areas */}
                {organsMapping.slice(0, organsMapping.length).map((organ, index) => (
                    <area
                        key={index}
                        alt={organ.title}
                        title={organ.title}
                        onClick={() => handleAreaClick(organ.route)}
                        shape={organ.shape}
                        coords={organ.coords}
                    />
                ))}
            </map>
            </div>
        </div>
    );
};

export default ImageMap;

