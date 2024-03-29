import { StatusBar, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Tts from 'react-native-tts';
import React, { useState } from 'react';
import generate from '../utils/rannums';
import GamerForm from '../components/GamerForm';
import toWord from '../utils/toWords';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

const Speech = ({ navigation, route }) => {
  function handleBackButtonClick() {
    Tts.stop();
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });
  const { num } = route.params;
  const numbers = generate(num);

  const [number] = useState(numbers);
  const [isRunning, setIsRunning] = useState(true);

  const word = toWord(number);

  React.useEffect(() => {
    Tts.setDefaultRate(0.5);
    Tts.addEventListener('tts-finish', () => setIsRunning(false));
    Tts.getInitStatus().then(
      () => {
        Tts.speak(word);
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      },
    );
  }, [number, word]);

  return (
    <>
      <StatusBar backgroundColor="#1A2138" />
      {isRunning ? (
        <Layout level="4" style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 40,
                paddingTop: 30,
                fontFamily: 'Action_Man',
              }}>
              Turn Up Your Volume and Memorize the word being spoken!
            </Text>
          </View>
        </Layout>
      ) : (
        <Layout level="4" style={{ flex: 1, justifyContent: 'center' }}>
          <GamerForm
            number={number}
            navigation={navigation}
            lvl={'lvl2'}
            params={route.params}
          />
        </Layout>
      )}
    </>
  );
};

export default Speech;
