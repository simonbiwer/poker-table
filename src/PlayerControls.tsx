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
        <div className="controls">
            <h3>Add a Player</h3>
            <input
                type="text"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Starting Balance"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="no-arrows"
            />
            <button
                onClick={handleAddPlayer}
                style={{marginTop: '20px'}}
            >Add Player</button>

            {/* Divider for new functionality */}
            <hr />

            <h3>Distribute Pot</h3>
            <p>Current Pot: ${pot}</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                {/* Dropdown for Players */}
                <select
                    style={{
                        width: '100%', // Enforce full-width to prevent shrinking
                        padding: '8px',
                        fontSize: '1rem',
                        color: 'black', // Dropdown text color
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginBottom: '10px', // Add spacing below
                    }}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                >
                    <option value="">Select a Player</option>
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.name}
                        </option>
                    ))}
                </select>

                {/* Distribute Pot Button */}
                <button
                    onClick={handleDistributePot}
                    style={{
                        width: '100%', // Match the width of the dropdown
                        backgroundColor: '#FFA500', // Orange color
                        color: 'black', // Black text for readability
                        padding: '10px 15px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Distribute Pot
                </button>
            </div>
        </div>
    );
}