//
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {reducer} from './reducer/UseReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { reducer as userReducer } from './reducer/UseReducer'; // Your existing reducer
// import { socketReducer } from './reducer/SocketReducer'; // Your new socket reducer

// // Persist configuration for your existing reducer
// const userPersistConfig = {
//   key: 'user',
//   storage,
// };

// // Persist configuration for the socket reducer
// const socketPersistConfig = {
//   key: 'socket',
//   storage,
// };

// // Create persisted reducers for both reducers
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
// const persistedSocketReducer = persistReducer(socketPersistConfig, socketReducer);

// // Combine persisted reducers into a single root reducer
// const rootReducer = combineReducers({
//   user: persistedUserReducer,
//   socket: persistedSocketReducer,
// });

// // Create the Redux store using the combined root reducer
// export const store = configureStore({
//   reducer: rootReducer,
// });

// // Create the persistor for the store
// export const persistor = persistStore(store);
