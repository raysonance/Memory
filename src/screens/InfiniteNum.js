import { StatusBar, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import { millisecondsToHuman } from '../utils/timer';
import generate from '../utils/rannums';
import InfiniteForm from '../components/InfiniteForm';
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

const InfiniteNum = ({ navigation, route }) => {
  const { score } = useSelector(state => state.GameReducer.gameItems);
  const dispatch = useDispatch();

  const removePoint = key =>
    dispatch({
      type: 'INCREASE_SCORE',
      payload: {
        key: key,
      },
    });

  function handleBackButtonClick() {
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

  const { time, num } = route.params;
  const state = [{ elapsed: time, isRunning: true }];

  const [number] = useState(generate(num));
  const [timer, setTimer] = useState(state);

  const elapsedString = millisecondsToHuman(timer[0].elapsed);

  React.useEffect(() => {
    const TIME_INTERVAL = 1000;
    const intervalId = setInterval(() => {
      setTimer(
        timer.map(sec => {
          const { elapsed, isRunning } = sec;
          if (elapsed <= 0) {
            return {
              ...sec,
              isRunning: false,
            };
          }
          return {
            ...sec,
            elapsed: isRunning ? elapsed - TIME_INTERVAL : elapsed,
          };
        }),
      );
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <>
      <StatusBar backgroundColor="#1A2138" />
      {timer[0].isRunning ? (
        <Layout level="4" style={{ flex: 1 }}>
          <View
            style={{ alignItems: 'flex-end', marginRight: 20, marginTop: 20 }}>
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 25,
                fontFamily: 'Action_Man',
              }}>
              Score: {score}
            </Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 40,
                paddingTop: 30,
                fontFamily: 'Action_Man',
              }}>
              Memorize the number on the screen before the Timer runs out!
            </Text>
          </View>
          <GameCard number={number} elapsedString={elapsedString} />
        </Layout>
      ) : (
        <Layout level="4" style={{ flex: 1, justifyContent: 'center' }}>
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

export default InfiniteNum;
