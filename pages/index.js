import MainPage from '../components/MainPage/MainPage'
import MainLayout from '../components/MainLayout/MainLayout'
import CustomHead from '../components/CustomHead/CustomHead'
import React from 'react'

export default function Home() {
  return (
    <MainLayout>
      <CustomHead
        title={'Welcome to Five-Steps'}
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
      <MainPage />
    </MainLayout>
  )
}
