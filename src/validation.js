import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
	lastName: Yup.string().required('Numele este obligatoriu '),
	firstName: Yup.string().required('Prenumele este obligatoriu '),
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
	rating: Yup.number().required('Nota este obligatorie').min(1, 'Nota este obligatorie'),
	review: Yup.string()
		.required('Review-ul este obligatoriu')
		.min(20, 'Review-ul trebuie sa aiba minimum 20 de caractere')
		.max(255, 'Review-ul poate avea maxim 255 de caractere')
});

export const questionSchema = Yup.object().shape({
	question: Yup.string()
		.required('Intrebarea este obligatorie')
		.max(255, 'Intrebarea poate avea maxim 255 de caractere')
});

export const answerSchema = Yup.object().shape({
	answer: Yup.string().required('Raspunsul este obligatoriu').max(255, 'Raspunsul poate avea maxim 255 de caractere')
});

export const userDataSchema = Yup.object().shape({
	lastName: Yup.string().required('Numele este obligatoriu '),
	firstName: Yup.string().required('Prenumele este obligatoriu '),
	phone: Yup.string()
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			'Numarul de telefon nu este in formatul corespunzator'
		)
		.required('Numarul de telefon este obligatoriu'),
	dateOfBirth: Yup.date('Data nasterii nu este in formatul corespunzator').nullable()
});

export const AddressSchema = Yup.object().shape({
	lastName: Yup.string().required('Numele este obligatoriu '),
	firstName: Yup.string().required('Prenumele este obligatoriu '),
	phone: Yup.string()
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			'Numarul de telefon nu este in formatul corespunzator'
		)
		.required('Numarul de telefon este obligatoriu'),
	county: Yup.string().required('Judetul este obligatoriu'),
	city: Yup.string().required('Orasul este obligatoriu'),
	address: Yup.string().notOneOf([ '' ], 'Adresa este obligatorie').required('Adresa este obligatorie')
});

export const orderSchema = Yup.object().shape({
	observation: Yup.string().max(255, 'Obseratia poate avea maximum 255 de caractere')
});
