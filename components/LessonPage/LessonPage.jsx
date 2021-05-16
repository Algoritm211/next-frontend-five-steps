import React, { useEffect } from 'react'
import Header from '../Header/Header'
import styles from '../MainLayout/MainPage.module.css'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentLesson,
  getLessonPage,
} from '../../store/lesson-reducer/lesson-selector'
import { setLessonPage } from '../../store/lesson-reducer/lesson-reducer'
import { loadLesson } from '../../store/lesson-reducer/lesson-thunks'
import { getCurrentCourse } from '../../store/courses-reducer/courses-selector'
import { useRouter } from 'next/router'
import Loader from '../Loader/Loader'
import Link from 'next/link'


const LessonPage = ({ exerciseType = 'lesson' }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lesson = useSelector(getCurrentLesson)
  const lessonNumber = useSelector(getLessonPage)
  const currentCourse = useSelector(getCurrentCourse)

  useEffect(() => {
    const courseId = router.query.courseId
    const lessonNumber = router.query.lessonNumber

    if (!courseId || !lessonNumber) {
      history.push('/error')
      return
    }
    dispatch(setLessonPage(lessonNumber))
    dispatch(loadLesson(courseId, lessonNumber))
  }, [])

  // if (error) {
  // return <Error404 />
  // }
  if (!lesson || !currentCourse) {
    return <Loader />
  }

  const onPageChange = (pageInfo) => {
    dispatch(loadLesson(currentCourse._id, pageInfo.selected + 1))
    router.push(`/${exerciseType}?courseId=${currentCourse._id}&lessonNumber=${pageInfo.selected + 1}`)
  }

  return (
    <React.Fragment>
      <div className='course-steps-pagination'>
        <ReactPaginate
          forcePage={lessonNumber - 1}
          onPageChange={onPageChange}
          pageCount={currentCourse.lessons.length}
          // pageCount={5}
          pageClassName={'course-pagination-page'}
          pageLinkClassName={'course-pagination-link'}
          containerClassName={'course-pagination-container'}
          previousClassName={'course-pagination-disable'}
          nextClassName={'course-pagination-disable'}
          disabledClassName={'course-pagination-disable'}
          activeClassName={'course-pagination-active'} />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className='container course-page mt-5'>
        <div className='col-12 col-sm-12 col-md-8 course-content'>
          <h1>{lesson.title}</h1>
          <p className='courses-lecture mb-5' dangerouslySetInnerHTML={{ __html: exerciseType === 'lesson' ? lesson.body : lesson.homeWork }}>
            {/* {lesson.body}*/}
          </p>
          <div className='d-flex row'>
            <div className='d-flex justify-content-start mb-5'>
              {((+lessonNumber + 1 < 6) && exerciseType === 'homework' || exerciseType === 'lesson') && (
                <Link href={exerciseType === 'lesson' ?
                  `/homework?courseId=${currentCourse._id}&lessonNumber=${lessonNumber}` :
                  `/lesson?courseId=${currentCourse._id}&lessonNumber=${+lessonNumber + 1}`
                }>
                  <button className='guid-button'>
                    Наступна сторінка
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-3 me-auto ms-auto course-info'>
          <h3 className='courses-subtitle'>Крок номер {lessonNumber}</h3>
          <h1 className='courses-title mb-5'>{currentCourse.title}</h1>
          <p className='course-description mb-5'>{currentCourse?.author?.name} - Автор курсу, та еще чертила, сеньор выносить мозги девелопер</p>
          {/* <audio*/}
          {/*    controls*/}
          {/*    className="course-audio"*/}
          {/*    src="../../assets/audio/test-step.mp3">*/}
          {/*    Your browser does not support the*/}
          {/*    <code>audio</code> element.*/}
          {/* </audio>*/}
          <iframe className='mb-3' style={{ width: '100%', height: '166px', scrolling: 'no', frameBorder: 'no' }}
            src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/639103986&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true'/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LessonPage
