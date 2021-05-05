import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from "next/router";
import {registerUser} from "../../store/auth-reducer/auth-thunks";
import {getRegistrationError} from "../../store/auth-reducer/auth-selector";
import Link from "next/link";

const registrationValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Ім`я треба вказати обов`язково')
		.matches(/[^<>%$]/i, 'Присутні заборонені символи'),
	email: Yup.string()
		.required('Email треба вказати обов`язково')
		.email('Введіть дійсну email-адресу')
		.matches(/[^<>%$]/i, 'Присутні заборонені символи'),
	password: Yup.string()
		.required('Пароль треба вказати обов`язково')
		.min(8, 'Пароль має бути мінімум 8 символів')
		.matches(/[^<>%$]/i, 'Присутні заборонені символи'),
	repeatPassword: Yup.string()
		.matches(/[^<>%$]/i, 'Присутні заборонені символи')
		.oneOf([Yup.ref('password'), null], 'Паролі не співпадають')
})


const Registration = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const regError = useSelector(getRegistrationError)
	const [isExpert, setIsExpert] = useState(false)

	const formik = useFormik({
		enableReinitialize: true,
		validationSchema: registrationValidationSchema,
		initialValues: {
			name: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
		onSubmit: values => {
			const objToServer = {
				name: values.name,
				email: values.email,
				password: values.password,
				role: isExpert ? 'expert' : 'student'
			}
			dispatch(registerUser(objToServer))
			// history.push('/main')
		},
	})

	const onGoogleAuth = () => {
		const win = window.open(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google`,
			'Auth',
			'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
		)

		const timer = setInterval(() => {
			if (win.closed) {
				clearInterval(timer)
			}
		}, 100)
	}

	const onCatchGoogleLogin = (messageEvent) => {
		if (messageEvent.origin === process.env.NEXT_PUBLIC_APP_URL) {
			const parsedData = JSON.parse(messageEvent.data)
			parsedData['role'] = localStorage.getItem('isExpert') === 'true' ? 'expert' : 'student'
			parsedData['fromGoogleAuth'] = true
			dispatch(registerUser(parsedData))
			history.push('/main')
		}
	}

	useEffect(() => {
		window.addEventListener('message', onCatchGoogleLogin)
		return () => {
			window.removeEventListener('message', onCatchGoogleLogin)
		}
	}, [])

	return (
		<React.Fragment>
			<div className='main'>
				<div className='containerReg'>
					<div className='logoReg'>
						<h1><Link href={'/'} style={{ lineHeight: '40px', fontWeight: '600' }}>Logo</Link></h1>
					</div>
					<div className='sign-up-content'>
						<form onSubmit={formik.handleSubmit} className='signup-form'>
							<h1 className='AuthTitle'>Реєструйтеся, щоб побачити більше</h1>
							<div className='form-radio'>
								<input className={`${isExpert ? 'inputRadio' : 'inputRadioChecked'}`} type='radio' name='member_level'
											 value='student' id='student'
											 onClick={() => {
												 localStorage.setItem('isExpert', 'false')
												 setIsExpert(false)
											 }} />
								<label htmlFor='student'>Student</label>

								<input className={`${isExpert ? 'inputRadioChecked' : 'inputRadio'}`} type='radio' name='member_level'
											 value='expert' id='expert'
											 onClick={() => {
												 localStorage.setItem('isExpert', 'true')
												 setIsExpert(true)
											 }} />
								<label htmlFor='expert'>Expert</label>
							</div>
							<div className='form-textbox'>
								<label htmlFor='name'>Full name</label>
								<input
									value={formik.values.name}
									onChange={formik.handleChange}
									className={'inputAuth'}
									type='text' name='name' id='name' />
								{formik.errors.name}
							</div>

							<div className='form-textbox'>
								<label htmlFor='email'>Email</label>
								<input
									value={formik.values.email}
									onChange={formik.handleChange}
									className={'inputAuth'}
									type='email' name='email' id='email' />
								{formik.errors.email}
							</div>

							<div className='form-textbox'>
								<label htmlFor='pass'>Password</label>
								<input
									value={formik.values.password}
									onChange={formik.handleChange}
									className={'inputAuth'}
									type='password' name='password' id='pass' />
								{formik.errors.password}
							</div>

							<div className='form-textbox'>
								<label htmlFor='confirm-pass'>Confirm Password</label>
								<input
									value={formik.values.repeatPassword}
									onChange={formik.handleChange}
									className={'inputAuth'}
									type='password' name='repeatPassword' id='confirm-pass' />
								{formik.errors.repeatPassword}
							</div>

							<div className='form-textbox'>
								{regError && <div>{regError}</div>}
								<button
									name='submit' id='submit' className='submit' style={{ width: '100%' }}>
									Sign Up
								</button>
							</div>
							<div className='form-textbox' style={{ textAlign: 'center' }}>
								<div className='or-container'>
									<div className='line-separator' />
									<div className='or-label'>or</div>
									<div className='line-separator' />
								</div>
								<div className='row'>
									<div className='col-md-12'>
										<button onClick={onGoogleAuth} className='btn btn-lg btn-google btn-block btn-outline'>
											<img src='https://img.icons8.com/color/16/000000/google-logo.png' alt={'googlesignup'} /> Sign Up
											Using Google
										</button>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-12'>
										<Link className='btn btn-lg btn-facebook btn-block btn-outline' href='#'>
											<a><i className='fab fa-facebook' /> Sign Up Using Facebook</a>
										</Link>
									</div>
								</div>
							</div>

						</form>

						<p className='loginhere'>
							Already have an account?&nbsp;
							<Link href={'/login'} className='loginhere-link'>Log in</Link>
						</p>
					</div>
				</div>

			</div>
		</React.Fragment>
	)
}

export default Registration
