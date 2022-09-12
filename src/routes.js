import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Gym from './Gym/Gym'
import Fighting from './Fighting/Fighting'
import Hospital from './Hospital/Hospital'

export default (
    <Routes>
        <Route exact path='/' element={<h1 className='login-message'> Please Log In </h1>}/>
        <Route path='gym' element={<Gym/>}/>
        <Route path='fighting' element={<Fighting/>}/>
        <Route path='hospital' element={<Hospital/>}/>
    </Routes>
)