import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import ProfileNavbar from './ProfileNavbar/ProfileNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuth, getIsLoading, getUserData } from '../../store/auth-reducer/auth-selector'
import { useFormik } from 'formik'
import { deleteAvatar, updateUserInfo, uploadAvatar } from '../../store/auth-reducer/user-thunks'
import * as Yup from 'yup'

const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/[^<>%$]/i, 'Присутні заборонені символи'),
  surName: Yup.string()
    .matches(/^[^<>%$]*$/i, 'Присутні заборонені символи'),
  description: Yup.string()
    .matches(/[^<>%$]/i, 'Присутні заборонені символи'),
  city: Yup.string()
    .matches(/[^<>%$]/i, 'Присутні заборонені символи'),
})

const MyProfile = () => {
  const user = useSelector(getUserData)
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoading)
  const isAuth = useSelector(getIsAuth)
  const noUserPhoto = '/assets/user/nouserphoto.png'

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editProfileSchema,
    initialValues: {
      name: user.name,
      surName: user.surName,
      role: user.role,
      city: user.city || '',
      description: user.description,
      dayBirth: user?.birthdayDate?.split('-')[0] || 1,
      monthBirth: user?.birthdayDate?.split('-')[1] || 1,
      yearBirth: user?.birthdayDate?.split('-')[2] || 2000,
      gender: user.gender,
    },
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        surName: values.surName,
        role: values.role,
        city: values.city,
        description: values.description,
        birthdayDate: [values.dayBirth, values.monthBirth, values.yearBirth].join('-'),
        gender: values.gender,
      }
      dispatch(updateUserInfo(userData))
      // alert(JSON.stringify(userData, null, 2))
    },
  })

  const onHandleImage = (event) => {
    dispatch(uploadAvatar(event.target.files[0]))
    console.log()
  }

  const onDeletePhoto = () => {
    dispatch(deleteAvatar())
  }

  // if (isLoading) {
  // return <Loader />
  // }

  if (!isAuth) {
    return <div>no access</div>
  }


  const date = new Date(user.dateRegistration)
  return (
    <MainLayout>
      <div className='container mt-5'>
        <div className='row flex-lg-nowrap'>
          <div className='col-12 col-lg-auto acc-sidebar'>
            <ProfileNavbar />
          </div>

          <div className='col  mb-3 e-profile'>
            <div className='row'>
              <div className='d-flex'>
                <h1 className='acc-title'>Мій профіль</h1>
                <span
                  className='acc-join-title'>Приєднався {(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()}</span>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className='pt-3'>
              <h3 className='acc-subtitle'>Особисті дані</h3>
              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  <span className='info-title'>Аватар</span>
                </div>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                  <img className='avatar-img'
                    src={user.avatar ? `${process.env.NEXT_PUBLIC_APP_URL}/${user.avatar}` : noUserPhoto}
                    alt='avatar' />
                  <input type={'file'} id={'avatar'} name={'avatar'} onChange={onHandleImage}
                    multiple={false}
                    hidden={true} accept='image/jpeg,image/png' />
                  <label htmlFor={'avatar'} className='avatar-change'>Оновити</label>
                  <span onClick={onDeletePhoto} className='avatar-delete'>Видалити</span>
                </div>
              </div>
              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span className='info-title'>Ім'я</span>
                </div>

                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                  <input
                    className={'inputAcc'}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type='name'
                    name='name'
                    id='name' />
                  {formik.errors.name}
                </div>
              </div>
              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  <span className='info-title'>Прізвище</span>
                </div>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                  <input
                    className={'inputAcc'}
                    value={formik.values.surName}
                    onChange={formik.handleChange}
                    type='surName'
                    name='surName'
                    id='surname' />
                  {formik.errors.surName}
                </div>
              </div>


              {user.role === 'expert' && (
                <div className='row acc-info d-flex'>
                  <div className='col-12 col-md-3'>
                    <span className='info-title'>Посада</span>
                  </div>
                  <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                    <textarea
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      className='form-control inputAcc'
                      placeholder='Розкажіть про себе'
                      id='description' />
                    {formik.errors.description}
                  </div>
                </div>
              )}

              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  <span className='info-title'>Місто</span>
                </div>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                  <input
                    className={'inputAcc'}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    type='city'
                    name='city'
                    id='city' />
                  {formik.errors.city}
                </div>
              </div>
              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  <span className='info-title'>Дата народження</span>
                </div>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5 justify-content-center'>
                  <div className='select-wrap'>
                    <select
                      value={formik.values.dayBirth}
                      onChange={formik.handleChange}
                      name={'dayBirth'}
                      className='form-select mr-1 me-2'
                      aria-label='Default select example'>
                      <option defaultValue>День</option>
                      <option value='01'>01</option>
                      <option value='02'>02</option>
                      <option value='03'>03</option>
                      <option value='04'>04</option>
                      <option value='05'>05</option>
                      <option value='06'>06</option>
                      <option value='07'>07</option>
                      <option value='08'>08</option>
                      <option value='09'>09</option>
                      <option value='10'>10</option>
                      <option value='11'>11</option>
                      <option value='12'>12</option>
                      <option value='13'>13</option>
                      <option value='14'>14</option>
                      <option value='15'>15</option>
                      <option value='16'>16</option>
                      <option value='17'>17</option>
                      <option value='18'>18</option>
                      <option value='19'>19</option>
                      <option value='20'>20</option>
                      <option value='21'>21</option>
                      <option value='22'>22</option>
                      <option value='23'>23</option>
                      <option value='24'>24</option>
                      <option value='25'>25</option>
                      <option value='26'>26</option>
                      <option value='27'>27</option>
                      <option value='28'>28</option>
                      <option value='29'>29</option>
                      <option value='30'>30</option>
                      <option value='31'>31</option>
                    </select>


                    <select
                      value={formik.values.monthBirth}
                      onChange={formik.handleChange}
                      name={'monthBirth'}
                      className='form-select mr-1 me-2'
                      aria-label='Default select example'>
                      <option defaultValue>Місяць</option>
                      <option value='01'>Січень</option>
                      <option value='02'>Лютий</option>
                      <option value='03'>Березень</option>
                      <option value='04'>Квітень</option>
                      <option value='05'>Травень</option>
                      <option value='06'>Червень</option>
                      <option value='07'>Липень</option>
                      <option value='08'>Серпень</option>
                      <option value='09'>Вересень</option>
                      <option value='10'>Жовтень</option>
                      <option value='11'>Листопад</option>
                      <option value='12'>Грудень</option>
                    </select>


                    <select
                      value={formik.values.yearBirth}
                      onChange={formik.handleChange}
                      name={'yearBirth'}
                      className='form-select mr-1 me-2'
                      aria-label='Default select example'>
                      <option defaultValue>Рік</option>
                      <option value='2017'>2017</option>
                      <option value='2016'>2016</option>
                      <option value='2015'>2015</option>
                      <option value='2014'>2014</option>
                      <option value='2013'>2013</option>
                      <option value='2012'>2012</option>
                      <option value='2011'>2011</option>
                      <option value='2010'>2010</option>
                      <option value='2009'>2009</option>
                      <option value='2008'>2008</option>
                      <option value='2007'>2007</option>
                      <option value='2006'>2006</option>
                      <option value='2005'>2005</option>
                      <option value='2004'>2004</option>
                      <option value='2003'>2003</option>
                      <option value='2002'>2002</option>
                      <option value='2001'>2001</option>
                      <option value='2000'>2000</option>
                      <option value='1999'>1999</option>
                      <option value='1998'>1998</option>
                      <option value='1997'>1997</option>
                      <option value='1996'>1996</option>
                      <option value='1995'>1995</option>
                      <option value='1994'>1994</option>
                      <option value='1993'>1993</option>
                      <option value='1992'>1992</option>
                      <option value='1991'>1991</option>
                      <option value='1990'>1990</option>
                      <option value='1989'>1989</option>
                      <option value='1988'>1988</option>
                      <option value='1987'>1987</option>
                      <option value='1986'>1986</option>
                      <option value='1985'>1985</option>
                      <option value='1984'>1984</option>
                      <option value='1983'>1983</option>
                      <option value='1982'>1982</option>
                      <option value='1981'>1981</option>
                      <option value='1980'>1980</option>
                      <option value='1979'>1979</option>
                      <option value='1978'>1978</option>
                      <option value='1977'>1977</option>
                      <option value='1976'>1976</option>
                      <option value='1975'>1975</option>
                      <option value='1974'>1974</option>
                      <option value='1973'>1973</option>
                      <option value='1972'>1972</option>
                      <option value='1971'>1971</option>
                      <option value='1970'>1970</option>
                      <option value='1969'>1969</option>
                      <option value='1968'>1968</option>
                      <option value='1967'>1967</option>
                      <option value='1966'>1966</option>
                      <option value='1965'>1965</option>
                      <option value='1964'>1964</option>
                      <option value='1963'>1963</option>
                      <option value='1962'>1962</option>
                      <option value='1961'>1961</option>
                      <option value='1960'>1960</option>
                      <option value='1959'>1959</option>
                      <option value='1958'>1958</option>
                      <option value='1957'>1957</option>
                      <option value='1956'>1956</option>
                      <option value='1955'>1955</option>
                      <option value='1954'>1954</option>
                      <option value='1953'>1953</option>
                      <option value='1952'>1952</option>
                      <option value='1951'>1951</option>
                      <option value='1950'>1950</option>
                      <option value='1949'>1949</option>
                      <option value='1948'>1948</option>
                      <option value='1947'>1947</option>
                      <option value='1946'>1946</option>
                      <option value='1945'>1945</option>
                      <option value='1944'>1944</option>
                      <option value='1943'>1943</option>
                      <option value='1942'>1942</option>
                      <option value='1941'>1941</option>
                      <option value='1940'>1940</option>
                      <option value='1939'>1939</option>
                      <option value='1938'>1938</option>
                      <option value='1937'>1937</option>
                      <option value='1936'>1936</option>
                      <option value='1935'>1935</option>
                      <option value='1934'>1934</option>
                      <option value='1933'>1933</option>
                      <option value='1932'>1932</option>
                      <option value='1931'>1931</option>
                      <option value='1930'>1930</option>
                      <option value='1929'>1929</option>
                      <option value='1928'>1928</option>
                      <option value='1927'>1927</option>
                      <option value='1926'>1926</option>
                      <option value='1925'>1925</option>
                      <option value='1924'>1924</option>
                      <option value='1923'>1923</option>
                      <option value='1922'>1922</option>
                      <option value='1921'>1921</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row acc-info d-flex'>
                <div className='col-12 col-md-3'>
                  <span className='info-title'>Ваша стать</span>
                </div>
                <div className='col-12  col-md-8 col-lg-6 col-xl-5'>
                  <div className='custom-controls-stacked px-2'>
                    <span className='form-check'>
                      <input className='form-check-input' type='radio'
                        value={'man'}
                        checked={formik.values.gender === 'man'}
                        onChange={formik.handleChange}
                        name='gender' id='flexRadioDefault2' />
                      <label className='form-check-label' htmlFor='flexRadioDefault2'>
                        Чоловіча
                      </label>
                    </span>
                    <span className='form-check'>
                      <input
                        onChange={formik.handleChange}
                        className='form-check-input' type='radio'
                        checked={formik.values.gender === 'woman'}
                        value={'woman'}
                        name='gender' id='flexRadioDefault3' />
                      <label className='form-check-label' htmlFor='flexRadioDefault3'>
                        Жіноча
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              <div className='acc-info d-flex'>
                <div className='col d-flex justify-content-start'>
                  <button className='btn btn-primary' disabled={isLoading} type='submit'>
                    {!isLoading ? 'Зберегти налаштування' : 'Зберігається'}
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>


    </MainLayout>
  )
}
export default MyProfile
