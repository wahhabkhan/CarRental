import React from 'react';
import StackNav from './src/navigation/StackNav';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';


const App = () => {
  return (
    <Provider store={store}>

    <StackNav/>
    </Provider>
  );
};

export default App;
