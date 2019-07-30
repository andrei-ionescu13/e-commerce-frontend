import React from 'react';

const Container = ({ children, width }) => {
	const style = {
		width,
		margin: '0 auto'
	};
	return <div style={style}>{children}</div>;
};

export default Container;
