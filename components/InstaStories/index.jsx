import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Modal,
  Pressable,
  Button,
  Dimensions
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  useDerivedValue,
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
          return `https://picsum.photos/seed/${i * 2 + j * 3}/${parseInt(
            width
          )}/${parseInt(height)}`;
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
          borderColor: "#fff",
          borderWidth: 2,
          elevation: 20,
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

function StoryModal({ showModal, handleClose, offset, data }) {
  const isVisible = showModal();
  const [storyOffset, setStoryOffset] = useState(0);
  const [stories, setStories] = useState([]);
  const animatedProgress = useSharedValue(0);
  const animatedTranslateX = useSharedValue(0);

  useEffect(() => {
    setStories(data[storyOffset].stories);
    animatedProgress.value = 0;
  }, [storyOffset]);

  useEffect(() => {
    setStoryOffset(offset);
  }, [offset]);

  useEffect(() => {
    if (isVisible) {
      animatedProgress.value = 0;
      animatedProgress.value = withTiming(width, {
        duration: stories.length * 3000,
      });
    }
  }, [isVisible, stories]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: animatedProgress.value,
    };
  });

  const animatedStoryStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -animatedTranslateX.value,
        },
      ],
    };
  });

  function nextStoryHandler() {
    if (storyOffset == demoData.length - 1) {
      handleClose();
    } else {
      setStoryOffset((x) => x + 1);
    }
  }

  function prevStoryHandler() {
    if (storyOffset == 0) {
      handleClose();
    } else {
      setStoryOffset((x) => x - 1);
    }
  }

  const storyHandler = (progressValue) => {
    if (progressValue >= width) {
      nextStoryHandler();
    } else {
      animatedTranslateX.value =
        parseInt(progressValue / (width / stories.length)) * width;
    }
  };

  const switchNextStoryOnPress = () => {
    const idx = parseInt(animatedProgress.value / (width / stories.length));
    if (idx < stories.length) {
      animatedProgress.value = (idx + 1) * (width / stories.length);
      animatedProgress.value = withTiming(width, {
        duration: stories.length * 3000,
      });
    } else {
      nextStoryHandler();
    }
  };

  const switchPrevStoryOnPress = () => {
    const idx = parseInt(animatedProgress.value / (width / stories.length));
    if (idx != 0) {
      animatedProgress.value = (idx - 1) * (width / stories.length);
      animatedProgress.value = withTiming(width, {
        duration: stories.length * 3000,
      });
    } else {
      prevStoryHandler();
    }
  };

  useDerivedValue(() => {
    runOnJS(storyHandler)(animatedProgress.value);
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
                key={i}
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
        <Animated.View
          style={[
            { height: "100%", width, flexDirection: "row" },
            animatedStoryStyle,
          ]}
        >
          {stories.map((x, i) => {
            return (
              <View
                style={{
                  width,
                  height: "100%",
                  flexDirection: "row",
                  position: "relative",
                }}
                key={i}
              >
                <Animated.Image
                  key={`story-${i}`}
                  source={{ uri: x }}
                  style={{ height: "100%", width }}
                />
              </View>
            );
          })}
        </Animated.View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            width,
            height: "100%",
            zIndex: 100,
            top: 0,
            left: 0,
          }}
        >
          <Pressable
            onPress={() => switchPrevStoryOnPress()}
            style={{ width: "25%", height: "100%" }}
          >
            <View
              key={`press-left`}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></View>
          </Pressable>

          <Pressable
            onPress={() => switchNextStoryOnPress()}
            style={{ width: "25%", height: "100%" }}
          >
            <View
              key={`press-right`}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function InstaStories() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [storyOffset, setStoryOffset] = useState({ idx: -1 });

  function showModal() {
    if (isModalVisible) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (storyOffset.idx != -1) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [storyOffset]);

  return (
    <View
      style={{ backgroundColor: "#fff", flex: 1, justifyContent: "center" }}
    >
      <StatusBar hidden />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          borderColor: "#000",
          borderWidth: 2,
          justifyContent: "center",
          backgroundColor: "#233142",
        }}
      >
        {demoData.map((x, i) => {
          return (
            <StoryButton
              profile={x.profile}
              key={i}
              handlePress={() => {
                setStoryOffset({ idx: i });
              }}
            />
          );
        })}
      </View>
      {storyOffset.idx != -1 ? (
        <StoryModal
          data={demoData}
          offset={storyOffset.idx}
          showModal={() => showModal()}
          handleClose={() => setStoryOffset({ idx: -1 })}
        />
      ) : null}
    </View>
  );
}
