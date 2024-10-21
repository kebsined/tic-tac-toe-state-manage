import styles from './Button.module.css';
import PropTypes from 'prop-types';
import { store } from '../../store';
import { useState, useEffect } from 'react';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const checkWinner = (fields, currentPlayer) => {
	return WIN_PATTERNS.some(pattern =>
		pattern.every(index => fields[index] === currentPlayer)
	);
};

export const Button = ({ i, item }) => {
	const [state, setState] = useState(store.getState());
	const { fields, currentPlayer, isDraw, isGameEnded } = store.getState();

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
			return () => {
				unsubscribe();
			};
		});
	}, []);

	const setPlayerFields = i => {
		const playerFields = fields.slice();
		playerFields[i] = currentPlayer;
		return playerFields;
	};

	const setCurrentPlayer = () => {
		return currentPlayer === String.fromCharCode(10008)
			? String.fromCharCode(10683)
			: String.fromCharCode(10008);
	};

	const setIsDraw = () => {
		return !store.getState().fields.includes('');
	};

	const currentPlayerTurn = i => {
		if (isGameEnded || isDraw || fields[i] !== '') {
			return;
		}

		store.dispatch({ type: 'SET_FIELDS', payload: setPlayerFields(i) });

		store.dispatch({
			type: 'SET_IS_GAME_ENDED',
			payload: checkWinner(
				store.getState().fields,
				store.getState().currentPlayer
			),
		});
		if (!checkWinner(store.getState().fields, currentPlayer)) {
			store.dispatch({
				type: 'SET_CURRENT_PLAYER',
				payload: setCurrentPlayer(),
			});
			store.dispatch({
				type: 'SET_IS_DRAW',
				payload: setIsDraw(),
			});
		}
	};
	return (
		<button
			className={styles.button}
			onClick={() => currentPlayerTurn(i)}
			disabled={item}
		>
			{item}
		</button>
	);
};

Button.propTypes = {
	item: PropTypes.string,
	playerClick: PropTypes.func,
	index: PropTypes.number,
};
