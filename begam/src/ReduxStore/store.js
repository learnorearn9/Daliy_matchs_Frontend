// store.js
import { createStore ,applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { clearToken } from './action';

// Initial state
const initialState = {
  token: null, // Initial token state
};

// Reducer to handle token state
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

// Configure persistence options
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Inactivity middleware
const inactivityMiddleware = store => {
  let timeout;

  const checkInactivity = () => {
    const lastActive = localStorage.getItem('lastActive');
    const currentTime = Date.now();
    if (lastActive && currentTime - lastActive > 15 * 60 * 1000) { 
      store.dispatch(clearToken());
    }
  };

  
  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch(clearToken());
    }, 15 * 60 * 1000); 
    localStorage.setItem('lastActive', Date.now());
  };

  const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

  events.forEach(event => {
    window.addEventListener(event, resetTimeout);
  });

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastActive', Date.now());
  });

  window.addEventListener('load', checkInactivity);

  resetTimeout();

  return next => action => {
    if (action.type === 'CLEAR_TOKEN') {
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    }
    return next(action);
  };
};

export const store = createStore(persistedReducer, applyMiddleware(inactivityMiddleware));
export const persistor = persistStore(store);
