import React, { useState } from 'react';

type Player = {
    id: string;
    name: string;
    balance: number;
};

type ControlsProps = {
    players: Player[];
    pot: number;
    dispatch: React.Dispatch<any>;
};


export default function Controls({ players, pot, dispatch }: ControlsProps) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(100);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);


  const handleAddPlayer = () => {
    if (name.trim()) {
      dispatch({ type: 'ADD_PLAYER', name, balance });
      setName('');
    }
  };

    // Handler for distributing the pot
    const handleDistributePot = () => {
        if (selectedPlayer) {
            dispatch({ type: 'DISTRIBUTE_POT', winnerId: selectedPlayer });
            setSelectedPlayer(null); // Clear selection after distribution
        }
    };


    return (
        <div
            className="controls"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <h3>Player Controls</h3>

            {/* Wrap Add a Player and Distribute Pot in a Flex Container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "20px", // Add spacing between sections
                    width: "100%", // Ensure full width is used
                }}
            >
                {/* Add a Player Section */}
                <div
                    style={{
                        backgroundColor: "#444",
                        padding: "15px",
                        borderRadius: "8px",
                        flex: 1, // Adjust to take equal space
                    }}
                >
                    <h4>Add a Player</h4>
                    <input
                        type="text"
                        placeholder="Player Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "80%",
                            padding: "8px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Starting Balance"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                        style={{
                            width: "80%",
                            padding: "8px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                        className="no-arrows"
                    />
                    <button
                        onClick={handleAddPlayer}
                        style={{
                            width: "89%",
                            backgroundColor: "#FFA500",
                            color: "black",
                            padding: "10px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Add Player
                    </button>
                </div>

                {/* Distribute Pot Section */}
                <div
                    style={{
                        backgroundColor: "#444",
                        padding: "15px",
                        borderRadius: "8px",
                        flex: 1, // Adjust to take equal space
                    }}
                >
                    <h4>Distribute Pot</h4>
                    <p>Current Pot: ${pot}</p>
                    <select
                        onChange={(e) => setSelectedPlayer(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="">Select a Player</option>
                        {players.map((player) => (
                            <option key={player.id} value={player.id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleDistributePot}
                        style={{
                            width: "100%",
                            backgroundColor: "#FFA500",
                            color: "black",
                            padding: "10px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Distribute Pot
                    </button>
                </div>
            </div>
        </div>
    );
}