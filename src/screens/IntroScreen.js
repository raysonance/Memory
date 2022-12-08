import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { Icon, Layout, Text } from '@ui-kitten/components';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'one',
    title: 'Best Memorization App',
    text: "Best app for memorization. It's really something cool",
    image: require('../assets/png/1-min.png'),
  },
  {
    key: 'two',
    title: 'Boost Your Brain Power',
    text: 'Other cool stuff',
    image: require('../assets/png/2-min.png'),
  },
  {
    key: 'three',
    title: 'Memorize Like a Genius',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../assets/png/3-min.png'),
  },
];

const IntroScreen = ({ navigation }) => {
  const onDone = () => {
    navigation.navigate('Number');
  };

  const renderNextButton = () => {
    return (
      <Layout style={{ borderRadius: 20 }} level="2">
        <Icon
          style={{
            width: 40,
            height: 40,
          }}
          fill="#FFFFFF"
          name="arrow-ios-forward"
        />
      </Layout>
    );
  };

  const renderDoneButton = () => {
    return (
      <Layout
        style={{
          backgroundColor: '#00E096',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
        }}>
        <Icon
          style={{
            width: 30,
            height: 30,
          }}
          fill="#FFFFFF"
          name="checkmark-outline"
        />
      </Layout>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Layout style={styles.container} key={item.key}>
        <Image style={styles.image} source={item.image} />
        <Layout>
          <Text category="h1" style={styles.title}>
            {item.title}
          </Text>
          <Text category="s1" style={styles.desc}>
            {item.text}
          </Text>
        </Layout>
      </Layout>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#1A2138" />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
      />
    </>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  title: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 30,
  },
  desc: {
    textAlign: 'center',
    marginVertical: 30,
    color: '#635b6c',
  },

  dot: {
    backgroundColor: '#c3a8ee',
  },

  activeDot: {
    backgroundColor: '#743fde',
  },
});
