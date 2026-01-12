import  { useReducer } from 'react';
import './App.css';
import PokerTable from './PokerTable';
import Controls from './PlayerControls';

type Player = {
    id: string;
    name: string;
    balance: number;
};

type State = {
    players: Player[];
    pot: number;
};

type Action =
    | { type: 'ADD_PLAYER'; name: string; balance: number }
    | { type: 'ADD_TO_POT'; playerId: string; amount: number }
    | { type: 'DISTRIBUTE_POT'; winnerId: string }
    | { type: 'REMOVE_PLAYER'; playerId: string };



const initialState: State = {
    players: [],
    pot: 0,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_PLAYER': {
            const newPlayer: Player = {
                id: crypto.randomUUID(),
                name: action.name,
                balance: action.balance,
            };
            return { ...state, players: [...state.players, newPlayer] };
        }
        case 'ADD_TO_POT': {
            return {
                ...state,
                players: state.players.map((player) =>
                    player.id === action.playerId
                        ? { ...player, balance: player.balance - action.amount }
                        : player
                ),
                pot: state.pot + action.amount,
            };
        }
        case 'DISTRIBUTE_POT': {
            return {
                ...state,
                players: state.players.map((player) =>
                    player.id === action.winnerId
                        ? { ...player, balance: player.balance + state.pot }
                        : player
                ),
                pot: 0,
            };
        }
        case 'REMOVE_PLAYER': {
            // Filter out the player with the given ID
            return {
                ...state,
                players: state.players.filter((player) => player.id !== action.playerId),
            };
        }
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <PokerTable players={state.players} pot={state.pot} dispatch={dispatch} />
            <Controls players={state.players} pot={state.pot} dispatch={dispatch} />
        </div>
    );
}

export default App;