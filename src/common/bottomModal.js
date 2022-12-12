import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AppIcon } from "./";
import { color, fontSize, responsiveWidth } from "../constant/theme";
import globleString from "../language/localized";

const strings = globleString.strings;

const PickerModal = ({
  modalContainer,
  onRequestClose,
  onPressClose,
  onPressDone,
  onPressOutside,
  isVisible,
  value,
  onChangeText,
  showSearchBox,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPressOutside} />
        <SafeAreaView style={{ backgroundColor: color.darkBlue }}>
          <KeyboardAvoidingView>
            <View style={styles.topContainer}>
              <AppIcon
                name="times"
                size={responsiveWidth("5%")}
                color={color.white}
                onPress={onPressClose}
              />
              {showSearchBox === true ? (
                <TextInput
                  style={{
                    flex: 1,
                    color: color.white,
                    fontSize: fontSize.regular,
                    paddingHorizontal: responsiveWidth("5%"),
                  }}
                  placeholderTextColor={color.gray}
                  placeholder="Search"
                  value={value}
                  onChangeText={onChangeText}
                />
              ) : null}
              <TouchableOpacity onPress={onPressDone}>
                <Text
                  style={[
                    styles.basicStyle,
                    {
                      color: color.white,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {strings.Done}
                </Text>
              </TouchableOpacity>
            </View>
            {modalContainer}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export { PickerModal };

const styles = StyleSheet.create({
  basicStyle: {
    fontSize: fontSize.regularx,
    color: color.green,
    alignSelf: "flex-end",
    textAlign: "right",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsiveWidth("4%"),
  },
});
