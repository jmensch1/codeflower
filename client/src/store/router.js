import * as router from 'connected-react-router'
import history from 'services/history'
import queryString from 'query-string'

export const types = {
  LOCATION_CHANGE: router.LOCATION_CHANGE,
}

export const push = router.push

export const updateQuery = (newQuery={}) => {
  return (dispatch, getState) => {
    const { pathname, location: { query } } = getState().router
    return dispatch(push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      })
    }))
  }
}

export default router.connectRouter(history)
