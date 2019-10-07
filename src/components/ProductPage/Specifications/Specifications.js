import React from 'react';
import './Specifications.css';
import Specification from './Specification/Specification';

const Specifications = ({ specs }) => {
	const specifications = [];
	for (const [ key, value ] of Object.entries(specs)) {
		specifications.push(<Specification key={key} name={key} pairs={value} />);
	}
	return <div className="productPage-specs">{specifications}</div>;
};

export default Specifications;
