import {
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Challenge from "../components/Challenge";
import { storage } from "../../storage";
import { Score } from "../data/data";
import { useMMKVObject } from "react-native-mmkv";
import { Card, Icon, Modal, Text } from "@ui-kitten/components";

if (!storage.contains("Score")) {
  storage.set("Score", JSON.stringify(Score));
}

const Hall = ({ navigation }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [score] = useMMKVObject("Score");

  return (
    <>
      <StatusBar backgroundColor="#4e79d5" />
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={require("../../assets/bg/3.jpg")}
      >
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <Icon
              style={{
                width: 30,
                height: 30,
              }}
              fill="#FFFFFF"
              name="menu-2-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Number")}>
            <Icon
              style={{
                width: 30,
                height: 30,
              }}
              fill="#FFFFFF"
              name="repeat"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            visible={visibleModal}
            backdropStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onBackdropPress={() => setVisibleModal(false)}
          >
            <Card>
              <View style={{ flexDirection: "row" }}>
                <Text>Made with </Text>
                <Icon
                  name="heart"
                  fill="red"
                  style={{ width: 20, height: 20 }}
                />
                <Text> by Favour</Text>
              </View>
            </Card>
          </Modal>
        </View>
        <View style={{ marginLeft: 15, marginTop: 30 }}>
          <Challenge
            level={"Beginner"}
            id={0}
            yourBest={score.beginner}
            navigation={navigation}
          />
          <Challenge
            level={"Skilled"}
            id={1}
            yourBest={score.skilled}
            navigation={navigation}
          />
          <Challenge
            level={"Master"}
            id={2}
            yourBest={score.master}
            navigation={navigation}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Hall;
