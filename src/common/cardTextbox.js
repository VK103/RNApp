import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { color, fontSize, responsiveWidth } from "../constant/theme";

const CardTextbox = ({
  value,
  onChangeText,
  container,
  title,
  editable,
  maxLength,
}) => {
  const textboxRef = useRef(null);
  return (
    <View style={[styles.container, container]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          textboxRef?.current?.focus();
        }}
      >
        <Text style={styles.titleStyle}>{title}</Text>
      </TouchableOpacity>
      <TextInput
        ref={textboxRef}
        value={value}
        onChangeText={onChangeText}
        style={styles.textboxStyle}
        editable={editable}
        maxLength={maxLength}
      />
    </View>
  );
};

export { CardTextbox };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: responsiveWidth("4"),
    borderBottomWidth: 2,
    borderBottomColor: color.backGroundGray,
    paddingVertical: responsiveWidth("3"),
  },
  textboxStyle: {
    flex: 1,
    fontSize: fontSize.regular,
    color: color.gray,
    paddingLeft: responsiveWidth("6"),
    textAlign: "right",
  },
  titleStyle: {
    fontSize: fontSize.regular,
    color: color.black,
  },
});
