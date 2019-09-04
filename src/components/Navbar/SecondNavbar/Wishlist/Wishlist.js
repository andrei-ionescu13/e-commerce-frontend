import React from 'react';
import { ReactComponent as HeartIcon } from '../../../../assets/icons/heart.svg';
import './Wishlist.css';

const Wishlist = () => {
	return (
		<div className="wishlist">
			<HeartIcon width="2.5rem" />
			<div className="wishlist-text">Wishlist</div>
		</div>
	);
};

export default Wishlist;
