import React from 'react'
import {useSelector} from 'react-redux'
import {getUserData} from '../../../store/auth-reducer/auth-selector'
import Link from "next/link";


const ProfileNavbar = () => {
  const user = useSelector(getUserData)

  return (
    <ul className='nav'>
      <li className='nav-item side-accElem'>
        <Link className='nav-link side-elem' activeClassName={'side-elem-active'} href={`/account/${user._id}`}>
          <>
            <div className='sidebar-l'>
              <i className='far fa-user-circle side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Мій профіль</span>
            </div>
          </>
        </Link>
      </li>
      <li className='nav-item side-accElem'>
        <Link className='nav-item side-elem' activeClassName={'side-elem-active'} href={`/myprof/${user._id}`}>
          <>
            <div className='sidebar-l'>
              <i className='fas fa-briefcase side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Мої професії</span>
            </div>
          </>
        </Link>
      </li>
      <li className='nav-item side-accElem'>
        <Link className='nav-item side-elem' activeClassName={'side-elem-active'} href={`/settings/${user._id}`}>
          <>
            <div className='sidebar-l'>
              <i className='fas fa-cog side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Налаштування</span>
            </div>
          </>
        </Link>
      </li>
    </ul>
  )
}

export default ProfileNavbar
