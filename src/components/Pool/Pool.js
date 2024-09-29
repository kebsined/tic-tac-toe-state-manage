import styles from './Pool.module.css';
import { Button } from '../button/Button';
import PropTypes from 'prop-types';

export const PoolLayout = ({ fields, playerClick, currentPlayer }) => {
	return (
		<div className={styles.pool}>
			{fields.map((item, index) => (
				<Button
					key={index}
					item={item}
					playerClick={playerClick}
					index={index}
					currentPlayer={currentPlayer}
				/>
			))}
		</div>
	);
};

PoolLayout.propTypes = {
	fields: PropTypes.array,
	playerClick: PropTypes.func,
	currentPlayer: PropTypes.string,
};
