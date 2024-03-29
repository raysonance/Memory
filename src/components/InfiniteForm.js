import { View } from "react-native";
import { Text, Input, Layout, Button, Icon } from "@ui-kitten/components";
import React, { useState } from "react";
// import { millisecondsToHuman } from "../utils/timer";
import { CommonActions } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useMMKVObject } from "react-native-mmkv";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";

// for button icons
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;
const SubmitIcon = (props) => <Icon {...props} name="paper-plane-outline" />;

const InfiniteForm = ({ navigation, number, params }) => {
  const { num, level, time } = params;

  let stage = level.toLowerCase();
  // const formTime = [{ elapsed: 170000, isRunning: true }];

  // const [timer2, setTimer2] = useState(formTime);
  const [scores, setScore] = useMMKVObject("Score");
  const [sound, setSound] = React.useState();

  // const elapsedString = millisecondsToHuman(timer2[0].elapsed);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  // play success music
  async function playSuccess() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/success.mp3"),
      { shouldPlay: true }
    );
    setSound(sound);

    await sound.playAsync();
  }

  //play failure music
  async function playFaliure() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/negative.mp3"),
      { shouldPlay: true }
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [value, setValue] = useState("");
  const [success, setSuccess] = useState(false);

  const renderCaption = () => {
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 10 }}>
          When Memorizing try to capture a mental image
        </Text>
      </View>
    );
  };

  const dispatch = useDispatch();

  // add point for player 1, redo later
  const addPoint = (key, point, score2, player) =>
    dispatch({
      type: "INCREASE_SCORE",
      payload: {
        key: key,
        score1: point,
        score2: score2,
        player: player,
      },
    });

  // add point for player 2, redo later
  const addPoint2 = (key, point, score1, player) =>
    dispatch({
      type: "INCREASE_SCORE",
      payload: {
        key: key,
        score1: score1,
        score2: point,
        player: player,
      },
    });

  const removePoint = (key) =>
    dispatch({
      type: "INCREASE_SCORE",
      payload: {
        key: key,
      },
    });

  const { score1, score2, player } = useSelector(
    (state) => state.GameReducer.gameItems
  );

  const checkResult = () => {
    setDisabled(true);
    if (number === value) {
      playSuccess();
      player === 1
        ? addPoint(stage, score1 + 1, score2, player)
        : addPoint2(stage, score2 + 1, score1, player);
      setSuccess(true);
      setTimeout(() => {
        navigation.dispatch(resetAction);
      }, 1000);
    } else {
      playFaliure();
      setError(true);

      const dummyScore = scores;
      const score = score1 > score2 ? score1 : score2;
      if (dummyScore[stage] < score) {
        dummyScore[stage] = score;
        setScore(dummyScore);
      }
      removePoint(stage);
      setTimeout(() => {
        navigation.navigate("Hall");
      }, 1000);
    }
  };

  const binary = () => {
    const randomNumber = Math.floor(Math.random() * 9);
    const numberBinary = randomNumber % 2;
    const gameStyle = numberBinary === 0 ? "InfiniteSpeech" : "InfiniteNum";
    return gameStyle;
  };

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [
      { name: "Hall" },
      {
        name: binary(),
        params: { num: num, level: stage, time: time },
      },
    ],
  });

  return (
    <View>
      {success && (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <AnimatedLottieView
            style={{ height: 120 }}
            source={require("../../assets/animations/rocket.json")}
            autoPlay
            loop={false}
            speed={1}
            duration="1000"
          />
        </View>
      )}
      {error && (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <AnimatedLottieView
            style={{ height: 120 }}
            source={require("../../assets/animations/error.json")}
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
            ∞
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
          appearance="outline"
          onPress={() => {
            const dummyScore = scores;
            const score = score1 > score2 ? score1 : score2;
            if (dummyScore[stage] < score) {
              dummyScore[stage] = score;
              setScore(dummyScore);
            }
            removePoint(stage);
            navigation.navigate("Hall");
          }}
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

export default InfiniteForm;
