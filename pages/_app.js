import { useEffect } from 'react'
import '../styles/globals.css'
 import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {

  return <>
  <Header />
  <Component {...pageProps} />
  </>
}

export default MyApp
