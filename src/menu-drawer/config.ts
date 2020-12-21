import {IConfigOptions, IConfigOutput, Position} from '../types';
import {WIDTH_SCREEN} from '../constants';

const getConfigLeft = ({drawerWidth, paddingGesture, open}: IConfigOptions): IConfigOutput => {
  const opened: number = drawerWidth;
  const closed: number = 0;

  return {
    opened,
    closed,
    inPaddingGestureBounds: (offset: number): boolean => !open && offset >= closed && offset <= paddingGesture,
    inBounds: (offset: number): boolean => offset >= paddingGesture && offset <= opened,
    inDrawerBounds: (offset: number): boolean => offset >= closed && offset <= opened,
    needOpenOrClose: (offset: number): boolean => {
      const needShowMenu = offset > 0 ? 'open' : 'close';
      return needShowMenu === 'open';
    },
    calcOffset: (dx: number, moveX: number): number => (open ? opened + dx : moveX),
    calcOpacity: (dx: number, opacity: number): number => (Math.abs(dx) / opened) * opacity,
  };
};

const getConfigRight = ({drawerWidth, paddingGesture, open}: IConfigOptions): IConfigOutput => {
  const opened: number = WIDTH_SCREEN;
  const closed: number = WIDTH_SCREEN + drawerWidth;

  return {
    opened,
    closed,
    inPaddingGestureBounds: (offset: number): boolean => !open && offset >= opened - paddingGesture && offset <= opened,
    inBounds: (offset: number): boolean => offset <= closed - paddingGesture && offset >= opened,
    inDrawerBounds: (offset: number): boolean => offset >= opened - drawerWidth && offset <= opened,
    needOpenOrClose: (offset: number): boolean => {
      const needShowMenu = offset > 0 ? 'close' : 'open';
      return needShowMenu === 'open';
    },
    calcOffset: (dx: number, moveX: number): number => (open ? opened + dx : drawerWidth + moveX),
    calcOpacity: (dx: number, opacity: number): number => (Math.abs(dx - closed) / drawerWidth) * opacity,
  };
};

export const getConfig = (position: Position, options: IConfigOptions): IConfigOutput =>
  ({
    left: getConfigLeft(options),
    right: getConfigRight(options),
  }[position]);
