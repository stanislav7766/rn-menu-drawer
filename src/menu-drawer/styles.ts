import {StyleSheet, ViewStyle} from 'react-native';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants';


type Styles = {
  main: ViewStyle;
  drawer: ViewStyle;
  container: ViewStyle;
  mask: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  main: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    left: 0,
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN,
    zIndex: 0,
  },
  drawer: {
    position: 'absolute',
    height: HEIGHT_SCREEN,
    zIndex: 1,
  },
});
