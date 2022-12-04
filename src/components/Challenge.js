import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { Icon } from '@ui-kitten/components';
import { useMMKVObject } from 'react-native-mmkv';
import { data } from '../data/data';

const beginner = ['#d1977f', '#a45b3b'];
const skilled = ['#cfe0ea', '#436882'];
const master = ['#f8ff95', '#f0b118'];
const locked = ['#a8a8a8', '#ececec'];

const Challenge = ({ level, yourBest, id, navigation }) => {
  const [star] = useMMKVObject('Star');

  // maps through data and appends star to each corresponding object
  data.map(item => (item.star = star[item.key]));

  let rock = 'lock';
  for (let i = 0; i < data.length; i++) {
    if (rock !== 'lock') {
      data[i].locked = true;
    } else {
      data[i].locked = false;
    }
    if (data[i].star < 3) {
      rock = 'fish';
    }
  }

  let mode = beginner;

  if (id === 0) {
    mode = beginner;
  } else if (id === 1 && data[2].locked === false) {
    mode = skilled;
  } else if (id === 2 && data[4].locked === false) {
    mode = master;
  } else {
    mode = locked;
  }

  const nav = () => {
    if (id === 0) {
      navigation.navigate('InfiniteSpeech', {
        num: 7,
        time: 20000,
        id: 0,
        level: level,
      });
    } else if (id === 1) {
      navigation.navigate('InfiniteSpeech', {
        num: 9,
        id: 1,
        time: 40000,
        level: level,
      });
    } else if (id === 2) {
      navigation.navigate('InfiniteSpeech', {
        num: 12,
        time: 70000,
        id: 2,
        level: level,
      });
    }
  };

  return (
    <View style={{ marginBottom: 50 }}>
      <View
        style={{
          marginHorizontal: 10,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: 110,
            height: 110,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mode[0],
            borderRadius: 15,
            transform: [{ rotate: '45deg' }],
          }}>
          <View>
            <View
              style={{
                borderWidth: 3,
                borderRadius: 15,
                borderColor: mode[1],
                backgroundColor: mode[0],
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  transform: [{ rotate: '-45deg' }],
                  alignItems: 'center',
                }}>
                <Icon
                  name="award"
                  fill={mode[1]}
                  style={{ width: 50, height: 50 }}
                />
                <View
                  style={{
                    width: 120,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 3,
                    backgroundColor: mode[1],
                    borderColor: mode[0],
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Action_Man_Bold',
                      color: 'white',
                      fontSize: 20,
                    }}>
                    {level}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: '15%' }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Action_Man',
              fontSize: 20,
              marginTop: 20,
              color: '#97b2c5',
            }}>
            World Best: <Text style={{ color: 'black' }}>78</Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Action_Man',
              fontSize: 20,
              color: '#97b2c5',
            }}>
            Your Best: <Text style={{ color: 'black' }}>{yourBest}</Text>
          </Text>
          {mode !== locked ? (
            <TouchableOpacity onPress={() => nav()}>
              <View
                style={{
                  width: 170,
                  paddingVertical: 10,
                  marginVertical: 10,
                  backgroundColor: 'blue',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Action_Man_Bold',
                    fontSize: 17,
                    color: 'white',
                  }}>
                  Play
                </Text>
              </View>
            </TouchableOpacity>
          ) : id === 1 ? (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Action_Man',
                fontSize: 20,
                paddingVertical: 10,
                marginVertical: 10,
                color: '#97b2c5',
              }}>
              Smart Required
            </Text>
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Action_Man',
                fontSize: 20,
                paddingVertical: 10,
                marginVertical: 7,
                color: '#97b2c5',
              }}>
              White Room Required
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Challenge;
