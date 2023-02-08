import { getUserFailure, getUserStarted, getUserSuccess } from '../actionCreators/getUser'
import $api from '../../lib/http/http'

export const fetchGetUser = () => async (dispatch) => {
  dispatch(getUserStarted())
  try {
    const { data } = await $api.get(`/user`)
    dispatch(getUserSuccess(data))
  } catch (error) {
    dispatch(getUserFailure(error))
  }
}
