import React, {useState} from 'react';

type Player = {
    id: string;
    name: string;
    balance: number;
};

type Props = {
    players: Player[];
    pot: number;
    dispatch: React.Dispatch<any>;
};

export default function PokerTable({ players, pot, dispatch }: Props) {
    const [selectedAmount, setSelectedAmount] = useState(0); // For the input value
    const tableRadiusX = 400; // Horizontal radius of the ellipse
    const tableRadiusY = 200; // Vertical radius of the ellipse
    const playerRadius = 30; // Radius of each player circle

    // Function to handle removing a player
    const handleRemovePlayer = (playerId: string, playerName: string) => {
        // Confirm the action before proceeding
        if (window.confirm(`Are you sure you want to remove ${playerName}?`)) {
            dispatch({ type: 'REMOVE_PLAYER', playerId });
        }
    };

    const handleAddToPot = (playerId: string) => {
        if (selectedAmount <= 0) {
            alert('Please enter a positive amount!');
            return;
        }

        if (selectedAmount > players.find((player) => player.id === playerId)?.balance!) {
            alert('Insufficient balance for this player!');
            return;
        }

        dispatch({ type: 'ADD_TO_POT', playerId, amount: selectedAmount });
        setSelectedAmount(0); // Reset input field
    };


    return (
        <div className="poker-table-layout">
            {/* Poker Table */}
            <div className="poker-table">
                <div className="pot">
                    <h2>Pot: ${pot}</h2>
                </div>
                {players.map((player, index) => {
                    // Calculate angle and coordinates for each player
                    const angle = (360 / players.length) * index * (Math.PI / 180); // Convert to radians
                    const playerX = Math.cos(angle) * tableRadiusX; // X-offset
                    const playerY = Math.sin(angle) * tableRadiusY; // Y-offset

                    return (
                        <div
                            className="player"
                            key={player.id}
                            style={{
                                left: `calc(50% + ${playerX}px)`, // Position on ellipse (horizontal)
                                top: `calc(50% + ${playerY}px)`, // Position on ellipse (vertical)
                                width: `${playerRadius * 2}px`,
                                height: `${playerRadius * 2}px`,
                                transform: 'translate(-50%, -50%)', // Center player
                            }}
                        >
                            {/* Hoverable Player Circle */}
                            <div
                                className="player-circle"
                                onClick={() => handleRemovePlayer(player.id, player.name)} // Use the handler when clicked
                                title={`Remove ${player.name}`}
                            >
                                <span className="hover-content">{player.name.charAt(0)}</span>
                            </div>

                            <div className="player-info">
                                <h4>{player.name}</h4>
                                <p>${player.balance}</p>
                                <input
                                    type="number"
                                    value={selectedAmount > 0 ? selectedAmount : ''}
                                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                                    placeholder="Enter amount"
                                    style={{
                                        width: '70px',
                                        padding: '4px',
                                        fontSize: '0.7rem',
                                        marginTop: '5px',
                                    }}
                                    className="no-arrows"
                                />

                                {/* Button to Add to Pot */}
                                <button
                                    onClick={() => handleAddToPot(player.id)}
                                    style={{
                                        marginTop: '5px',
                                        backgroundColor: '#FFA500',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Add to Pot
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}