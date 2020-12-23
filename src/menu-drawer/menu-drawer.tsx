import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Animated,
  View,
  SafeAreaView,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import {
  IMenuDrawerProps,
  IPlatformContainerProps,
  IAnimatedOptions,
} from "../types";
import { getConfig } from "./config";
import { isAllowedSwipe, isIOS, isTap, isVerticalSwipe } from "./helpers";
import { styles } from "./styles";

const PlatformContainer = ({ children }: IPlatformContainerProps) =>
  isIOS ? (
    <SafeAreaView style={[styles.main]}>{children}</SafeAreaView>
  ) : (
    <View style={styles.main}>{children}</View>
  );

export const MenuDrawer = ({
  children,
  MenuContent,
  open,
  drawerWidth,
  animationTime,
  position,
  tapToClose,
  paddingGesture,
  opacity,
  backgroundColor,
  onShowMenu,
}: IMenuDrawerProps) => {
  const config = useMemo(
    () => getConfig(position, { open, paddingGesture, drawerWidth }),
    [drawerWidth, open, paddingGesture, position]
  );
  const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("auto");
  const maskRef = useRef<View | null>(null);
  const [drawerOffset] = useState(
    new Animated.Value(open ? config.opened : config.closed)
  );
  const defaultAnimOpts = { duration: animationTime, useNativeDriver: true };

  const checkPointerEvents = (allow: boolean): void => {
    setPointerEvents(allow ? "none" : "auto");
  };
  const updateNativeStyles = (dx: number): void => {
    const newOpacity: number = Math.min(
      config.calcOpacity(dx, opacity),
      opacity
    );
    const inBounds: boolean = config.inBounds(dx);
    checkPointerEvents(inBounds);
    const zIndex: number = inBounds ? 100 : 0;
    maskRef?.current?.setNativeProps({
      zIndex,
      backgroundColor,
      opacity: newOpacity,
    });
  };

  useEffect(() => {
    drawerOffset.addListener(({ value }) => {
      updateNativeStyles(value);
    });
    return () => {
      drawerOffset.removeAllListeners();
    };
  });

  const animateDrawer = (
    animated: Animated.Value,
    { toValue, duration, useNativeDriver }: IAnimatedOptions
  ): void => {
    Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver,
    }).start();
  };

  const shouldContinueGestureStart = (): boolean => open;
  const shouldContinueGestureMove = (
    _: GestureResponderEvent,
    { dx, dy, moveX }: PanResponderGestureState
  ): boolean => {
    const allow =
      !isVerticalSwipe(dx, dy) && config.inPaddingGestureBounds(moveX);
    checkPointerEvents(allow);
    return allow;
  };

  const onPanResponderMove = (
    _: GestureResponderEvent,
    { dx, moveX }: PanResponderGestureState
  ): void => {
    const newOffset = config.calcOffset(dx, moveX);

    config.inBounds(newOffset) &&
      animateDrawer(drawerOffset, {
        ...defaultAnimOpts,
        toValue: newOffset,
        duration: 1,
      });
    Animated.event([null, { dx: drawerOffset }], { useNativeDriver: true });
  };

  const checkTapToClose = (locationX: number): void => {
    if (!tapToClose || config.inDrawerBounds(locationX)) return;
    onShowMenu(false);
  };

  const onPanResponderRelease = (
    { nativeEvent: { pageX } }: GestureResponderEvent,
    { dx, dy }: PanResponderGestureState
  ): void => {
    if (isTap(dx, dy)) {
      checkTapToClose(pageX);
      return;
    }

    if (isAllowedSwipe(dx, drawerWidth)) {
      onShowMenu(config.needOpenOrClose(dx));
      return;
    }
    const newOffset = open ? config.opened : config.closed;
    animateDrawer(drawerOffset, { ...defaultAnimOpts, toValue: newOffset });
  };
  const onStartShouldSetPanResponder = () => shouldContinueGestureStart();
  const onStartShouldSetPanResponderCapture = () => false;
  const onMoveShouldSetPanResponderCapture = (
    e: GestureResponderEvent,
    g: PanResponderGestureState
  ) => shouldContinueGestureMove(e, g);
  const onMoveShouldSetPanResponder = (
    e: GestureResponderEvent,
    g: PanResponderGestureState
  ) => shouldContinueGestureMove(e, g);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture,
        onStartShouldSetPanResponder,
        onMoveShouldSetPanResponderCapture,
        onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const openDrawer = useCallback(() => {
    animateDrawer(drawerOffset, { ...defaultAnimOpts, toValue: config.opened });
  }, [config.opened, defaultAnimOpts, drawerOffset]);

  const closeDrawer = useCallback(() => {
    animateDrawer(drawerOffset, { ...defaultAnimOpts, toValue: config.closed });
  }, [config.closed, defaultAnimOpts, drawerOffset]);

  useEffect(() => {
    open ? openDrawer() : closeDrawer();
  }, [open, openDrawer, closeDrawer]);

  const drawerStyle = { width: drawerWidth, left: -drawerWidth };
  const drawerTransform = { transform: [{ translateX: drawerOffset }] };

  const App = (
    <>
      <Animated.View {...panResponder.panHandlers}>
        <Animated.View style={[styles.container]}>
          <View
            style={[styles.mask]}
            ref={(ref) => {
              maskRef.current = ref;
            }}
          />
          <View pointerEvents={pointerEvents}>{children}</View>
        </Animated.View>
        <Animated.View style={[styles.drawer, drawerStyle, drawerTransform]}>
          {MenuContent}
        </Animated.View>
      </Animated.View>
    </>
  );

  return <PlatformContainer>{App}</PlatformContainer>;
};
