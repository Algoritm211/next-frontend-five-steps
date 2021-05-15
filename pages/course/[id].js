import React from 'react'
import { wrapper } from '../../store/store'
import { coursesAPI } from '../../api/courses-api'
import CoursePage from '../../components/CoursesContainer/CoursePage'
import CoursePageHead from '../../components/CoursesContainer/CoursePageHead'

const Course = ({ course }) => {
  return (
    <>
      <CoursePageHead
        course={course}
        keywords={[
          'курсы',
          'обучение',
          'образование',
          'навыки',
          '5 шагов',
          'научиться',
          'платформа',
          'five steps',
        ]}
        description={
          'Именно тут вы можете найти крутые курсы для нахождения новой профессии и приобретения новых навыков'
        }
      />
      <CoursePage course={course} />
    </>
  )
}

export default Course

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { id } = ctx.query
  const data = await coursesAPI.getCourse(id)
  return {
    props: {
      course: data.course,
    },
  }
})
