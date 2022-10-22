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
                width: '150px',
                height: '150px',
                border: '1px solid black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => {
                onClick(position)
            }}
        >
            <div
                style={{
                    width: '75px',
                    height: '75px',
                    backgroundColor: capturedBy?.color,
                    borderStyle: 'dashed',
                    borderColor: 'red',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                }}
            >
                <p
                    style={{
                        textAlign: 'center',
                        alignSelf:'center',
                        margin: 0,
                    }}
                >
                    {capturedBy?.name}
                </p>
            </div>
        </div>
    );
};

export default GridSquare;
