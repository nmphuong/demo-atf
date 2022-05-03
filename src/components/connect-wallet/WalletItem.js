import PropTypes from 'prop-types';

export default function WalletItem(props) {
	return (
		<div className={`${props.className}`} onClick={props.onClick}>
			{props.icon}
			<a className="item-text" href="" onClick={(e) => e.preventDefault()}>
				{props.title}
			</a>
		</div>
	);
}

WalletItem.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.object,
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
