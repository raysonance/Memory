import { Layout, Text, Icon } from '@ui-kitten/components';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Levels({ navigation, item }) {
  // this makes levels not navigate when it is locked
  const nav = () =>
    item.locked === false
      ? navigation.navigate('Mini', {
          key: item.key,
          title: item.title,
          image: item.image,
          star: item.star,
        })
      : null;
  return (
    <TouchableOpacity onPress={() => nav()}>
      <View style={styles.container} level="4">
        <View style={{ flexDirection: "row" }}>
          <Layout style={{ borderRadius: 20, marginHorizontal: 5 }}>
            {item.locked === true ? (
              <View
                style={{
                  width: 90,
                  height: 90,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  fill="purple"
                  name="lock"
                />
              </View>
            ) : (
              <Image
                source={item.image}
                style={{
                  resizeMode: "contain",
                  width: 90,
                  height: 90,
                  borderRadius: 30,
                }}
              />
            )}
          </Layout>
          <View style={{ justifyContent: "space-evenly", marginLeft: 10 }}>
            <Text style={{ fontFamily: "Action_Man_Bold", fontSize: 30 }}>
              {item.title}
            </Text>
            <Text
              style={{ fontFamily: "Action_Man", fontSize: 10 }}
              appearance="hint"
            >
              {item.description}
            </Text>
          </View>
          <View style={styles.star}>
            {/* {item.star >= 3 ? (
              <AnimatedLottieView
                style={{ height: 100, margin: -15, paddingLeft: 20 }}
                source={require("../assets/animations/check-happy.json")}
                autoPlay
                loop={false}
                speed={1}
                duration="1000"
              />
            ) : ( */}
              <Star star={item.star} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Star = ({ star }) => {
  const fill = num => (star >= num ? '#f8e825' : '#7ba6e0');
  const name = num => (star >= num ? 'star' : 'star');

  return (
    <View style={{ marginLeft: 20, marginVertical: 20, flexDirection: 'row' }}>
      <Icon
        style={{
          width: 25,
          height: 25,
          position: 'absolute',
          right: 42,
          bottom: 7,
          transform: [{ rotate: '-40deg' }],
        }}
        fill={fill(1)}
        name={name(1)}
      />
      <Icon
        style={{
          width: 25,
          height: 25,
          position: 'absolute',
          right: 21,
          bottom: 0,
        }}
        fill={fill(2)}
        name={name(2)}
      />
      <Icon
        style={{
          width: 25,
          height: 25,
          position: 'absolute',
          right: 0,
          bottom: 7,
          transform: [{ rotate: '40deg' }],
        }}
        fill={fill(3)}
        name={name(3)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#212b46',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
    marginHorizontal: 15,
    paddingVertical: 8,
  },
  star: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 25,
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
