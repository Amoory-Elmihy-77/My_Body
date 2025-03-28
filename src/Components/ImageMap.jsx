import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Body from '../assets/images/final_body.png';
import organsMappingPc from '../assets/mapping_pc.json';
import organsMappingMobile from '../assets/mapping_mobile.json';
import organsMappingTablet from '../assets/mapping_tablet.json';
import organsMappingXs from '../assets/mapping_xs.json';

const ImageMap = () => {
    const navigate = useNavigate();
  
    // State to store the current organsMapping based on screen size
    const [organsMapping, setOrgansMapping] = useState(organsMappingMobile);

    // Function to handle area clicks
    const handleAreaClick = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const updateOrgansMapping = () => {
            const width = window.innerWidth;

            if (width >= 1024) { // lg breakpoint (>= 1024px)
                setOrgansMapping(organsMappingPc);
            } else if (width >= 560) { // md breakpoint (>= 768px)
                setOrgansMapping(organsMappingTablet);
            } else if (width >= 425) { // mobile
                setOrgansMapping(organsMappingMobile);
            }else{
                setOrgansMapping(organsMappingXs);
            }
        };

        updateOrgansMapping(); // Run initially

        // Listen for window resize to update organsMapping dynamically
        window.addEventListener('resize', updateOrgansMapping);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', updateOrgansMapping);
        };
    }, []); // Empty dependency array so this runs only on mount/unmount

    return (
        <div
            style={{ maxHeight: '100vh' }}
            className="body flex justify-center items-center py-6">
            <img
                className=" min-w-[320px] w-[320px] xs:w-[374px] sm:w-[492px] lg:w-[633px]"
                src={Body} // Replace with your image URL
                alt="Image Map"
                useMap="#image-map"
            />
            <map name="image-map">
                {/* Define clickable areas */}
                {organsMapping.map((organ, index) => (
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
    );
};

export default ImageMap;
