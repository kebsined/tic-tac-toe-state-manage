import styles from './Info.module.css';
import PropTypes from 'prop-types';

export const InfoLayout = ({ currentPlayer, isGameEnded, isDraw }) => {
	return (
		<h1 className={styles.info}>
			{` ${
				isDraw
					? 'Ничья!!!'
					: isGameEnded
					? 'Выиграл ' + currentPlayer + ' !!!'
					: 'Ходит ' + currentPlayer
			}`}
		</h1>
	);
};

InfoLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
};
