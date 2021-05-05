import React from 'react'
import {useSelector} from 'react-redux'
import {getUserData} from '../../../store/auth-reducer/auth-selector'
import Link from "next/link";
import {useRouter} from "next/router";


const ProfileNavbar = () => {
  const user = useSelector(getUserData)

  const router = useRouter()

  return (
    <ul className='nav'>
      <li className='nav-item side-accElem'>
        <Link href={`/account/${user._id}`}>
          <a className={`nav-link side-elem`} style={{color: router.pathname.indexOf('account') !== -1 && '#f26c4f'}}>
            <div className='sidebar-l'>
              <i className='far fa-user-circle side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Мій профіль</span>
            </div>
          </a>
        </Link>
      </li>
      <li className='nav-item side-accElem'>
        <Link href={`/myprof/${user._id}`}>
          <a className='nav-item side-elem' style={{color: router.pathname.indexOf('myprof') !== -1 && '#f26c4f'}}>
            <div className='sidebar-l'>
              <i className='fas fa-briefcase side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Мої професії</span>
            </div>
          </a>
        </Link>
      </li>
      <li className='nav-item side-accElem'>
        <Link href={`/settings/${user._id}`}>
          <a className='nav-item side-elem' style={{color: router.pathname.indexOf('settings') !== -1 && '#f26c4f'}}>
            <div className='sidebar-l'>
              <i className='fas fa-cog side-accIll'/>
            </div>
            <div className='sidebar-r'>
              <span className='sidebar-title'>Налаштування</span>
            </div>
          </a>
        </Link>
      </li>
    </ul>
  )
}

export default ProfileNavbar
