import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  Image,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const IMAGE_HEIGHT = 300;
const IMAGE_WIDTH = 250;
const SIZE = IMAGE_WIDTH + 20 + 2 * 10;
const { width, height } = Dimensions.get("window");

const demoData = [...Array(30).keys()].map((_, i) => {
  return {
    key: i,
    image: `https://images.unsplash.com/photo-1579935110464-fcd041be62d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`,
    name: "Star Wars",
    desp: "A galaxy far, far away",
  };
});

function Backdrop() {
  return (
    <View
      style={{
        position: "absolute",
        width,
        height,
      }}
    >
      <LinearGradient
        colors={["#ff0000", "#bc2525"]}
        style={{
          width,
          height: "100%",
        }}
      />
    </View>
  );
}

export default function CarouselFL({ data = demoData }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Backdrop />
      <Animated.FlatList
        horizontal={true}
        keyExtractor={(item) => item.key}
        data={[{ key: "space-left" }, ...data, { key: "space-right" }]}
        snapToInterval={IMAGE_WIDTH + 20 + 20}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => (
          <ListItem animatedScrollXValue={scrollX} item={item} idx={index} />
        )}
        contentContainerStyle={{
          alignItems: "center",
        }}
      />
    </View>
  );
}

function ListItem({ item, idx, animatedScrollXValue }) {
  const inputRange = [(idx - 2) * SIZE, (idx - 1) * SIZE, idx * SIZE];
  const outputRange = [0, -50, 0];
  const translateY = animatedScrollXValue.interpolate({
    inputRange,
    outputRange,
  });

  if (item.key == "space-left") {
    const SPACER_SIZE = (width - SIZE - 20) / 2;
    return <View style={{ width: SPACER_SIZE, marginRight: 20 }}></View>;
  }

  if (item.key == "space-right") {
    const SPACER_SIZE = (width - SIZE - 20) / 2;
    return <View style={{ width: SPACER_SIZE }}></View>;
  }

  return (
    <Animated.View
      style={{
        backgroundColor: "#eaeaea",
        marginRight: 20,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 20,
        transform: [{ translateY }],
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Animated.Image
        source={{ uri: item.image }}
        style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
      />
      <Animated.Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {item.name}
      </Animated.Text>
      <Animated.Text style={{ fontSize: 10, color: "grey" }}>
        {item.desp}
      </Animated.Text>
    </Animated.View>
  );
}
