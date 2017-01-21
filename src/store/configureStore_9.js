import { loginUserRequest, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/app'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from '../reducers'


const createStoreWithMiddleware = applyMiddleware(
	// we're using redux-thunk for async actions
	thunk,
	// Create a logger to make it easy to debug state changes
	createLogger()
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

	// This was created to check if redux store is working or not
	// Log the initial state
	// console.log(store.getState())

	// Every time the state changes, log it
	// let unsubscribe = store.subscribe(() =>
	//   console.log(store.getState())
	// )
	//
	//
	// // Stop listening to state updates
	// unsubscribe()

  return store
}
