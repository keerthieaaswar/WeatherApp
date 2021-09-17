import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const guidelineWidth = 360;

export const scale = (size: number) => (width / guidelineWidth) * size;
