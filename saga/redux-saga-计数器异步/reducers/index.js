import {counter} from './counter'
import {users} from './users'
import {combineReducers} from 'redux'

export const rootReducer=combineReducers({
    counter,
    users
})