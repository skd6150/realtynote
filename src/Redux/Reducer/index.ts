import {AnyAction, combineReducers, createStore, Store} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import Group from './groupReducer';

type StoreState = ReturnType<typeof Group>;

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({Group});

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store: Store<StoreState, AnyAction> = createStore(persistedReducer);
  const persistor = persistStore(store);
  return {store, persistor};
};
