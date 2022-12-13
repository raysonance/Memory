import React from "react";
import { Layout } from "@ui-kitten/components";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import Levels from "../components/Levels";
import TopView from "../components/TopView";
import { storage } from "../../storage";
import { useMMKVObject } from "react-native-mmkv";
import { data, Star } from "../data/data";
import Tts from "react-native-tts";

if (!storage.contains("Star")) {
  storage.set("Star", JSON.stringify(Star));
}

const NumberScreen = ({ navigation }) => {
  Tts.getInitStatus().then(
    () => {
      Tts.speak("");
      Tts.stop();
    },
    (err) => {
      if (err.code === "no_engine") {
        Tts.requestInstallEngine();
      }
    }
  );

  const [star] = useMMKVObject("Star");

  // maps through data and appends star to each corresponding object
  data.map((item) => (item.star = star[item.key]));

  // for the topview
  const level = data.find((item) => item.star < 3);
  let newArray = data.filter((item) => {
    return item.star === 3;
  });
  let test = newArray[newArray.length - 1];

  // this locks all levels below your current level
  let rock = "lock";
  for (let i = 0; i < data.length; i++) {
    if (rock !== "lock") {
      data[i].locked = true;
    } else {
      data[i].locked = false;
    }
    if (data[i].star < 3) {
      rock = "fish";
    }
  }

  return (
    <Layout level="4" style={{ flex: 1 }}>
      <StatusBar backgroundColor="#111427" />
      <TopView
        navigation={navigation}
        test={test ? test.key : "0"}
        level={level ? level.title : "God"}
        id={level ? level.key : "5"}
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 12,
          marginLeft: 25,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/png/flag-min.png")}
          style={{
            resizeMode: "contain",
            width: 20,
            height: 20,
            tintColor: "#8f85c1",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginRight: 10,
              fontFamily: "Pacifico",
            }}
          >
            Your
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#8f85c1",
              fontFamily: "Pacifico",
            }}
          >
            journey
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginVertical: 10 }}>
        {data.map((item) => (
          <Levels item={item} key={item.key} navigation={navigation} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default NumberScreen;
