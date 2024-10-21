import styles from './Info.module.css';
import PropTypes from 'prop-types';
import { store } from '../../store';
import { useEffect, useState } from 'react';

export const InfoLayout = () => {
	const { currentPlayer, isGameEnded, isDraw } = store.getState();
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<h1 className={styles.info}>
			{!isGameEnded && !isDraw && 'Ходит ' + currentPlayer}
			{isGameEnded && 'Выиграл ' + currentPlayer + '!!!'}
			{isDraw && 'Ничья!!!'}
		</h1>
	);
};

InfoLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
};
