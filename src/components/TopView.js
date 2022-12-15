import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Icon, Text, Layout, Modal, Card } from '@ui-kitten/components';

const color = { 1: 'brown', 2: 'yellow', 3: 'blue', 4: 'red', 5: 'white' };

const TopView = ({ navigation, level, id, test }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <View>
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
        <TouchableOpacity onPress={() => navigation.navigate("Hall")}>
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
              <Icon name="heart" fill="red" style={{ width: 20, height: 20 }} />
              <Text> by Favour</Text>
            </View>
          </Card>
        </Modal>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={{
              width: 30,
              height: 30,
            }}
            fill={color[id]}
            name="arrow-ios-back-outline"
          />
        </TouchableOpacity> */}
      <View style={{ marginLeft: 20, marginVertical: 10, width: 200 }}>
        <Text
          style={{
            fontSize: 30,
            lineHeight: 30,
          }}
        >
          Test your Memory!
        </Text>
      </View>
      <GraphSheet level={level} id={id} test={test} />
    </View>
  );
};

export default TopView;

const GraphSheet = ({ level, id, test }) => {
  return (
    <Layout style={{ borderRadius: 30, marginHorizontal: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginLeft: 20, marginTop: 35, width: 200 }}>
          <Text
            style={{
              fontSize: 27,
              lineHeight: 30,
              fontFamily: "Action_Man",
            }}
          >
            Your Average Memory Score!
          </Text>
        </View>
        <View
          level="4"
          style={{
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              width: 150,
              marginTop: 30,
              marginRight: 20,
              color: color[id],
            }}
          >
            {level}
          </Text>
        </View>
      </View>
      <View
        level="3"
        style={{
          marginBottom: 20,
          marginTop: -10,
          alignItems: "flex-start",
          marginLeft: 20,
        }}
      >
        <Text
          appearance="hint"
          style={{
            fontSize: 13,
            fontFamily: "Action_Man",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {test}/5 tests completed
        </Text>
      </View>
    </Layout>
  );
};
