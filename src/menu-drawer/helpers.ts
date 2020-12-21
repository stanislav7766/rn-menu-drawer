import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const isTap = (dx: number, dy: number) => Math.abs(dx) < 1 && Math.abs(dy) < 1;
export const isAllowedSwipe = (dx: number, limit: number): boolean => Math.abs(dx) >= limit;
export const isVerticalSwipe = (dx: number, dy: number): boolean =>
  (dx === 0 && dy !== 0) || Math.abs(dy) >= Math.abs(dx);
