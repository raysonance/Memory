import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './src/screens/IntroScreen';
import NumberScreen from './src/screens/NumberScreen';
import NumSpeech from './src/screens/NumSpeech';
import Num from './src/screens/Num';
import Speech from './src/screens/Speech';
import MiniScreen from './src/screens/MiniScreen';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './src/redux/Store';
import { storage } from './storage';
import Hall from './src/screens/Hall';
import InfiniteSpeech from './src/screens/InfiniteSpeech';
import InfiniteNum from './src/screens/InfiniteNum';

const store = configureStore();

if (!storage.contains('showIntro')) {
  storage.set('showIntro', true);
}

const firstScreen = () => {
  const showIntro = storage.getBoolean('showIntro');
  const screen = showIntro ? 'Intro' : 'Number';
  return screen;
};

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={firstScreen()}
          screenOptions={screenOptions}>
          <Stack.Screen name={'Intro'} component={IntroScreen} />
          {/* <Stack.Screen name={'Menu'} component={MenuScreen} /> */}
          <Stack.Screen name={'Number'} component={NumberScreen} />
          <Stack.Screen name={'Mini'} component={MiniScreen} />
          <Stack.Screen name={'lvl1'} component={NumSpeech} />
          <Stack.Screen name={'lvl2'} component={Speech} />
          <Stack.Screen name={'lvl3'} component={Num} />
          <Stack.Screen name={'Hall'} component={Hall} />
          <Stack.Screen name={'InfiniteSpeech'} component={InfiniteSpeech} />
          <Stack.Screen name={'InfiniteNum'} component={InfiniteNum} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
