import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteCourseModal from './DeleteCourseModal/DeleteCourseModal'
import Link from 'next/link'
import { getUserData } from '../../../store/auth-reducer/auth-selector'
import { countEntries } from '../../util-funcs/entries-two-arr-counter'
import { loadCurrentCourse, toggleLikeCourse } from '../../../store/courses-reducer/courses-thunks'
import { clearCurrentLesson } from '../../../store/lesson-reducer/lesson-reducer'
import { clearCurrentCourse } from '../../../store/courses-reducer/courses-reducer'
import { useRouter } from 'next/router'

const categoryToUkr = {
  it: 'IT',
  design: 'Дизайн',
  business: 'Бізнес',
  education: 'Освіта',
  marketing: 'Маркетинг',
}

const colors = {
  it: '#39B065',
  design: '#CE437E',
  business: '#F2A44F',
  education: '#367D98',
  marketing: '#f26c4f',
}

const CourseCard = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const course = props.course
  const { category, title, rating, author } = course
  const userInfo = useSelector(getUserData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  let courseCompletePercent = -1
  if (userInfo.lessonsCompleted) {
    courseCompletePercent = countEntries(userInfo.lessonsCompleted, course.lessons) * 20
  }

  const onLikeHandler = (event) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(toggleLikeCourse(course._id))
  }

  const enableModal = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setIsModalOpen(true)
  }

  const onEditHandler = (event) => {
    event.stopPropagation()
    event.preventDefault()
    dispatch(clearCurrentLesson())
    dispatch(clearCurrentCourse())
    dispatch(loadCurrentCourse(course._id))
    router.push('/editor')
  }


  return (
    <Link href={`/course/${course._id}`}>
      <a style={{ color: 'black' }}>
        <div className='container card '>
          <div className='row mb-3 ms-0 me-0'>
            <div className={`col-7 col-sm-6 col-lg-5 text-center rounded card-tag`}
              style={{ backgroundColor: colors[category] }}>
              {/* style={{backgroundColor: '#7e919f' }}>*/}
              <p className='text-center m-auto card-tag-text'>{categoryToUkr[category]?.toUpperCase() || ''}</p>
            </div>
          </div>
          <div className='row mb-0 ms-0 me-0'>
            <div className='col-12 p-0'>
              <h2 className='text-left card-title'>{title}</h2>
            </div>
          </div>
          <div className='row ms-0 me-0'>
            <div className='container d-flex flex-row-reverse col-12 align-items-end'>
              <span className='like-text align-text-bottom' onClick={onLikeHandler}>{userInfo?.likedCourses?.includes(course._id) ? rating + 1 : rating}</span>
              <i title='Лайкнути кроки' className='fas fa-thumbs-up pe-2'
                style={{ color: userInfo?.likedCourses?.includes(course._id) && '#f26c4f' }} onClick={onLikeHandler} />
              {author._id === userInfo._id && (
                <>
                  <i title='Редагувати створений курс' className='fas fa-edit pe-2' onClick={onEditHandler} />
                  <i title='Видалити створений курс' className='fas fa-trash-alt pe-2' onClick={enableModal} />
                </>
              )}
            </div>
          </div>
          <DeleteCourseModal id={course._id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          {courseCompletePercent !== -1 && userInfo?.courses?.includes(course._id) &&

          <div className='row ms-0 me-0'>
            <span className='progress-text'>{`${courseCompletePercent}%`}</span>
            <div className='progress'>
              <div className='progress-bar'
                style={{ width: `${courseCompletePercent}%`, backgroundColor: '#39b54a' }}
                role='progressbar'
                aria-valuenow={`${courseCompletePercent}`} aria-valuemin='0'
                aria-valuemax='100' />
            </div>
          </div>
          }
          {!userInfo?.courses?.includes(course._id) && (
            <div className='row ms-0 me-0'>
              <div className='col-12 p-0'>

                <hr className='card-hr mt-4' />
              </div>
            </div>
          )}

          {/* <div className='row ms-0 me-0'>*/}
          {/*    <div className='col-12 pe-0 ps-0'>*/}
          {/*        <div className="markerInProcess">*/}
          {/*            <p className="titleCourseState">Курс прийнято</p>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/* </div>*/}

          <div className='row ms-0 me-0'>
            <div className='col-2 pe-0 ps-0'>
              <img src={author?.avatar ? `${process.env.NEXT_PUBLIC_APP_URL}/${author.avatar}` : noUserPhoto}
                className='img-avatar'
                alt='' style={{ borderRadius: '50%' }} />
            </div>
            <div className='col-10 d-flex media-padding' style={{ alignItems: 'center' }}>
              <h6 className={'author-info mb-0'}>{author?.name}
                , <br /> {author?.description || ''}</h6>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CourseCard
