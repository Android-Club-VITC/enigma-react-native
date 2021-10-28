import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const demoData = Array(3)
  .fill(0)
  .map((_, i) => {
    return {
      profile: `https://randomuser.me/api/portraits/men/${
        parseInt(Math.random() * 10) + 20
      }.jpg`,
      stories: Array(i + 1)
        .fill(0)
        .map((__, j) => {
          return `https://randomuser.me/api/portraits/men/${
            parseInt(Math.random() * 10) + 20
          }.jpg`;
        }),
    };
  });

function StoryButton({ handlePress, profile }) {
  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 10,
          borderWidth: 2,
        }}
      >
        <Image
          source={{ uri: profile }}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
      </View>
    </Pressable>
  );
}

function StoryModal({ showModal, handleClose, stories }) {
  const isVisible = showModal();
  const animatedProgress = useSharedValue(0);
  const numStories = stories.length;

  useEffect(() => {
    if (isVisible) {
      animatedProgress.value = 0;
      animatedProgress.value = withTiming(width, {
        duration: numStories * 3000,
      });
    }
  }, [isVisible]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: animatedProgress.value,
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{
          translateX: -animatedProgress.value
      }],
    };
  });

  return (
    <Modal visible={isVisible}>
      <Button onPress={handleClose} title="close" />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Animated.View
          style={{
            position: "absolute",
            flexDirection: "row",
            height: 5,
            top: 10,
            width: "100%",
            backgroundColor: "lightgrey",
            zIndex: 99,
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                left: 0,
                height: "100%",
                backgroundColor: "white",
              },
              animatedProgressStyle,
            ]}
          ></Animated.View>
          {stories.map((_, i) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  borderLeftWidth: i != 0 ? 2 : 0,
                  borderColor: "grey",
                }}
              ></View>
            );
          })}
        </Animated.View>
        <View style={{ height: "100%", width, flexDirection: "row" }}>
          {stories.map((x, i) => {
            return (
              <Animated.Image
                key={i}
                source={{ uri: x }}
                style={{ height: "100%", width, position: "absolute" }}
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

export default function InstaStories() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stories, setStories] = useState([]);

  function showModal() {
    if (isModalVisible && stories.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <View style={{ backgroundColor: "cyan", flex: 1 }}>
      <StatusBar hidden />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          marginTop: 60,
        }}
      >
        {demoData.map((x, i) => {
          return (
            <StoryButton
              profile={x.profile}
              key={i}
              handlePress={() => {
                setIsModalVisible(true), setStories(x.stories);
              }}
            />
          );
        })}
      </View>
      <StoryModal
        stories={stories}
        showModal={() => showModal()}
        handleClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
