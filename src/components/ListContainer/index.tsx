import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

interface IProps {
  date: string;
  imageUrl: string;
  description: string;
  temp: string;
}

const ListContainer = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tempContainer}>
        <Text style={styles.tempText}>{props.temp}</Text>
      </View>
      <View style={styles.subContainer}>
        <Image source={{ uri: props.imageUrl }} style={styles.image} />
        <View>
          <Text style={styles.dateText}>{props.date}</Text>
          <Text style={styles.descpText}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListContainer;
