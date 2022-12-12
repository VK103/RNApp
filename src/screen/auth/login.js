import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  Button,
  CheckBox,
  Header,
  Loader,
  PickerModal,
  TextBox,
} from "../../common";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../constant/theme";

import { connect } from "react-redux";

import {
  getAllCountriesList,
  loginUser,
} from "../../redux/actions/authActions";
import { getUserDetails } from "../../redux/actions/userAction";

import themeHelper from "../../helper/theme";
import globleString from "../../language/localized";
import asyncHelper from "../../helper/async";
import { asyncKey } from "../../constant/keys";
import messaging from "@react-native-firebase/messaging";
const strings = globleString.strings;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
      txtEmail: "",
      txtPassword: "",
      isAgree: false,
      showModal: false,
    };
  }

  //Life Cycle Methods
  async componentDidMount() {
    let safearea = await themeHelper.getScreenSafeArea();
    this.setState({ safeAreaInsets: safearea });
    this.onCallGetAllCountry();
  }

  //API call methods
  onCallGetAllCountry = () => {
    this.props
      .getAllCountriesList()
      .then(() => this.setState({ isVisible: false }))
      .catch(() => this.setState({ isVisible: false }));
  };
  onPressLogin = () => {
    const { txtEmail, txtPassword } = this.state;
    const data = {
      email: txtEmail,
      password: txtPassword,
    };

    if (txtEmail.length === 0) {
      Alert.alert(strings.AppName, "Please enter your email");
    } else if (txtPassword.length === 0) {
      Alert.alert(strings.AppName, "Please enter your password");
    } else {
      try {
        this.setState({ isVisible: true });

        this.props
          .loginUser(data)
          .then((res) => {
            this.props.navigation.replace("HomeTab");
            this.props
              .getUserDetails()
              .then(() => {
                this.setState({ isVisible: false });
                Alert.alert(strings.AppName, "Login successfully");
                asyncHelper.setAsyncValues(asyncKey.KEEP_ME_LOGGED_IN, "true");
                // this.props.navigation.replace('HomeTab')
              })
              .catch(() => {
                this.setState({ isVisible: false });
              });
          })
          .catch((e) => {
            this.setState({ isVisible: false });
            Alert.alert(strings.AppName, "Email and Password does not match.");
            console.log("Error :: ", e);
          });
      } catch (error) {
        console.log("Catch Error :: ", error);
      }
    }
  };

  //Render Methods
  render() {
    let isDisabled = true;
    const { txtEmail, txtPassword, isAgree, safeAreaInsets, isVisible } =
      this.state;
    if (txtEmail?.length > 0 && txtPassword?.length > 0) {
      isDisabled = false;
    }

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
            keyboardType={"email-address"}
            title={strings.Email}
            value={txtEmail}
            onChangeText={(txt) => {
              this.setState({ txtEmail: txt });
            }}
          />
          <TextBox
            secureTextEntry={true}
            title={strings.Password}
            value={txtPassword}
            onChangeText={(txt) => {
              this.setState({ txtPassword: txt });
            }}
          />

          <Button
            title={strings.SignIn}
            container={{
              alignSelf: "flex-end",
              marginTop: responsiveHeight("1"),
            }}
            titleStyle={{
              paddingHorizontal: responsiveWidth("6"),
            }}
            disabled={isDisabled}
            onPress={() => this.onPressLogin()}
          />
        </View>
        {/* Bottom View */}
        <View style={styles.bottomView}>
          <Text
            style={[
              styles.txtSignup,
              { marginBottom: safeAreaInsets.bottom + responsiveWidth("3") },
            ]}
          >
            {`Don't have an account? `}
            <Text
              style={{ fontWeight: "700", textDecorationLine: "underline" }}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              {strings.SignUp}
            </Text>
          </Text>
        </View>
        <Loader isVisible={isVisible} />
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
  getAllCountriesList,
  loginUser,
  getUserDetails,
})(Register);

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
  txtSignup: {
    fontSize: fontSize.regular - 1,
    color: color.black,
    alignSelf: "center",
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
