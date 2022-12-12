import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { color } from "../constant/theme";

const Loader = (props) => {
  if (props.isVisible) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={props.loaderColor || color.blue}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    backgroundColor: color.transparentGray,
  },
});

export { Loader };
