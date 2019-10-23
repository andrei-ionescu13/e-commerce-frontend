import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
	email: Yup.string().email('Formatul email-ul este gresit').required('Email-ul este obligatoriu '),
	password: Yup.string()
		.required('Parola este obligatorie')
		.min(8, 'Parola trebuie sa ai aiba minim 8 caractere')
		.matches(/(?=.*[A-Z])/, 'Parola trebuie sa contina o litera mare')
		.matches(/(?=.*[0-9])/, 'Parola trebuie sa contina o cifra'),
	confirmedPassword: Yup.string()
		.required('Confirmarea parolei este obligatorie')
		.oneOf([ Yup.ref('password'), null ], 'Parolele trebuie sa se potriveasca')
});

export const logInSchema = Yup.object().shape({
	email: Yup.string().required('Email-ul este obligatoriu ').email('Formatul email-ul este gresit'),
	password: Yup.string()
		.required('Parola este obligatorie')
		.min(8, 'Parola trebuie sa ai aiba minim 8 caractere')
		.matches(/(?=.*[A-Z])/, 'Parola trebuie sa contina o litera mare')
		.matches(/(?=.*[0-9])/, 'Parola trebuie sa contina o cifra')
});

export const recoverySchema = Yup.object().shape({
	email: Yup.string().required('Email-ul este obligatoriu ').email('Formatul email-ul este gresit')
});

export const resetSchema = Yup.object().shape({
	password: Yup.string()
		.required('Parola este obligatorie')
		.min(8, 'Parola trebuie sa ai aiba minim 8 caractere')
		.matches(/(?=.*[A-Z])/, 'Parola trebuie sa contina o litera mare')
		.matches(/(?=.*[0-9])/, 'Parola trebuie sa contina o cifra'),
	confirmedPassword: Yup.string()
		.required('Confirmarea parolei este obligatorie')
		.oneOf([ Yup.ref('password'), null ], 'Parolele trebuie sa se potriveasca')
});

export const reviewSchema = Yup.object().shape({
	value: Yup.number().required('Nota este obligatorie').min(1, 'Nota este obligatorie'),
	review: Yup.string()
});
