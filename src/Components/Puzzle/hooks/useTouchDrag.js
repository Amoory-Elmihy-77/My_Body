import { useRef, useEffect } from 'react';

export const useTouchDrag = (onMovePiece) => {
    const touchDragRef = useRef({
        active: false,
        startX: 0,
        startY: 0,
        pieceId: null,
        elem: null,
        initialPosition: null
    });
    
    const ghostElemRef = useRef(null);

    useEffect(() => {
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
            if (ghostElemRef.current) {
                document.body.removeChild(ghostElemRef.current);
            }
        };
    }, []);

    const handleTouchStart = (e, pieceId, pieceElem, puzzleImage, piece) => {
        const touch = e.touches[0];
        
        // Store initial touch data
        touchDragRef.current = {
            active: true,
            startX: touch.clientX,
            startY: touch.clientY,
            pieceId: pieceId,
            elem: pieceElem,
            initialPosition: piece.currentPos
        };
        
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
            onMovePiece(touchDragRef.current.pieceId, targetPos);
            
            // Add drop feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }
        }
        
        // Reset touch drag state
        touchDragRef.current.active = false;
        
        // Remove highlights
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('drop-highlight');
        });
    };

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
}; 