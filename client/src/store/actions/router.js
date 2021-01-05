import * as router from 'connected-react-router'
import history from 'services/history'
import queryString from 'query-string'

export const types = {
  LOCATION_CHANGE: router.LOCATION_CHANGE,
}

export const push = router.push

// merge new query params with old ones
export const updateQuery = (newParams = {}) => {
  return (dispatch, getState) => {
    const {
      pathname,
      location: { search },
    } = getState().router
    const oldParams = queryString.parse(search)
    return dispatch(
      push({
        pathname,
        search: queryString.stringify({
          ...oldParams,
          ...newParams,
        }),
      })
    )
  }
}

export default router.connectRouter(history)
