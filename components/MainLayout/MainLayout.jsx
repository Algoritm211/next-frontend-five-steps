import React from 'react'
import Header from '../Header/Header'
import styles from './MainPage.module.css'


const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>
        {children}
        {/* <MainPlates />*/}
        {/* <CoursesContainer />*/}
        {/* <CourseEditor />*/}
      </main>
    </React.Fragment>
  )
}

export default MainLayout
