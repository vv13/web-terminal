import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import terminal from 'containers/Terminal/reducer';


export default function createReducer(asyncReducers) {
  return combineReducers({
    terminal,
    routing: routerReducer,
    ...asyncReducers,
  });
}
