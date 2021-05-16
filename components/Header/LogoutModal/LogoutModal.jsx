import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/auth-reducer/auth-reducer'
import Link from 'next/link'


const LogoutModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div id='exampleModal' className={`modal logoutExit ${isModalOpen ? 'active' : ''}`} tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>Увага!</h5>
            <button onClick={() => setIsModalOpen(false)} type='button' className='btn-close' data-bs-dismiss='modal'
              aria-label='Close'/>
          </div>
          <div className='modal-body'>
            Ви впевнені, що хочете вийти з акаунту?
          </div>
          <div className='modal-footer'>
            <button onClick={() => setIsModalOpen(false)} type='button' className='btn btn-primary'
              data-bs-dismiss='modal'>Повернутися
            </button>
            <Link href={'/'}>
              <a>
                <button onClick={() => {
                  onLogout()
                  setIsModalOpen(false)
                }} type='button' className='btn btn-danger'>Вийти
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
