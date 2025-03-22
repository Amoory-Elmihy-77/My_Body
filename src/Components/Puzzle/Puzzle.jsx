import React, { useState } from 'react';
import img from "../../assets/images/final_body_xs.png";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./puzzle.css";

export default function Puzzle() {
    const [isSolved, setIsSolved] = useState(false);
    const [key, setKey] = useState(Date.now());

    const set = () => {
        setIsSolved(true);
    };

    const closeMessage = () => {
        setIsSolved(false);
    };

    const restartGame = () => {
        setIsSolved(false);
        setKey(Date.now());
    };

    const handleClickOutside = (e) => {
        const successMessage = e.target.closest('.solved-message');
        if (!successMessage) {
            setIsSolved(false);
        }
    };

    return (
        <>
            {/* Reset the JigsawPuzzle component by changing its key */}
            <JigsawPuzzle
                key={key}
                imageSrc={img}
                rows={3}
                columns={3}
                onSolved={set}
                className="jigsaw-puzzle"
            />

            {/* Success message container with Tailwind */}
            {isSolved && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-1s solved-message"
                    onClick={handleClickOutside}
                >
                    <div className="flex justify-between items-center bg-green-100 text-green-800 p-3 rounded-lg shadow-lg">
                        <span className="text-lg font-semibold">شطووور 👏👏👏</span>
                        <button
                            className="p-1 rounded-full text-green-800 hover:text-red-500 transition duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeMessage();
                            }}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* New Game button */}
            <div className="text-center">
                <button
                    onClick={restartGame}
                    className="bg-[#007bff] text-white text-xl py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    لعبة جديدة
                </button>
            </div>
        </>
    );
}
