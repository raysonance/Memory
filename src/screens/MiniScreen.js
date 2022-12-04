import { Image, StatusBar, StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import Options from "../components/Options";

const MiniScreen = ({ route, navigation }) => {
  const { star, image, title, key } = route.params;
  return (
    <Layout style={{ flex: 1, alignContent: "center" }}>
      <StatusBar backgroundColor="#1A2138" />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginTop: 50,
          marginBottom: 100,
        }}
      >
        <Text
          style={{
            fontFamily: "Action_Man_Bold",
            width: 200,
            lineHeight: 50,
            fontSize: 30,
          }}
        >
          Stage Mode: {title}
        </Text>
        <Image source={image} style={styles.image} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Options number={1} star={star} navigation={navigation} id={key} />
        <Options number={2} star={star} navigation={navigation} id={key} />
        <Options number={3} star={star} navigation={navigation} id={key} />
      </View>
    </Layout>
  );
};

export default MiniScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
