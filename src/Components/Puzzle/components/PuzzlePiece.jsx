import React from 'react';

const PuzzlePiece = ({ 
    piece, 
    isSolved, 
    draggedPiece, 
    puzzleImage, 
    onDragStart, 
    onTouchStart 
}) => {
    return (
        <div
            key={piece.id}
            className={`w-full h-full ${isSolved ? '' : 'rounded'} ${draggedPiece === piece.id ? 'opacity-50' : ''} transition-opacity duration-150`}
            draggable={!isSolved}
            onDragStart={(e) => onDragStart(e, piece.id)}
            ref={elem => {
                if (elem) {
                    elem.ontouchstart = (e) => onTouchStart(e, piece.id, elem, puzzleImage, piece);
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
};

export default PuzzlePiece; 