import { useState } from 'react';
import { PoolLayout } from './components/Pool/Pool';
import { InfoLayout } from './components/Info/Info';
import styles from './App.module.css';

const player = {
	crosses: String.fromCharCode(10008),
	noughts: String.fromCharCode(10683),
};

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
	if (
		WIN_PATTERNS.some((pattern) =>
			pattern.every((index) => fields[index] === currentPlayer),
		)
	) {
		return true;
	}
};

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState(player.crosses);
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [fields, setFields] = useState(['', '', '', '', '', '', '', '', '']);

	const playerClick = (index) => {
		if (isGameEnded) {
			return;
		}
		const playerFields = fields.slice();
		playerFields[index] = currentPlayer;
		setFields(playerFields);
		if (checkWinner(playerFields, currentPlayer)) {
			setIsGameEnded(true);
			return;
		}
		if (!playerFields.some((item) => item === '')) {
			setIsDraw(true);
			setIsGameEnded(true);
		}

		setCurrentPlayer(
			currentPlayer === player.crosses ? player.noughts : player.crosses,
		);
	};

	const beginClick = () => {
		setCurrentPlayer(player.crosses);
		setFields(Array(9).fill(''));
		setIsGameEnded(false);
		setIsDraw(false);
	};

	return (
		<div className={styles.game}>
			<InfoLayout
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
			/>
			<PoolLayout
				fields={fields}
				playerClick={playerClick}
				currentPlayer={currentPlayer}
			/>
			<button className={styles.beginButton} onClick={beginClick}>
				НАЧАТЬ СНАЧАЛА
			</button>
		</div>
	);
};
