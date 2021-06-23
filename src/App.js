import React from 'react';
import './App.css';
import Home from './components/HomePage';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './configureStore';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='container'>
          <Home />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
