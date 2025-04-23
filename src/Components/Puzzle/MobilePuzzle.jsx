import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import excellentSound from "../../assets/excellent.mp3";
import "./mobile-puzzle.css";

export default function MobilePuzzle({puzzleImage}) {
    // State
    const [pieces, setPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [userInteracted, setUserInteracted] = useState(false);
    const [touchTarget, setTouchTarget] = useState(null);
    const audioRef = useRef(new Audio(excellentSound));
    
    // Refs for touch drag tracking
    const touchDragRef = useRef({
        active: false,
        startX: 0,
        startY: 0,
        pieceId: null,
        elem: null,
        initialPosition: null
    });
    
    // Ghost element for visual feedback during touch drag
    const ghostElemRef = useRef(null);

    // Initialize puzzle
    useEffect(() => {
        initializePuzzle();
        audioRef.current.load();
        
        // Add a listener for any user interaction
        const markUserInteracted = () => setUserInteracted(true);
        document.addEventListener('mousedown', markUserInteracted);
        document.addEventListener('touchstart', markUserInteracted, { passive: true });
        document.addEventListener('keydown', markUserInteracted);
        
        // Setup ghost element for drag visualization
        const ghostElem = document.createElement('div');
        ghostElem.className = 'ghost-piece';
        ghostElem.style.position = 'absolute';
        ghostElem.style.pointerEvents = 'none';
        ghostElem.style.zIndex = '1000';
        ghostElem.style.opacity = '0.8';
        ghostElem.style.transform = 'translate(-50%, -50%)';
        ghostElem.style.display = 'none';
        document.body.appendChild(ghostElem);
        ghostElemRef.current = ghostElem;
        
        return () => {
            document.removeEventListener('mousedown', markUserInteracted);
            document.removeEventListener('touchstart', markUserInteracted);
            document.removeEventListener('keydown', markUserInteracted);
            
            // Clean up ghost element
            if (ghostElemRef.current) {
                document.body.removeChild(ghostElemRef.current);
            }
        };
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
        setDraggedPiece(null);
    };

    // Enhanced Mobile touch handlers
    const handleTouchStart = (e, pieceId, pieceElem) => {
        if (isSolved) return;
        
        const touch = e.touches[0];
        const piece = pieces.find(p => p.id === pieceId);
        
        // Store initial touch data
        touchDragRef.current = {
            active: true,
            startX: touch.clientX,
            startY: touch.clientY,
            pieceId: pieceId,
            elem: pieceElem,
            initialPosition: piece.currentPos
        };
        
        setDraggedPiece(pieceId);
        
        // Set up ghost element for visual feedback
        if (ghostElemRef.current && pieceElem) {
            const rect = pieceElem.getBoundingClientRect();
            ghostElemRef.current.style.width = `${rect.width}px`;
            ghostElemRef.current.style.height = `${rect.height}px`;
            ghostElemRef.current.style.backgroundImage = `url(${puzzleImage})`;
            ghostElemRef.current.style.backgroundSize = '200% 200%';
            ghostElemRef.current.style.backgroundPosition = piece.backgroundPosition;
            ghostElemRef.current.style.left = `${touch.clientX}px`;
            ghostElemRef.current.style.top = `${touch.clientY}px`;
            ghostElemRef.current.style.display = 'block';
            ghostElemRef.current.style.borderRadius = '8px';
        }
        
        // Add vibration feedback if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    };

    const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent scrolling while dragging
        
        if (!touchDragRef.current.active || !ghostElemRef.current) return;
        
        const touch = e.touches[0];
        
        // Move the ghost element to follow touch
        ghostElemRef.current.style.left = `${touch.clientX}px`;
        ghostElemRef.current.style.top = `${touch.clientY}px`;
        
        // Find element under touch
        const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const gridCell = elemBelow?.closest('.grid-cell');
        
        // Highlight drop zones
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('drop-highlight');
        });
        
        if (gridCell) {
            gridCell.classList.add('drop-highlight');
        }
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        
        if (!touchDragRef.current.active) return;
        
        // Hide ghost element
        if (ghostElemRef.current) {
            ghostElemRef.current.style.display = 'none';
        }
        
        // Find the drop target
        const lastTouch = e.changedTouches[0];
        const dropElem = document.elementFromPoint(lastTouch.clientX, lastTouch.clientY);
        const gridCell = dropElem?.closest('.grid-cell');
        
        if (gridCell && touchDragRef.current.pieceId !== null) {
            const targetPos = parseInt(gridCell.dataset.position);
            movePiece(touchDragRef.current.pieceId, targetPos);
            
            // Add drop feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
        }
        
        // Reset touch drag state
        touchDragRef.current.active = false;
        setDraggedPiece(null);
        
        // Remove highlights
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('drop-highlight');
        });
    };

    // Common piece movement logic
    const movePiece = (draggedPieceId, targetPos) => {
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

    // Game logic
    const checkWinCondition = (currentPieces) => {
        const isWin = currentPieces.every(piece => piece.currentPos === piece.correctPos);
        if (isWin && !isSolved) {
            setIsSolved(true);
            // Only try to play sound if user has interacted with the page
            if (userInteracted) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log('Audio playback failed:', error));
                }
            }
        }
    };

    const restartGame = () => {
        setIsSolved(false);
        initializePuzzle();
    };

    // Render puzzle piece with ref to access the element
    const renderPiece = (piece) => (
        <div
            key={piece.id}
            className={`w-full h-full ${isSolved ? '' : 'rounded'} ${draggedPiece === piece.id ? 'opacity-50' : ''} transition-opacity duration-150`}
            draggable={!isSolved}
            ref={elem => {
                // Store reference to the element for touch handling
                if (elem) {
                    elem.ontouchstart = (e) => handleTouchStart(e, piece.id, elem);
                }
            }}
            style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundSize: '200% 200%',
                backgroundPosition: piece.backgroundPosition,
                backgroundRepeat: 'no-repeat'
            }}
        />
    );

    return (
        <div 
            className="flex flex-col items-center p-4 max-w-lg mx-auto"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
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
                            data-position={position}
                            className={`grid-cell ${isSolved ? '' : 'border border-dashed border-gray-400'} transition-all duration-200`}
                        >
                            {pieces.map(piece =>
                                piece.currentPos === position ? renderPiece(piece) : null
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pieces Container */}
            <div 
                className={`bg-gray-200 p-2.5 rounded flex justify-center gap-4 mb-6 transition-opacity duration-500 ${isSolved ? 'opacity-0' : 'opacity-100'}`}
                data-position="null"
            >
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