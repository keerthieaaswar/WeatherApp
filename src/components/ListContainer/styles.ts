import { StyleSheet } from 'react-native';
import { scale } from '../../assets/styles/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(5),
    alignSelf: 'center',
  },
  tempContainer: {
    width: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: scale(30),
    fontWeight: 'bold',
    color: '#61adff',
  },
  image: {
    width: scale(100),
    height: scale(100),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: scale(15),
    color: 'grey',
    fontWeight: 'bold',
  },
  descpText: {
    fontSize: scale(15),
    color: 'grey',
    textTransform: 'capitalize',
  },
});
