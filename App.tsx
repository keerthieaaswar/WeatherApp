import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, PermissionsAndroid, Alert, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import SplashScreen from './src/View/SplashScreen';
//import MainScreen from './src/View/MainScreen';
import { url, key } from './src/api/Endpoint';
import axios from 'axios';

const App = () => {
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
          getWeather(location.latitude, location.longitude);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
    }
  };

  const getWeather = async (latitude: number, longitude: number) => {
    if (permission) {
      axios.get(`${url}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${key}`, {
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
    }
  };

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
