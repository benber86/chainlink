import {
  REQUEST_JOBS,
  RECEIVE_JOBS_SUCCESS,
  RECEIVE_JOBS_ERROR
} from 'actions'

const initialState = {
  items: {},
  currentPage: [],
  count: 0,
  fetching: false,
  networkError: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_JOBS:
      return Object.assign(
        {},
        state,
        {
          fetching: true,
          networkError: false
        }
      )
    case RECEIVE_JOBS_SUCCESS: {
      const newJobs = action.items.reduce(
        (acc, job) => { acc[job.id] = job; return acc },
        {}
      )

      return Object.assign(
        {},
        state,
        {
          items: Object.assign({}, state.items, newJobs),
          currentPage: action.items.map(j => j.id),
          count: action.count,
          fetching: false,
          networkError: false
        }
      )
    }
    case RECEIVE_JOBS_ERROR:
      return Object.assign(
        {},
        state,
        {
          fetching: false,
          networkError: !!action.networkError
        }
      )
    default:
      return state
  }
}
