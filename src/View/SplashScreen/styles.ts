import { StyleSheet } from 'react-native';
import { scale } from '../../assets/styles/styles';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    width: scale(150),
    height: scale(150),
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: scale(150),
  },
});
