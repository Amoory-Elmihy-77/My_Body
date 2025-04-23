import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import excellentSound from "../../assets/excellent.mp3";
import "./puzzle.css";

export default function Puzzle({puzzleImage}) {
    // State
    const [pieces, setPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const audioRef = useRef(new Audio(excellentSound));

    // Initialize puzzle
    useEffect(() => {
        initializePuzzle();
        audioRef.current.load();
    }, []);

    const initializePuzzle = () => {
        const positions = [0, 1, 2, 3];
        const initialPieces = positions.map(pos => {
            // Convert position to match visual layout (0,1,2,3 -> 1,0,3,2)
            let visualPos;
            switch(pos) {
                case 1: visualPos = 1; break; // top-left
                case 0: visualPos = 0; break; // top-right
                case 3: visualPos = 3; break; // bottom-left
                case 2: visualPos = 2; break; // bottom-right
                default: visualPos = pos;
            }
            return {
                id: pos,
                correctPos: visualPos,
                currentPos: null,
                backgroundPosition: `${pos % 2 ? '100%' : '0%'} ${Math.floor(pos / 2) ? '100%' : '0%'}`
            };
        });

        // All pieces start in the pieces container
        setPieces(initialPieces);
    };

    // Drag and Drop handlers
    const handleDragStart = (e, pieceId) => {
        e.dataTransfer.setData('piece', pieceId.toString());
    };

    const handleDrop = (e, targetPos) => {
        e.preventDefault();
        const draggedPieceId = parseInt(e.dataTransfer.getData('piece'));
        const draggedPiece = pieces.find(p => p.id === draggedPieceId);
        const targetPiece = pieces.find(p => p.currentPos === targetPos);

        if (draggedPiece.currentPos === targetPos) return;

        const newPieces = pieces.map(piece => {
            if (piece.id === draggedPieceId) {
                return { ...piece, currentPos: targetPos };
            }
            if (piece === targetPiece) {
                return { ...piece, currentPos: draggedPiece.currentPos };
            }
            return piece;
        });

        setPieces(newPieces);
        checkWinCondition(newPieces);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Game logic
    const checkWinCondition = (currentPieces) => {
        const isWin = currentPieces.every(piece => piece.currentPos === piece.correctPos);
        if (isWin && !isSolved) {
            setIsSolved(true);
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => console.log('Audio playback failed:', error));
            }
        }
    };

    const restartGame = () => {
        setIsSolved(false);
        initializePuzzle();
    };

    // Render puzzle piece
    const renderPiece = (piece) => (
        <div
            key={piece.id}
            className={`w-full h-full ${isSolved ? '' : 'rounded'}`}
            draggable={!isSolved}
            onDragStart={(e) => handleDragStart(e, piece.id)}
            style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundSize: '200% 200%',
                backgroundPosition: piece.backgroundPosition,
                backgroundRepeat: 'no-repeat'
            }}
        />
    );

    return (
        <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
            {/* Puzzle Board with background hint */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] border-4 border-gray-800 mb-6">
                {/* Background image with low opacity */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url(${puzzleImage})`,
                        backgroundSize: 'cover'
                    }}
                />
        
                {/* Puzzle board grid */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0">
                    {[1, 0, 3, 2].map(position => (
                        <div
                            key={position}
                            className={`${isSolved ? '' : 'border border-dashed border-gray-400'}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, position)}
                        >
                            {pieces.map(piece =>
                                piece.currentPos === position ? renderPiece(piece) : null
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pieces Container */}
            <div className={`bg-gray-200 p-2.5 rounded flex justify-center gap-4 mb-6 transition-opacity duration-500 ${isSolved ? 'opacity-0' : 'opacity-100'}`}>
                {pieces
                    .filter(piece => piece.currentPos === null)
                    .map(piece => (
                        <div key={piece.id} className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32">
                            {renderPiece(piece)}
                        </div>
                    ))}
            </div>

            {/* Success Message */}
            {isSolved && (
                <div className="success-message">
                    <div className="success-content">
                        <span className="success-text md:text-2xl lg:text-3xl">شطووور 👏</span>
                        <button
                            className="close-button"
                            onClick={() => setIsSolved(false)}
                        >
                            <XMarkIcon className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                    </div>
                </div>
            )}

            {/* Restart Button */}
            <button
                onClick={restartGame}
                className={`mt-4 px-4 py-2 md:px-6 md:py-3 md:text-lg lg:text-xl bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform duration-300 ${isSolved ? 'scale-110' : ''}`}
            >
                لعبة جديدة
            </button>
        </div>
    );
}