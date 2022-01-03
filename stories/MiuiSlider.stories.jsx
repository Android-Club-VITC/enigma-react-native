import React from "react";
import { View, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import MiuiSlider from "../components/MiuiSlider";

const MiuiSliderStories = storiesOf("Miui Slider", module);

MiuiSliderStories.add("default view", () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <Text>Miui Slider</Text>
    <MiuiSlider />
  </View>
));
