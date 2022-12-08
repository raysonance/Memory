import { Text, Icon } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, TouchableOpacity, View } from 'react-native';

const Options = ({ navigation, number, star, id }) => {
  const data = {
    1: { image: require('../../assets/images/angry.jpg'), text: 'easy', nav: 'lvl1' },
    2: { image: require('../../assets/images/smiling.jpg'), text: 'medium', nav: 'lvl2' },
    3: {
      image: require('../../assets/images/smile.jpg'),
      text: 'difficult',
      nav: 'lvl3',
    },
  };

  const active = ++star >= number ? 'active' : 'inactive';

  const touch = active !== 'active' ? 0.3 : 1;

  const elapsed = {
    1: { time: 10000, number: 6 },
    2: { time: 20000, number: 7 },
    3: { time: 30000, number: 8 },
    4: { time: 50000, number: 10 },
    5: { time: 60000, number: 11 },
  };

  const nav = () =>
    active === 'active'
      ? navigation.navigate(data[number].nav, {
          time: elapsed[id].time,
          num: elapsed[id].number,
          idLvl: id,
          id: number,
        })
      : null;

  return (
    <View>
      <TouchableOpacity
        onPress={() => nav()}
        activeOpacity={active === 'active' ? 0.5 : 1}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 6,
          }}>
          <Image
            style={[styles.story, { opacity: touch }]}
            source={data[number].image}
          />
          {active === 'inactive' && (
            <Icon
              style={{
                width: 25,
                height: 25,
                position: 'absolute',
                right: 42,
                bottom: 7,
              }}
              fill="white"
              name="lock"
            />
          )}
        </View>
        <Text
          style={{
            fontFamily: 'Action_Man',
            fontSize: 13,
            textAlign: 'center',
          }}>
          {data[number].text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  story: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ff8501',
  },
});
