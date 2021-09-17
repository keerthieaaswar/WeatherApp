import { StyleSheet } from 'react-native';
import { scale } from '../../assets/styles/styles';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    padding: scale(10),
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    fontSize: scale(50),
    fontWeight: 'bold',
    color: 'white',
  },
  weatherDate: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  weeklyText: {
    color: 'grey',
    fontSize: scale(15),
    fontWeight: 'bold',
  },
  largeIcon: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
});
