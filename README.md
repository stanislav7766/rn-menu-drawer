<h1>React Native Menu Drawer Component</h1>
<h2>Easy way to present menu side to your app</h2>
<h3>Attention: before use component see examples and read spec!!</h3><br/><br/>

<div>
A little bit about implementation. <br/>
The component implemented with React Native's PanResponder, Animated.<br/>
Depends on external bool(prop - 'open') and cb(prop - 'onShowMenu'). So, added hook for ease of use.(Also, you can write own hook)<br/>
Don't worry about scrolling in your app. When 'moving state' detected - applied special mask layer for children(zIndex, pointerEvents).<br/>
As a result, no need disabling 'scrollEnabled' prop in your ScrollView, FlatList etc.</div><br/><br/>

- [<h3>Installation</h3>](#h2installationh2)
- [<h3>Examples</h3>](#h2examplesh2)
- [<h3>Video</h3>](#h2video-usageh2)
- [<h3>Props</h3>](#h2propsh2)

## <h2>Installation:</h2>

<br/>

`npm install --save @stanislav7766/rn-menu-drawer`

<div>or</div>

`yarn add @stanislav7766/rn-menu-drawer`
<br/><br/>

## <h2>Examples:</h2>

<br/><h3>MenuDrawer usage:</h3>

```javascript
// body of your component
...
// impelementing MenuContent, YourScreen
...
  const [showMenu, setShowMenu] = useState(false);
...
 const ScreenWithMenu = (
    <MenuDrawer
      open={showMenu}
      onShowMenu={setShowMenu}
      opacity={0.35}
      backgroundColor='#000'
      drawerWidth={300}
      animationTime={250}
      allowedSwipeWidth={200}
      tapToClose
      paddingGesture={50}
      position="right"
      MenuContent={SomeMenuContent}>
      {YourScreen}
    </MenuDrawer>
  );
...
// return
return {ScreenWithMenu};

```

<br/><h3>useMenuDrawer(default params) usage:</h3>

```javascript
// body of your component
...
// impelementing MenuContent, YourScreen
...
   const [ScreenWithMenu] = useMenuDrawer({
    MenuContent,
    children: YourApp,
  });
...
// return
return {ScreenWithMenu};

```

<br/><h3>useMenuDrawer usage:</h3>

```javascript
// body of your component
...
// impelementing MenuContent, YourScreen
...
  const [ScreenWithMenu, onShowMenu, onHideMenu] = useMenuDrawer({
    opacity: 0.35,
    backgroundColor: '#000',
    drawerWidth: 300,
    animationTime: 250,
    tapToClose: true,
    paddingGesture: 50,
    position: 'left',
    MenuContent,
    children: YourApp,
  });
...
//calling onShowMenu, onHideMenu for managing menu side. For example, onPress
...
// return
return {ScreenWithMenu};

```

<br/><br/>

## <h2>Video usage:</h2>

<br/><a href="https://github.com/stanislav7766/rn-menu-drawer-examples">see video</a>
<br/><br/>

## <h2>Props:</h2>

<br/><h3>MenuDrawer Props:</h3>

| Prop              | Type                    | Required | Default Value     | Desciption                                                                                                                                                         |
| ----------------- | ----------------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| open              | boolean                 | true     | -                 | If true, shows menu side otherwise hides                                                                                                                           |
| onShowMenu        | (show: boolean) => void | true     | -                 | Need for manage open prop                                                                                                                                          |
| tapToClose        | boolean                 | true     | -                 | If true, single tap outside of menu area - hides menu otherwise notihing happened                                                                                  |
| position          | 'left', 'right'         | true     | -                 | Set menu position on screen                                                                                                                                        |
| paddingGesture    | number                  | true     | -                 | Define area for hand gesture to show menu                                                                                                                          |
| drawerWidth       | number                  | true     | -                 | Set menu width on screen                                                                                                                                           |
| allowedSwipeWidth | number                  | false    | width_screen\*0.5 | Set width of hand swipe that manages menu side. If real swipe's width >= 'your_value', menu side will be opened\hidden otherwise will be returned to it's original |
| animationTime     | number                  | true     | -                 | Set animation time on show\hide menu side                                                                                                                          |
| opacity           | number                  | true     | -                 | Set max opacity value to children's mask. Opacity will be dynamically changed from 0 to 'your_value' on 'moving state'. Use range 0..1                             |
| backgroundColor   | string                  | true     | -                 | Set background color to children's mask. Background color will be applied to mask on 'moving state' only. Use hex or rgb colors                                    |
| MenuContent       | JSX.Element             | true     | -                 | It's your component that will be rendered on menu side                                                                                                             |
| children          | React.ReactNode         | true     | -                 | It's your app\screen component that will be wrapped by MenuDrawer                                                                                                  |

<br/><h3>useMenuDrawer params:</h3>

| param             | Type            | Required | Default Value     |
| ----------------- | --------------- | -------- | ----------------- |
| tapToClose        | boolean         | false    | true              |
| position          | 'left', 'right' | false    | 'right'           |
| paddingGesture    | number          | false    | 50                |
| drawerWidth       | number          | false    | width_screen\*0.7 |
| allowedSwipeWidth | number          | false    | width_screen\*0.5 |
| animationTime     | number          | false    | 250               |
| opacity           | number          | false    | 0.35              |
| backgroundColor   | string          | false    | '#000'            |
| MenuContent       | JSX.Element     | true     | -                 |
| children          | React.ReactNode | true     | -                 |
