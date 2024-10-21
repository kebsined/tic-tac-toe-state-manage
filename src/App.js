import { PoolLayout } from './components/Pool/Pool';
import { InfoLayout } from './components/Info/Info';
import styles from './App.module.css';

import { store } from './store';
import { useEffect, useState } from 'react';

export const App = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
			return () => {
				unsubscribe();
			};
		});
	}, []);

	const beginClick = () => {
		store.dispatch({ type: 'RESTART', payload: Array(9).fill('') });
	};

	return (
		<div className={styles.game}>
			<InfoLayout />
			<PoolLayout />
			<button className={styles.beginButton} onClick={beginClick}>
				НАЧАТЬ СНАЧАЛА
			</button>
		</div>
	);
};
