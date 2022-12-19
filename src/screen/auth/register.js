import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  AppIcon,
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
import { Picker } from "@react-native-picker/picker";

import {
  getAllCountriesList,
  loginUser,
  sendVerificationCode,
} from "../../redux/actions/authActions";

import themeHelper from "../../helper/theme";
import globleString from "../../language/localized";
import asyncHelper from "../../helper/async";
import { asyncKey } from "../../constant/keys";
import messaging from "@react-native-firebase/messaging";
const strings = globleString.strings;
var PickerItem = Picker.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
      txtFirstName: "",
      txtMobile: "",
      txtCountryCode: "",
      isAgree: false,
      showModal: false,
      selCountry: {},
    };
  }

  //Life Cycle Methods
  async componentDidMount() {
    let safearea = await themeHelper.getScreenSafeArea();
    this.setState({ safeAreaInsets: safearea });
    this.onCallGetAllCountry();
    this.onPressLogin();
  }

  //API call methods
  onCallGetAllCountry = () => {
    this.props
      .getAllCountriesList()
      .then((res) =>
        this.setState({
          isVisible: false,
          selCountry: res[0],
          txtCountryCode: res[0]?.countryCode,
          selCountryIndex: 0,
        })
      )
      .catch(() => this.setState({ isVisible: false }));
  };
  onPressLogin = () => {
    const data = {
      email: "anil+20dec@loyaltycommunication.com",
      password: "Make@101",
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .loginUser(data)
        .then((res) => {
          console.log("res: ", res?.data);
          asyncHelper.setAsyncValues(
            asyncKey.USER_TOKEN_DATA,
            JSON.stringify(res?.data)
          );
          asyncHelper.setAsyncValues(
            asyncKey.USER_TOKEN,
            JSON.stringify(res?.data?.access_token)
          );
          asyncHelper.setAsyncValues(
            asyncKey.CLIENT_SECRET,
            JSON.stringify(res?.data?.client_secret)
          );
        })
        .catch((e) => {
          this.setState({ isVisible: false });
          Alert.alert(strings.AppName, "Email and Password does not match.");
          console.log("Error :: ", e);
        });
    } catch (error) {
      console.log("Catch Error :: ", error);
    }
  };
  onPressSendVerificationCode = () => {
    const { txtFirstName, selCountryIndex, txtMobile } = this.state;
    const { allCountriesList } = this.props;
    const data = {
      fullName: txtFirstName?.trim(),
      countryCode: allCountriesList[selCountryIndex].countryCode,
      mobileNumber: txtMobile?.trim(),
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .sendVerificationCode(data)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false });
          if (res?.data?.success == true) {
            this.props.navigation.navigate("ConfirmLogin", { data: data });
          } else {
            Alert.alert(strings.AppName, res?.data?.message);
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

  //Render Methods
  render() {
    let isDisabled = true;
    const {
      txtMobile,
      txtFirstName,
      txtCountryCode,
      isAgree,
      showModal,
      selCountryIndex,
      isVisible,
      safeAreaInsets,
      selCountry,
    } = this.state;
    const { allCountriesList } = this.props;
    if (
      txtMobile.length > 0 &&
      txtFirstName.length > 0 &&
      selCountryIndex > -1 &&
      isAgree
    ) {
      isDisabled = false;
    }
    // console.log(
    //   "allCountriesList[selCountryIndex]: ",
    //   allCountriesList[selCountryIndex]
    // );
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
            title={strings.Firstname}
            value={txtFirstName}
            onChangeText={(txt) => {
              this.setState({ txtFirstName: txt });
            }}
          />
          <TextBox
            selCountry={selCountry}
            title={strings.Mobile}
            value={txtMobile}
            onChangeText={(txt) => {
              this.setState({ txtMobile: txt });
            }}
            onChangeCode={(txt) => {
              this.setState({ txtCountryCode: txt });
              const indexOfCountry = allCountriesList.findIndex(
                (i) => i?.countryCode === txt
              );
              this.setState({
                selCountryIndex: indexOfCountry > -1 ? indexOfCountry : -1,
                selCountry:
                  indexOfCountry > -1
                    ? allCountriesList[indexOfCountry]
                    : { flagPath: "" },
              });
            }}
            isMobile={true}
            mobileValue={txtCountryCode}
            onChangeMobileText={(txt) => {
              this.setState({ txtCountryCode: txt });
            }}
            onPressMobile={() => this.setState({ showModal: true })}
            keyboardType="number-pad"
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: responsiveWidth("6"),
            }}
          >
            <CheckBox
              isSelected={isAgree}
              onPress={() => this.setState({ isAgree: !isAgree })}
            />
            <Text
              style={[
                styles.descText,
                {
                  textDecorationLine: "underline",
                  marginLeft: responsiveWidth("2"),
                },
              ]}
            >
              {strings.TermsConditions}
            </Text>
          </View>

          <Button
            title={strings.SignUp}
            container={{ alignSelf: "flex-end" }}
            titleStyle={{ paddingHorizontal: responsiveWidth("6") }}
            disabled={isDisabled}
            onPress={() => this.onPressSendVerificationCode()}
          />
        </View>
        <PickerModal
          isVisible={showModal}
          modalContainer={
            allCountriesList?.length > 0 ? (
              <View
                style={{
                  width: responsiveWidth("100%"),
                  height: responsiveHeight("24%"),
                }}
              >
                <ScrollView style>
                  {allCountriesList?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            selCountryIndex: index,
                            showModal: false,
                            selCountry: allCountriesList[index],
                            txtCountryCode:
                              allCountriesList[index]?.countryCode,
                          })
                        }
                        style={{
                          marginHorizontal: responsiveWidth("5"),
                          paddingVertical: responsiveWidth("2"),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: fontSize.mini - 1,
                            color: color.white,
                          }}
                        >{`${
                          item?.countryCode ? `(+${item?.countryCode})` : ""
                        } ${item?.countryname}`}</Text>
                        <AppIcon
                          name={"check"}
                          size={20}
                          color={
                            selCountryIndex === index
                              ? color.white
                              : color.transparent
                          }
                          style={{ marginRight: 8 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <View style={{ height: responsiveHeight("3") }} />
                </ScrollView>
              </View>
            ) : null
          }
          onRequestClose={() => {
            this.setState({ showModal: false });
          }}
          onPressClose={() => {
            this.setState({ showModal: false });
          }}
          onPressDone={() => {
            this.setState({ showModal: false });
          }}
          onPressOutside={() => {
            this.setState({ showModal: false });
          }}
        />
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
  sendVerificationCode,
})(Login);

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
