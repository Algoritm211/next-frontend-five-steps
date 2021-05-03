import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup'
import Link from "next/link";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/auth-reducer/auth-thunks";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введіть дійсну email-адресу')
    .matches(/[^<>%$]/i, 'Присутні заборонені символи'),
  password: Yup.string()
    .required('Пароль треба вказати обов`язково')
    .min(8, 'Пароль має бути мінімум 8 символів')
    .matches(/[^<>%$]/i, 'Присутні заборонені символи'),
})

const Login = () => {
  const dispatch = useDispatch()
  const authError = '' // must be useSelector

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(loginUser(values.email, values.password))
    },
  })

  return (
    <div>
      <div className='main'>
        <div className='containerReg'>
          <div className='logoReg'>
            <h1><Link href={'/main'} style={{ lineHeight: '40px', fontWeight: '600' }}>Logo</Link></h1>
          </div>
          <div className='sign-up-content'>
            <form onSubmit={formik.handleSubmit} className='signup-form'>
              <h1 className='AuthTitle'>Увійдіть, щоб побачити більше</h1>
              <div className='form-textbox'>
                <label htmlFor='email'>Email</label>
                <input
                  className={'inputAuth'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type='email'
                  name='email'
                  id='email' />
                {formik.errors.email}
              </div>

              <div className='form-textbox'>
                <label htmlFor='pass'>Password</label>
                <input
                  className={'inputAuth'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type='password'
                  name='password'
                  id='password' />
                {formik.errors.password}
              </div>

              <div className='form-textbox'>
                {authError && <div>{authError}</div>}
                <button
                  type='submit' name='submit' id='submit' className='submit' value='Log in' style={{ width: '100%' }}>
                  Log in
                </button>
              </div>
            </form>

            <div className='form-textbox' style={{ textAlign: 'center' }}>
              <div className='or-container'>
                <div className='line-separator'></div>
                <div className='or-label'>or</div>
                <div className='line-separator'></div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <button onClick={() => {}} className='btn btn-lg btn-google btn-block btn-outline'>
                    <img src='https://img.icons8.com/color/16/000000/google-logo.png' /> Login Using Google
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <Link href='#'>
                    <a className='btn btn-lg btn-facebook btn-block btn-outline'>
                      <i className='fab fa-facebook' />
                      Login Using Facebook
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <p className='loginhere'>
              Don't have an account?&nbsp;
              <Link href={'/registration'} className='loginhere-link cup'>Sign up</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
