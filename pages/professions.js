import React from 'react'
import { wrapper } from '../store/store'
import { coursesAPI } from '../api/courses-api'
import CoursesContainer, {
  allFiltersOnPage,
} from '../components/CoursesContainer/CoursesContainer'
import CustomHead from '../components/CustomHead/CustomHead'

const ProfessionsPage = ({ professions, coursesCount }) => {
  return (
    <>
      <CustomHead
        title={'Наши курсы'}
        keywords={[
          'курсы',
          'обучение',
          'образование',
          'навыки',
          '5 шагов',
          'научиться',
          'бизнес',
          'five steps',
          'IT',
          'маркетинг',
          'программирование',
        ]}
        description={
          'Именно тут вы можете найти крутые курсы для нахождения новой профессии и приобретения новых навыков'
        }
      />
      <CoursesContainer professions={professions} coursesCount={coursesCount} />
    </>
  )
}

export default ProfessionsPage

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const page = +ctx.query.page || 1
  const filters = ctx.query.filters ?
    ctx.query.filters.split(',') :
    allFiltersOnPage
  const data = await coursesAPI.getAllCourses(page, filters)

  return {
    props: {
      professions: data.courses,
      coursesCount: data.coursesCount,
    },
  }
})
