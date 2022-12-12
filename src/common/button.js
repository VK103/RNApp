import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { color, fontSize, responsiveWidth } from "../constant/theme";

const Button = ({ container, onPress, disabled, title, titleStyle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: disabled ? color.lightgray : color.green,
          backgroundColor: disabled ? color.white : color.green,
        },
        container,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.titleStyle,
          {
            color: disabled ? color.black : color.white,
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.green,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    borderWidth: 0.5,
    borderRadius: responsiveWidth("1"),
  },
  titleStyle: {
    fontSize: fontSize.regular,
    color: color.white,
    fontWeight: "bold",
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("2"),
  },
});
