import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../constant/theme";

const TextBox = ({
  title,
  value,
  onChangeText,
  placeholder,
  placeholderColor,
  secureTextEntry,
  multiline,
  textBoxStyle,
  btnText,
  onPress,
  titleStyle,
  editable,
  onSelectionChange,
  onPressMobile,
  onBlur,
  onFocus,
  disabled,
  container,
  mobileValue,
  onChangeMobileText,
  isMobile,
  keyboardType,
  selCountry,
  maxLength,
  onChangeCode,
}) => {
  return (
    <View style={[styles.container, container]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            style={[
              styles.titleStyle,
              {
                color: color.blue,
                marginRight: 0,
                flex: 0,
              },
            ]}
          >
            {btnText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        {isMobile ? (
          <>
            <TouchableOpacity
              style={[
                styles.mobiletextBoxStyle,
                { borderWidth: 0, paddingHorizontal: 0 },
              ]}
              onPress={onPressMobile}
            >
              {selCountry?.flagPath !== "" ? (
                <Image
                  source={{
                    uri: selCountry?.flagPath || "",
                  }}
                  resizeMode="cover"
                  style={[styles.flagStyle]}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mobiletextBoxStyle,
                {
                  flexDirection: "row",
                },
              ]}
              disabled={true}
            >
              <Text>{"+"}</Text>
              <TextInput
                value={mobileValue}
                onChangeText={onChangeCode}
                placeholderTextColor={placeholderColor || "lightgray"}
                style={[
                  styles.textBoxStyle,
                  { borderWidth: 0, paddingHorizontal: 0 },
                ]}
                keyboardType={"phone-pad"}
              />
            </TouchableOpacity>
          </>
        ) : null}
        <TextInput
          value={value}
          maxLength={maxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || "lightgray"}
          style={[styles.textBoxStyle, textBoxStyle]}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          editable={editable}
          onSelectionChange={onSelectionChange}
          textAlignVertical="top"
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export { TextBox };

const styles = StyleSheet.create({
  container: {
    paddingVertical: responsiveWidth("2.5%"),
  },
  titleStyle: {
    fontSize: fontSize.regular,
    color: color.black,
    marginBottom: responsiveWidth("2%"),
    marginRight: responsiveHeight("10%"),
    flex: 1,
  },
  textBoxStyle: {
    color: color.black,
    fontSize: fontSize.regular,
    borderWidth: 1,
    borderColor: color.lightgray,
    borderRadius: 5,
    paddingVertical: responsiveWidth("1.9%"),
    paddingHorizontal: responsiveWidth("3%"),
    flex: 1,
  },
  mobiletextBoxStyle: {
    color: color.black,
    fontSize: fontSize.regular,
    borderWidth: 1,
    borderColor: color.lightgray,
    borderRadius: 5,
    // paddingVertical: responsiveWidth("1.9%"),
    paddingHorizontal: responsiveWidth("2%"),
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    marginRight: responsiveWidth("2"),
  },
  txtMobile: {
    color: color.black,
    fontSize: fontSize.regular,
    borderWidth: 1,
    borderColor: color.lightgray,
    borderRadius: 5,
    paddingVertical: responsiveWidth("1.9%"),
    paddingHorizontal: responsiveWidth("3%"),
    flex: 0.2,
    marginRight: responsiveWidth("1"),
    color: color.black,
    fontSize: fontSize.regular,
  },
  flagStyle: {
    height: responsiveWidth("8"),
    width: responsiveWidth("10"),
  },
});
