import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

const SuccessMessage = ({ onClose }) => {
    return (
        <div className="success-message">
            <div className="success-content">
                <span className="success-text md:text-2xl lg:text-3xl">شطووور 👏</span>
                <button
                    className="close-button"
                    onClick={onClose}
                >
                    <XMarkIcon className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>
        </div>
    );
};

export default SuccessMessage; 