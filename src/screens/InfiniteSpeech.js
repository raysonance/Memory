import { StatusBar, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Tts from 'react-native-tts';
import React, { useState } from 'react';
import generate from '../utils/rannums';
import toWord from '../utils/toWords';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import InfiniteForm from '../components/InfiniteForm';
import { useDispatch, useSelector } from 'react-redux';

const InfiniteSpeech = ({ navigation, route }) => {
  const { score1, score2, player } = useSelector(state => state.GameReducer.gameItems);

  const dispatch = useDispatch();

  const removePoint = key =>
    dispatch({
      type: 'INCREASE_SCORE',
      payload: {
        key: key,
      },
    });

  function handleBackButtonClick() {
    Tts.stop();
    removePoint(0);
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                alignItems: "flex-start",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Action_Man",
                  color: "red",
                }}
              >
                Player One: {score1}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                marginRight: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Action_Man",
                  color: "blue",
                }}
              >
                Player Two: {score2}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 70 }}>
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                fontSize: 50,
                fontFamily: "Action_Man",
              }}
            >
              Player {player}
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: "50%", marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 40,
                fontFamily: "Action_Man",
              }}
            >
              Turn Up Your Volume and Memorize the word being spoken!
            </Text>
          </View>
        </Layout>
      ) : (
        <Layout level="4" style={{ flex: 1, justifyContent: "center" }}>
          <InfiniteForm
            number={number}
            navigation={navigation}
            params={route.params}
          />
        </Layout>
      )}
    </>
  );
};

export default InfiniteSpeech;
