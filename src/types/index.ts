  import {ReactNode} from 'react';

  export type Position = 'left' | 'right';

  export  interface IMenuDrawerProps {
    open: boolean;
    tapToClose: boolean;
    paddingGesture: number;
    drawerWidth: number;
    animationTime: number;
    position: Position;
    children: ReactNode;
    MenuContent: JSX.Element;
    opacity: number;
    backgroundColor: string;
    onShowMenu: (show: boolean) => void;
  }
  export  interface IPlatformContainerProps {
    children: ReactNode;
  }
  export  interface IConfigOptions {
    paddingGesture: number;
    drawerWidth: number;
    open: boolean;
  }
  export  interface IConfigOutput {
    opened: number;
    closed: number;
    inBounds: (offset: number) => boolean;
    inDrawerBounds: (offser: number) => boolean;
    needOpenOrClose: (offset: number) => boolean;
    inPaddingGestureBounds: (offset: number) => boolean;
    calcOffset: (dx: number, moveX: number) => number;
    calcOpacity: (dx: number, opacity: number) => number;
  }
  export  interface IAnimatedOptions {
    useNativeDriver: boolean;
    duration: number;
    toValue: number;
  }
  export  interface IUseDrawerParams {
    children: ReactNode;
    MenuContent?: JSX.Element;
    position?: Position;
    drawerWidth?: number;
    animationTime?: number;
    paddingGesture?: number;
    tapToClose?: boolean;
    backgroundColor?: string;
    opacity?: number;
  } 