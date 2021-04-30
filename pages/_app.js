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
import {wrapper} from "../store/store";
import App from "next/app";
import NextNProgress from "nextjs-progressbar";
import React, {useEffect} from "react";
import {authAPI} from "../api/auth-api";
import {useDispatch} from "react-redux";
import {authUser} from "../store/auth-reducer/auth-thunks";


function MyComponent({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authUser())
  }, [])

  return <>{children}</>
}

class MyApp extends App {
  static async getServer({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <MyComponent>
        <NextNProgress
          color="#f26c4f"
          startPosition={0.3}
          stopDelayMs={200}
          height="2"
        />
        <Component {...pageProps} />
      </MyComponent>
    );
  }
}

export default wrapper.withRedux(MyApp);


