import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Gym from './Components/Gym/Gym'
import Fighting from './Components/Fighting/Fighting'

export default (
    <Routes>
        <Route exact path='/' element={<Gym />}/>
        <Route path='/fighting' element={<Fighting />}/>
    </Routes>
)