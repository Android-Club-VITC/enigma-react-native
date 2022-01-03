import React from "react";
import { View, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import InstaStoriesComponent from "../components/InstaStories";

const InstaStories = storiesOf("Insta Stories", module);

InstaStories.add("default view", () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <InstaStoriesComponent />
  </View>
));
