import React, { useRef, useState } from 'react';
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import excellentSound from "../../assets/excellent.mp3";
import "./puzzle.css";

export default function Puzzle({puzzleImage}) {
    const [isSolved, setIsSolved] = useState(false);
    const [key, setKey] = useState(Date.now());
    const audioRef = useRef(new Audio(excellentSound));

    const set = () => {
        setIsSolved(true);
        audioRef.current.play();
    };

    const closeMessage = () => {
        setIsSolved(false);
    };

    const restartGame = () => {
        setIsSolved(false);
        setKey(Date.now());
    };


    return (
        <>
            {/* Reset the JigsawPuzzle component by changing its key */}
            <JigsawPuzzle
                key={key}
                imageSrc={puzzleImage}
                rows={2}
                columns={2}
                onSolved={set}
                className="jigsaw-puzzle"
            />

            {/* Success message container with Tailwind */}
            {isSolved && (
                <div
                    className="w-[80%] xs:w-fit fixed top-1/5 sm:top-2/9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-1s solved-message"
                >
                    <div className="flex justify-around items-center bg-green-100 text-green-800 p-3 rounded-lg shadow-lg">
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
