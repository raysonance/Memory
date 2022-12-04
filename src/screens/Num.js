import { StatusBar, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import { millisecondsToHuman } from '../utils/timer';
import generate from '../utils/rannums';
import GamerForm from '../components/GamerForm';

const Num = ({ navigation, route }) => {
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
          <GamerForm
            number={number}
            navigation={navigation}
            lvl={'lvl3'}
            params={route.params}
          />
        </Layout>
      )}
    </>
  );
};

export default Num;
