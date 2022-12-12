import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { icons } from "../../assets";
import { AppIcon, Header } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import { connect } from "react-redux";

import { getMyAccount } from "../../redux/actions/authActions";

import globleString from "../../language/localized";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

const AccountSection = ({ value, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.sectionContainer}
    >
      <Text style={styles.sectionTitleStyle}>{title}</Text>
      <Text style={[styles.sectionTextStyle, { color: color.defaultGray }]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "Malin Syvertson",
      txtMobile: "",
      txtEmail: "",
      txtGender: "",
      txtZip: "",
      txtCountry: "",
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    this.onCallGetMyAccount();
  }

  //API call methods
  onCallGetMyAccount = async () => {
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    let params = {
      peopleSubscriberId: phoneData?.peopleSubscriberId || "",
    };
    this.setState({ isVisible: true });
    this.props
      .getMyAccount(params)
      .then((res) => {
        console.log("res: ", res?.data);
        let accountData = res?.data;
        this.setState({
          isVisible: false,
          txtName: accountData?.firstName || "",
          txtMobile: accountData?.mobileNumber || "",
          txtEmail: accountData?.email || "",
          txtGender: accountData?.gender || "",
          txtZip: accountData?.zip || "",
          txtCountry: accountData?.mobileNumber || "",
        });
      })
      .catch(() => this.setState({ isVisible: false }));
  };

  render() {
    const { txtName, txtMobile, txtEmail, txtGender, txtZip, txtCountry } =
      this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.YourAccount}
          //showRightIcon
          showBack={true}
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.sectionContainer,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: responsiveWidth("3"),
                marginTop: responsiveWidth("5"),
              },
            ]}
          >
            <TextInput
              style={[
                styles.sectionTitleStyle,
                { flex: 1, fontSize: fontSize.medium, textAlign: "center" },
              ]}
              value={txtName}
              onChangeText={(text) => this.setState({ txtName: text })}
            />
            <AppIcon name={"pen"} color={color.blue} size={18} />
          </View>
          <AccountSection
            value={txtMobile}
            title={strings.MobileNumber}
            // onPress={() => {}}
          />
          <AccountSection
            value={txtEmail}
            title={strings.AccountEmail}
            // onPress={() => {}}
          />
          <AccountSection
            value={txtGender}
            title={strings.Gender}
            // onPress={() => {}}
          />
          <AccountSection
            value={txtZip}
            title={strings.Zip}
            // onPress={() => {}}
          />
          <AccountSection
            value={txtCountry}
            title={strings.Country}
            // onPress={() => {}}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getMyAccount,
})(MyAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    color: color.black,
    fontWeight: "bold",
    fontSize: fontSize.regular,
  },
  sectionTitleStyle: {
    color: color.black,
    fontSize: fontSize.mini,
    marginBottom: 4,
    fontWeight: "500",
  },
  sectionTextStyle: {
    color: color.black,
    fontSize: fontSize.regular,
    flex: 1,
    fontWeight: "500",
  },
  titleContainer: {
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("2.5"),
    backgroundColor: color.backGroundGray,
  },
  sectionContainer: {
    marginTop: responsiveWidth("2.5"),
    width: responsiveWidth("94"),
    borderRadius: responsiveWidth("2"),
    borderWidth: 1,
    borderColor: color.lightgray,
    backgroundColor: color.white,
    paddingHorizontal: responsiveWidth("4"),
    alignSelf: "center",
    paddingVertical: responsiveWidth("3"),
  },
  iconStyle: {
    height: responsiveWidth("7"),
    width: responsiveWidth("7"),
    resizeMode: "cover",
    marginRight: responsiveWidth("2.5"),
  },
});
