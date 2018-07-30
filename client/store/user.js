import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'
import {addToUserCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const editUser = (user) => ({type: EDIT_USER, user})
/**
 * THUNK CREATORS
 */
export const fetchSingleUser = (userId) => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`)
  const user = res.data;
  dispatch(getUser(user));
}

export const updateUser = (updatedUser, userId) => async dispatch => {
  const update = await axios.put(`/api/users/${userId}`, updatedUser)
  const userUpdate = update.data
  dispatch(editUser(userUpdate))
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    dispatch(addToUserCart({userId: res.data.id}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case EDIT_USER:
      return action.user
      default: 
      return state
  }
}
