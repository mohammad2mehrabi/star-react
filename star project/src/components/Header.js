import React from 'react'
import { Link } from 'react-router-dom'
import {  FaBattleNet } from 'react-icons/fa';


const Header = () => {
    return (
        <div className='header-box'>
            <div className='left-buttons'>
                <Link to="/" style={{ textDecoration: 'none' }}><button className='all-cards-button'><FaBattleNet/>my app</button></Link>
            </div>

            <p className='header-text'><span className='header-text-span'>star ware</span></p>
            <a href='https://mohammad2mehrabi.github.io/profiles.github.io/' target="_blank" rel='noreferrer' style={{ textDecoration: 'none' }}><button className='name-button'>MOHAMMAD</button></a>
        </div>
    )
}

export default Header