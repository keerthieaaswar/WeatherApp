/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Alert,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import SplashScreen from './src/View/SplashScreen';
import MainScreen from './src/View/MainScreen';
import { connect, Provider, RootStateOrAny } from 'react-redux';
import store from './src/reducer/rootReducer';
import { readForecast } from './src/reducer/Forecast';

const App = (props: any) => {
  const [show, setShow] = useState<boolean>(true);
  const [permission, setPermission] = useState<boolean>(false);
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [permission]);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      } else {
        Alert.alert('WeatherApp requires Location Permission');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentLocation = () => {
    if (permission) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          props.dispatch({
            type: 'SET_DATA',
            latitude: location.latitude,
            longitude: location.longitude,
          });
          const dataToSend = {
            latitude: location.latitude,
            longitude: location.longitude,
          };
          props.dispatch(readForecast(dataToSend));
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {show ? <SplashScreen /> : <MainScreen />}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  latitude: state.weather.latitude,
  longitude: state.weather.longitude,
});

const ConnectApp = connect(mapStateToProps)(App);

const RootComponent = () => {
  return (
    <Provider store={store}>
      <ConnectApp />
    </Provider>
  );
};

export default RootComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
