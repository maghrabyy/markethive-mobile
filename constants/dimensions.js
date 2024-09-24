import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export {
  heightPercentageToDP as resH,
  widthPercentageToDP as resW,
} from 'react-native-responsive-screen';

export { SCREEN_WIDTH, SCREEN_HEIGHT };
