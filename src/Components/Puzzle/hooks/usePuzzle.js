import { useState, useEffect } from 'react';

export const usePuzzle = (puzzleImage) => {
    const [pieces, setPieces] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        initializePuzzle();
        
        // Add a listener for any user interaction
        const markUserInteracted = () => setUserInteracted(true);
        document.addEventListener('mousedown', markUserInteracted);
        document.addEventListener('touchstart', markUserInteracted, { passive: true });
        document.addEventListener('keydown', markUserInteracted);
        
        return () => {
            document.removeEventListener('mousedown', markUserInteracted);
            document.removeEventListener('touchstart', markUserInteracted);
            document.removeEventListener('keydown', markUserInteracted);
        };
    }, []);

    const initializePuzzle = () => {
        const positions = [0, 1, 2, 3];
        const initialPieces = positions.map(pos => {
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

        setPieces(initialPieces);
        setDraggedPiece(null);
    };

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

    const checkWinCondition = (currentPieces) => {
        const isWin = currentPieces.every(piece => piece.currentPos === piece.correctPos);
        if (isWin && !isSolved) {
            setIsSolved(true);
        }
    };

    const restartGame = () => {
        setIsSolved(false);
        initializePuzzle();
    };

    return {
        pieces,
        isSolved,
        draggedPiece,
        userInteracted,
        setDraggedPiece,
        movePiece,
        restartGame,
        setIsSolved
    };
}; 