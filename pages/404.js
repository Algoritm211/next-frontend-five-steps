import React from 'react'
import Link from 'next/link'
import Header from '../components/Header/Header'

const Error404 = () => {
  return (
    <React.Fragment>
      <div>
        <Header />
      </div>
      <div className='container mt-5'>
        <h1 className='error-title'>404</h1>
        <h3 className='error-subtitle'>
					Щось пішло не так.
          <br />
					Спробуйте ще раз
        </h3>
        <div className='d-flex justify-content-center mt-5'>
          <Link href='/'>
            <button className='error-button mb-1'>На головну</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Error404
