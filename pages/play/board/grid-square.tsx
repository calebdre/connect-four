import React from 'react';
import {Player} from "./board";

type GridSquareProps = {
    position: number
    onClick: (column: number) => void
    capturedBy: Player | undefined
}

const GridSquare: React.FC<GridSquareProps> = ({capturedBy, onClick, position}) => {
    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => {
                console.log("clicked", position)
                onClick(position)
            }}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: capturedBy?.color,
                    borderStyle: 'dashed',
                    borderColor: 'red',
                    borderRadius: '50%'
                }}
            >
                {capturedBy?.name}
            </div>
        </div>
    );
};

export default GridSquare;
