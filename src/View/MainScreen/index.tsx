/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { url, key } from '../../api/Endpoint';
import axios from 'axios';
import { connect, RootStateOrAny, useSelector } from 'react-redux';

const MainScreen = () => {
  const [data, setData] = useState<any>();
  const latitude = useSelector(
    (state: RootStateOrAny) => state.weather.latitude,
  );
  const longitude = useSelector(
    (state: RootStateOrAny) => state.weather.longitude,
  );

  useEffect(() => {
    getCurrentWeather();
  }, []);

  const getCurrentWeather = async () => {
    console.log(latitude, longitude);
    axios
      .get(
        `${url}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${key}&units=metric`,
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.screen}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        colors={['#6dd0f6', '#61adff']}
        style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Weather App</Text>
        </View>
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            {data?.current.temp}
            {'\u00b0'}
          </Text>
          <Text style={styles.weatherDate}>
            {new Date(data?.current.dt).toDateString()}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={styles.weeklyText}>Weekly</Text>
        <View>
          {data?.daily.map((item: any) => (
            <Text>{new Date(item.dt).toUTCString()}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MainScreen);
