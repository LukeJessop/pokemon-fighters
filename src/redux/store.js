import { configureStore } from '@reduxjs/toolkit';

import backpackReducer from './backpackSlice';

export default configureStore({reducer : {
    backpack: backpackReducer,
}});