import React from 'react'
import MainLayout from '../components/MainLayout/MainLayout'
import LessonPage from '../components/LessonPage/LessonPage'

const Homework = () => {
  return (
    <MainLayout>
      <LessonPage exerciseType={'homework'} />
    </MainLayout>
  )
}

export default Homework
