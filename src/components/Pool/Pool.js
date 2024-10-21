import styles from './Pool.module.css';
import { Button } from '../button/Button';
import PropTypes from 'prop-types';
import { store } from '../../store';

export const PoolLayout = () => {
	return (
		<div className={styles.pool}>
			{store.getState().fields.map((item, i) => (
				<Button key={i} item={item} i={i} />
			))}
		</div>
	);
};

PoolLayout.propTypes = {
	fields: PropTypes.array,
	playerClick: PropTypes.func,
	currentPlayer: PropTypes.string,
};
