import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
	const [ email, setEmail ] = useState('');

	const emailOnChange = e => setEmail(e.target.value);

	const onSubmit = e => {
		e.preventDefault();
	};

	return (
		<div className="newsletter">
			<div className="newsletter-text">
				Abonativa la newsletter pentru a afla din timp de noile produse si oferte
			</div>
			<form onSubmit={e => onSubmit(e)} className="newsletter-form">
				<input
					className="newsletter-input"
					placeholder="Email"
					onChange={e => emailOnChange(e)}
					value={email}
				/>
				<button className="newsletter-button" type="submit">
					Aboneaza-te
				</button>
			</form>
		</div>
	);
};

export default Newsletter;
