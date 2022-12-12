import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Header, TextBox } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import messaging from "@react-native-firebase/messaging";
import { connect } from "react-redux";
import { StackActions } from "@react-navigation/native";

import { verifyPhoneNumber } from "../../redux/actions/authActions";

import globleString from "../../language/localized";
import asyncHelper from "../../helper/async";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

class ConfirmLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtCode: "",
    };
  }

  //Life cycle methods
  componentDidMount() {}

  //Navigation Methods
  goToNextView = (nextView) => {
    this.props.navigation.dispatch(StackActions.replace(nextView));
  };

  //API call methods
  onPressVerifyPhoneNumber = async () => {
    const { txtCode } = this.state;
    let token = await messaging().getToken();
    console.log("token: ", token);
    const data = {
      otpCode: txtCode,
      phoneNumber: `${this.props.route.params?.data?.countryCode}${this.props.route.params?.data?.mobileNumber}`,
      mobileCountryCode: this.props.route.params?.data?.countryCode,
      mobileNumber: this.props.route.params?.data?.mobileNumber,
      firstName: this.props.route.params?.data?.fullName,
      fcmToken: token,
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .verifyPhoneNumber(data)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false });
          if (res?.data[0]?.Success == true) {
            Alert.alert(strings.AppName, res?.data[0]?.Message);
            let phoneData = data;
            phoneData.peopleSubscriberId = res?.data[0]?.PeopleSubscriberId;
            asyncHelper.setAsyncValues(
              asyncKey.USER_PHONE,
              JSON.stringify(phoneData)
            );
            this.goToNextView("HomeTab");
          } else {
            Alert.alert(strings.AppName, res?.data[0]?.Message);
          }
        })
        .catch((e) => {
          this.setState({ isVisible: false });
          Alert.alert(strings.AppName, strings.SomethingWentWrong);
          console.log("Error :: ", e);
        });
    } catch (error) {
      console.log("Catch Error :: ", error);
    }
  };

  render() {
    const { txtCode } = this.state;
    let isDisabled = txtCode.length > 0 ? false : true;

    return (
      <View style={styles.container}>
        <Header title={strings.AppName} />
        <View style={{ padding: responsiveWidth("4") }}>
          <Text style={styles.titleText}>{strings.BMLYsFriends}</Text>
          <Text
            style={[styles.descText, { paddingBottom: responsiveWidth("4") }]}
          >
            {strings.LoginDesc}
          </Text>
          <TextBox
            maxLength={4}
            title={strings.SMSCode}
            value={txtCode}
            onChangeText={(txt) => {
              this.setState({ txtCode: txt });
            }}
            container={{ marginBottom: responsiveWidth("6") }}
            keyboardType="number-pad"
          />

          <Button
            title={strings.ConfirmSignUp}
            container={{ alignSelf: "flex-end" }}
            titleStyle={{ paddingHorizontal: responsiveWidth("6") }}
            disabled={isDisabled}
            onPress={() => {
              txtCode?.length == 4
                ? this.onPressVerifyPhoneNumber()
                : Alert.alert(
                    strings.AppName,
                    "Please enter valid verification code"
                  );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { allCountriesList } = state.auth;
  return {
    allCountriesList,
  };
};

export default connect(mapStateToProps, {
  verifyPhoneNumber,
})(ConfirmLogin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  titleText: {
    fontSize: fontSize.mediumx,
    color: color.black,
    fontWeight: "bold",
    paddingVertical: responsiveWidth("4"),
  },
  descText: {
    fontSize: fontSize.mini,
    color: color.black,
  },
});
