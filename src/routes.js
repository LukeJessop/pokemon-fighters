import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Gym from './Components/Gym/Gym'
import Fighting from './Components/Fighting/Fighting'
import NoAuthPage from './Components//Auth/NoAuthPage'

export default (
    <Routes>
        <Route exact path='/' element={<NoAuthPage />}/>
        <Route path='/gym' element={<Gym />}/>
        <Route path='/fighting' element={<Fighting />}/>
    </Routes>
)