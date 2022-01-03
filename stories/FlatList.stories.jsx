import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";

import OpacityScaleFL from "../components/FlatList/OpacityScaleFL";
import CarouselFL from "../components/FlatList/CarouselFL";

const FlatListStories = storiesOf("FlatList", module);

FlatListStories.add("Carousel FL", () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <CarouselFL />
  </View>
));

FlatListStories.add("Opacity Scale FL", () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <OpacityScaleFL />
  </View>
));
