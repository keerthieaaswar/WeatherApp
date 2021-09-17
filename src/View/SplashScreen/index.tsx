import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';

const source = require('../../assets/lottie/226-splashy-loader.json');

export default () => (
  <View style={styles.screen}>
    <View style={styles.logoContainer}>
      <LottieView source={source} autoPlay loop />
    </View>
  </View>
);
