import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { icons } from "../assets";
import { color, responsiveHeight, responsiveWidth } from "../constant/theme";
import * as Progress from "react-native-progress";
import messaging from "@react-native-firebase/messaging";
import { getUserToken } from "../helper/globle";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../constant/keys";

class Splash extends Component {
  async componentDidMount() {
    const authorizationStatus = await messaging().requestPermission();
    const token = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    console.log("token: ", token);
    setTimeout(() => {
      token && token?.length > 0
        ? this.props.navigation.replace("HomeTab")
        : this.props.navigation.replace("Register");
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={icons.icLogo} style={styles.logoStyle} />
        <Progress.CircleSnail
          color={[color.black]}
          size={responsiveWidth("15")}
        />
        <View style={{ height: responsiveHeight("20") }} />
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    resizeMode: "contain",
    width: responsiveWidth("60"),
  },
});
