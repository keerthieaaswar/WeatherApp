import { StyleSheet } from 'react-native';
import { scale } from '../../assets/styles/styles';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  topContainer: {
    height: '50%',
  },
  bottomContainer: {
    padding: scale(10),
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
    paddingVertical: scale(50),
  },
  weatherText: {
    fontSize: scale(50),
    fontWeight: 'bold',
    color: 'white',
    padding: scale(10),
  },
  weatherDate: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: 'white',
  },
  weeklyText: {
    color: 'grey',
    fontSize: scale(15),
    fontWeight: 'bold',
  },
});
