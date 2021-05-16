import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../store/auth-reducer/auth-selector'
import { subscribeToCourse, unsubscribeCourse } from '../../store/courses-reducer/courses-thunks'
import Link from 'next/link'
import MainLayout from '../MainLayout/MainLayout'

const CoursePage = ({ course }) => {
  const router = useRouter()
  const user = useSelector(getUserData)

  const dispatch = useDispatch()

  const subscribeCourseHandler = () => {
    dispatch(subscribeToCourse(course._id))
  }

  const unsubscribeHandler = () => {
    dispatch(unsubscribeCourse(course._id))
  }

  return (
    <MainLayout>
      <div className='d-flex container preview-container'>
        <div className='row d-flex justify-content-between preview-row'>
          <div className='preview-block col-12 col-md-6'>
            <h1 className='preview-title mb-3'>{course.title}</h1>
            <h3 className='preview-subtitle mt-3'>{course.description}</h3>
            <div className='d-flex preview-button-block mt-5'>
              {user?.courses?.includes(course._id) ? (
                <Link href={`/lesson?courseId=${course._id}&lessonNumber=1`}>
                  <button className='preview-button mb-1'
                    style={{
                      backgroundColor: 'white',
                      color: '#384046',
                      border: '1px solid #f26c4f',
                    }}>
                    Перейти до курсу
                  </button>
                </Link>
              ) : (
                <button className='preview-button mb-1' onClick={subscribeCourseHandler}>
                  Зареєструватися
                </button>
              )}
            </div>
          </div>
          <div className='d-flex m-auto col-12 col-md-6 justify-content-center' style={{ padding: '0 25%' }}>

            <img className='preview-image'
              src='https://cdn.mos.cms.futurecdn.net/6bxva8DmZvNj8kaVrQZZMP.jpg'
              alt='graphic-design' width='100%' />

          </div>
        </div>
      </div>
      <div className='d-flex container preview-container2 '>
        <div className='row d-flex justify-content-between preview-row'>
          <div className='col-12 col-sm-6 col-md-6'>
            <h1 className='courses-title'>Про професію</h1>
            <h3 className='courses-subtitle mb-5'>Best course on this platform</h3>
            <p className='course-text  mt-3'>Лучший курс</p>
          </div>
          <div className='col-12 col-sm-6 col-md-6 m-auto'>
            <div className='d-block advantage-block'>
              <div className='d-flex advantage-plate'>
                <i className='advantage-image fas fa-shoe-prints' />
                <p className='advantage-text'>5 кроків до освоєння професії!</p>
              </div>
              <div className='d-flex advantage-plate'>
                <i className='advantage-image far fa-thumbs-up' />
                <p className='advantage-text'>20 людей вважають цей курс крутим!</p>
              </div>
              <div className='d-flex advantage-plate'>
                <i className='advantage-image fas fa-laptop-house' />
                <p className='advantage-text'>Домашні завдання після кожної лекції!</p>
              </div>
              <div className='d-flex advantage-plate'>
                <i className='advantage-image fas fa-comments' />
                <p className='advantage-text'>Розмови з профі своєї справи!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='preview-color'>
        <div className='d-flex container'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-6 m-auto'>
              <img
                className='d-flex lector-image'
                src='https://s4.cdn.teleprogramma.pro/wp-content/uploads/2020/09/d480c7ac75a1c74402a36da002f08638.jpg'
                alt='lector-image' />
            </div>
            <div className='col-12 col-sm-6 col-md-6 lector-about'>
              <h1 className='courses-title'>Про лектора</h1>
              <h3 className='courses-subtitle mb-5'>Кілька слів</h3>
              <p className='course-text mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At earum fugit itaque possimus
                quae sint
                soluta ut. Consequatur dolores eaque libero nihil vel? Asperiores debitis eligendi,
                placeat provident
                quasi ratione.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='preview-button-block2 justify-content-center mb-5'>
        {user?.courses?.includes(course._id) ? (
          <>
            <Link href={`/lesson?courseId=${course._id}&lessonNumber=1`}>
              <button className='preview-button mb-3'
                style={{
                  backgroundColor: 'white',
                  color: '#384046',
                  border: '1px solid #f26c4f',
                  marginLeft: '20px',
                  marginRight: '20px',
                }}>
                Перейти до курсу
              </button>
            </Link>
            <button className='preview-button mb-3'
              onClick={unsubscribeHandler}
              style={{
                backgroundColor: 'crimson',
                marginLeft: '20px',
                marginRight: '20px',
              }}>
              Відписатися від курсу
            </button>
          </>
        ) : (
          <button className='preview-button mb-1' onClick={subscribeCourseHandler}>
            Зареєструватися
          </button>
        )}

      </div>
    </MainLayout>
  )
}

export default CoursePage
