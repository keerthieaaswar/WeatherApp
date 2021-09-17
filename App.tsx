import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, PermissionsAndroid, Alert, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import SplashScreen from './src/View/SplashScreen';
//import MainScreen from './src/View/MainScreen';
import { url, key } from './src/api/Endpoint';
import axios from 'axios';

interface IState {
  latitude: number;
  longitude: number;
}

const App = () => {
  const [show, setShow] = useState<boolean>(true);
  const [permission, setPermission] = useState<boolean>(false);
  const [state, setState] = useState<IState>({ latitude: 0, longitude: 0 });
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
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
      } else {
        Alert.alert("WeatherApp requires Location Permission");
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
          setState({ latitude: location.latitude, longitude: location.longitude });
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
    }
  }

  const getWeather = async () => {
    if(permission){
      axios.get(`${url}onecall?lat=${state.latitude}&lon=`)
    }
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*show ? <SplashScreen /> : <MainScreen />*/}
      <SplashScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
