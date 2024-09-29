import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ item, playerClick, index }) => {
	return (
		<button
			className={styles.button}
			onClick={() => playerClick(index)}
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
