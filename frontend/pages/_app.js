import { useEffect } from 'react'
import '../styles/globals.css'
 import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js')
  }, []);
  return (
  <>
  <Header />
  <Component {...pageProps} />
  <ToastContainer />
  </>)
}

export default MyApp
