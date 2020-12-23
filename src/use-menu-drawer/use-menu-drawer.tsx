import React, { useState, ReactNode } from "react";
import { WIDTH_SCREEN } from "../constants";
import { IUseDrawerParams, Position } from "../types";
import { MenuDrawer } from "../menu-drawer";

export const useMenuDrawer = ({
  children,
  MenuContent,
  position,
  drawerWidth,
  allowedSwipeWidth,
  animationTime,
  paddingGesture,
  tapToClose,
  backgroundColor,
  opacity,
}: IUseDrawerParams): [ReactNode, () => void, () => void] => {
  const [showMenu, setShowMenu] = useState(false);

  const onHideMenu = (): void => {
    setShowMenu(false);
  };
  const onShowMenu = (): void => {
    setShowMenu(true);
  };

  const ShowMenu = (
    <MenuDrawer
      open={showMenu}
      MenuContent={MenuContent ?? (defaultParams.MenuContent as JSX.Element)}
      position={position ?? (defaultParams.position as Position)}
      onShowMenu={setShowMenu}
      drawerWidth={drawerWidth ?? (defaultParams.drawerWidth as number)}
      allowedSwipeWidth={
        allowedSwipeWidth ?? (defaultParams.allowedSwipeWidth as number)
      }
      animationTime={animationTime ?? (defaultParams.animationTime as number)}
      paddingGesture={
        paddingGesture ?? (defaultParams.paddingGesture as number)
      }
      tapToClose={tapToClose ?? (defaultParams.tapToClose as boolean)}
      backgroundColor={
        backgroundColor ?? (defaultParams.backgroundColor as string)
      }
      opacity={opacity ?? (defaultParams.opacity as number)}
    >
      {children}
    </MenuDrawer>
  );
  return [ShowMenu, onShowMenu, onHideMenu];
};

const defaultParams: IUseDrawerParams = {
  children: <></>,
  MenuContent: <></>,
  position: "right",
  drawerWidth: WIDTH_SCREEN * 0.7,
  allowedSwipeWidth: WIDTH_SCREEN / 2,
  animationTime: 250,
  paddingGesture: 50,
  tapToClose: true,
  backgroundColor: "#000",
  opacity: 0.35,
};
