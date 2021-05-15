import '../styles/Header.css'
import '../styles/Auth.css'
import '../styles/MainPage.css'
import '../styles/CoursesContainer.css'
import '../styles/CourseCard.css'
import '../styles/globals.css'
import '../styles/Blog.css'
import '../styles/CoursePreview.css'
import '../styles/MyProf.css'
import '../styles/MyProfile.css'
import '../styles/MySettings.css'
import '../styles/MyRootStyles.css'
import '../styles/LessonPage.css'
import '../styles/Loader.css'
import '../styles/Editor.css'
import '../styles/error.css'
import { wrapper } from '../store/store'
import App from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../store/auth-reducer/auth-thunks'
import Head from 'next/head'

function MyComponent({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  return <>{children}</>
}

class MyApp extends App {
  static async getServer({ Component, ctx }) {
    const pageProps = Component.getInitialProps ?
      await Component.getInitialProps(ctx) :
      {}
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <MyComponent>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Five steps</title>
        </Head>
        <NextNProgress
          color="#f26c4f"
          startPosition={0.3}
          stopDelayMs={200}
          height="2"
        />
        <Component {...pageProps} />
      </MyComponent>
    )
  }
}

export default wrapper.withRedux(MyApp)
