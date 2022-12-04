import { View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

const GameCard = ({ number, elapsedString }) => {
  return (
    <Layout level="4" style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: 20,
        }}
        level="1">
        <Text
          style={{
            fontSize: 60,
            paddingLeft: 40,
            fontFamily: 'Action_Man',
          }}>
          {number}
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Action_Man',
            color: 'red',
            textAlign: 'right',
          }}>
          {elapsedString}
        </Text>
      </View>
    </Layout>
  );
};

export default GameCard;
