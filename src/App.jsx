import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AppContainer from './Navigation/AppContainer';
import {Provider} from 'react-redux';
import store from './Redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
