import {createStore, combineReducers} from 'redux';
import {ImageReducer, SignUpReducer, userDetails, UserStatus} from './reducers/SignUp';
import { persistStore, persistReducer } from 'redux-persist'
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['userImage']
};

const rootReducer = combineReducers({
  signUpPage: ImageReducer,
  signUpInfo: UserStatus,
  forgotPassword:userDetails,
});


export const Store = createStore(persistReducer(persistConfig,rootReducer), applyMiddleware(thunk));
export const persistor = persistStore(Store);
// const configureStore = () => {
//   return createStore(rootReducer, applyMiddleware(thunk));
// };
// export default configureStore;