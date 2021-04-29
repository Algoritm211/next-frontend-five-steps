import '../styles/globals.css'
import '../styles/Auth.css'
import '../styles/MainPage.css'
import {wrapper} from "../store/store";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
