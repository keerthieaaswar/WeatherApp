import React, { useEffect } from 'react';
import { FlatList, Text, View, Animated, Easing } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect, RootStateOrAny, useSelector } from 'react-redux';
import ListContainer from '../../components/ListContainer';
import SplashScreen from '../SplashScreen';

const MainScreen = () => {
  const data = useSelector(
    (state: RootStateOrAny) => state.forecast.forecastData,
  );
  const loading = useSelector(
    (state: RootStateOrAny) => state.forecast.loading,
  );
  const current = data?.current?.weather[0];
  const imageOpacityValue = new Animated.Value(0);
  const titleTranslateYValue = new Animated.Value(0);
  const titleScaleValue = new Animated.Value(0);

  const imageOpacity = imageOpacityValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 0.25, 0.5, 0.75, 1],
  });
  const imageOpacityStyle = {
    opacity: imageOpacity,
  };
  // interpolate the vertical position of the title
  const titleMoveY = titleTranslateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280],
  });
  const titleScale = titleScaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.25, 0.5, 1],
  });
  const titleTransformStyle = {
    transform: [{ translateY: titleMoveY }, { scale: titleScale }],
  };

  useEffect(() => {
    imageOpacityValue.setValue(1);
    titleTranslateYValue.setValue(1);
    titleScaleValue.setValue(1);

    Animated.sequence([
      Animated.timing(imageOpacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateYValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(titleScaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  });

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.screen}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.6]}
        colors={['#6dd0f6', '#61adff']}
        style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Weather App</Text>
        </View>
        <View style={styles.weatherContainer}>
          <Animated.Image
            style={[styles.largeIcon, imageOpacityStyle]}
            source={{
              uri: `http://openweathermap.org/img/wn/${current?.icon}@4x.png`,
            }}
          />
          <Animated.Text style={[styles.weatherText, titleTransformStyle]}>
            {Math.round(data?.current.temp)}
            {' \u00b0'}
            {'C'}
          </Animated.Text>
          <Text style={styles.weatherDate}>
            {new Date(data?.current.dt * 1000).toDateString()}
          </Text>
          <Text style={styles.weatherDate}>{current?.description}</Text>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={styles.weeklyText}>Next 5 Days</Text>
        <FlatList
          data={data?.daily.slice(1, 6)}
          renderItem={({ item }) => {
            const newData = item.weather[0];
            var dt = new Date(item.dt * 1000).toDateString();
            return (
              <ListContainer
                date={dt}
                imageUrl={`http://openweathermap.org/img/wn/${newData.icon}@4x.png`}
                temp={`${Math.round(item.temp.max)} ${'\u00b0'}${'C'}`}
                description={newData.description}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (_state: RootStateOrAny) => ({});

export default connect(mapStateToProps)(MainScreen);
