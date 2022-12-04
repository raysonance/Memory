import { View } from "react-native";
import { Text, Input, Layout, Button, Icon } from "@ui-kitten/components";
import React, { useState } from "react";
import { millisecondsToHuman } from "../utils/timer";
import { CommonActions } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useMMKVObject } from "react-native-mmkv";
import { Audio } from "expo-av";

const RetryIcon = (props) => <Icon {...props} name="repeat-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;
const SubmitIcon = (props) => <Icon {...props} name="paper-plane-outline" />;

const GamerForm = ({ navigation, number, lvl, params }) => {
  const { time, num, idLvl, id } = params;
  const formTime = [{ elapsed: 170000, isRunning: true }];

  const [timer2, setTimer2] = useState(formTime);

  const [stars, setStar] = useMMKVObject("Star");
  const elapsedString = millisecondsToHuman(timer2[0].elapsed);
  const [disabled, setDisabled] = useState(false);
  const [sound, setSound] = React.useState();

  const [value, setValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function playSuccess() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/success.mp3"),
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function playFaliure() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/negative.mp3"),
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    const TIME_INTERVAL = 1000;
    const intervalId = setInterval(() => {
      setTimer2(
        timer2.map((timer) => {
          const { elapsed, isRunning } = timer;
          if (elapsed <= 0) {
            setDisabled(true);
            return {
              ...timer,
              isRunning: false,
            };
          }
          return {
            ...timer,
            elapsed: isRunning ? elapsed - TIME_INTERVAL : elapsed,
          };
        })
      );
    }, 1);
    return () => {
      clearInterval(intervalId);
    };
  });

  const renderCaption = () => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 10 }}>
          When Memorizing try to capture a mental image
        </Text>
      </View>
    );
  };

  const checkResult = () => {
    setDisabled(true);
    if (number === value) {
      playSuccess();
      const dummy = stars;
      if (dummy[idLvl] < id) {
        dummy[idLvl] = id;
        setStar(dummy);
      }
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate("Number");
      }, 1000);
    } else {
      playFaliure();
      setError(true);
      setTimeout(() => {
        navigation.navigate("Number");
      }, 1000);
    }
  };

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [
      { name: "Number" },
      {
        name: `${lvl}`,
        params: { time: time, num: num, idLvl: idLvl, id: id },
      },
    ],
  });

  return (
    <View>
      {success && (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <AnimatedLottieView
            style={{ height: 120 }}
            source={require("../assets/animations/checkmark-success.json")}
            autoPlay
            loop={false}
            speed={1.5}
            duration="1000"
          />
        </View>
      )}
      {error && (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <AnimatedLottieView
            style={{ height: 120 }}
            source={require("../assets/animations/error.json")}
            autoPlay
            loop={false}
            speed={1.5}
            duration="1000"
          />
        </View>
      )}
      <View
        style={{ borderWidth: 2, marginHorizontal: 10, borderColor: "teal" }}
      >
        <Layout style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: 30, fontFamily: "Action_Man", color: "red" }}
          >
            {elapsedString}
          </Text>
        </Layout>
        <Input
          keyboardType="numeric"
          disabled={disabled}
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
          size="medium"
          textStyle={{ paddingVertical: 5, fontFamily: "Action_Man" }}
          style={{ marginHorizontal: 20, paddingVertical: 30 }}
          placeholder="Enter the number"
          caption={renderCaption}
        />
        <Button
          onPress={() => checkResult()}
          appearance="outline"
          status="success"
          accessoryLeft={SubmitIcon}
          size="large"
          style={{
            marginHorizontal: 40,
            padding: 20,
            marginVertical: 40,
          }}
        >
          Submit
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onPress={() => navigation.dispatch(resetAction)}
          appearance="outline"
          status="info"
          accessoryLeft={RetryIcon}
          size="large"
          style={{ marginTop: 40, marginHorizontal: 40, padding: 20 }}
        >
          Retry
        </Button>
        <Button
          appearance="outline"
          onPress={() => navigation.navigate("Number")}
          status="danger"
          size="large"
          accessoryLeft={TrashIcon}
          style={{ marginTop: 40, marginHorizontal: 40 }}
        >
          Quit
        </Button>
      </View>
    </View>
  );
};

export default GamerForm;
