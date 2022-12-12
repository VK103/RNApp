import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { icons } from "../../assets";
import { AppIcon, Header, Loader } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";
import Share from "react-native-share";

import { connect } from "react-redux";

import { getAboutUs } from "../../redux/actions/authActions";

import globleString from "../../language/localized";
import asyncHelper from "../../helper/async";
import { StackActions } from "@react-navigation/native";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

const SettingSection = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.sectionContainer}
    >
      <Image source={iconName} style={styles.iconStyle} />
      <Text style={styles.sectionTextStyle}>{title}</Text>
      <AppIcon
        name={"chevron-right"}
        size={responsiveWidth("6")}
        type={"material-community"}
        style={{
          left: responsiveWidth("2"),
        }}
      />
    </TouchableOpacity>
  );
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
      txtEmail: "",
      txtPassword: "",
      isAgree: false,
      showModal: false,
      aboutUsURL: "",
      privacyURL: "",
      helpURL: "",
      joinAppMail: "",
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    this.onCallGetAboutUs();
  }

  //API call methods
  onCallGetAboutUs = () => {
    this.setState({ isVisible: true });
    this.props
      .getAboutUs()
      .then((res) => {
        console.log("res: ", res?.data);
        let aboutUsData = res?.data;
        this.setState({
          isVisible: false,
          aboutUsURL: aboutUsData?.AboutUsUrl || "",
          privacyURL: aboutUsData?.PrivacyPolicyUrl || "",
          helpURL: aboutUsData?.HelpCenterUrl || "",
          joinAppMail: aboutUsData?.JoinAppEmail || "",
        });
      })
      .catch(() => this.setState({ isVisible: false }));
  };

  //Navigation Methods
  goToNextView = (nextView) => {
    this.props.navigation.dispatch(StackActions.replace(nextView));
  };

  render() {
    const { navigation } = this.props;
    const { isVisible, joinAppMail, privacyURL, helpURL, aboutUsURL } =
      this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.Settings}
          //showRightIcon
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.textStyle}>{strings.Account}</Text>
          </View>
          <SettingSection
            iconName={icons.icUser}
            title={strings.MyAccount}
            onPress={() => {
              navigation.navigate("MyAccount");
            }}
          />
          <SettingSection
            iconName={icons.icPreferences}
            title={strings.Preferences}
            onPress={() => {
              navigation.navigate("Preferences");
            }}
          />
          <SettingSection
            iconName={icons.icDataSetting}
            title={strings.DataSettings}
            onPress={() => {
              navigation.navigate("DataSettings");
            }}
          />
          <SettingSection
            iconName={icons.icStoreSetting}
            title={strings.StoreSettings}
            onPress={() => {
              navigation.navigate("StoreSettings", {
                title: strings.StoreSettings,
              });
            }}
          />
          <SettingSection
            iconName={icons.icCampignSetting}
            title={strings.CampaignSettings}
            onPress={() => {
              navigation.navigate("CampaignSetting");
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.textStyle}>{strings.About}</Text>
          </View>
          <SettingSection
            iconName={icons.icContact}
            title={strings.ContactBMLY}
            onPress={() => {
              navigation.navigate("Contact", { url: aboutUsURL });
            }}
          />
          <SettingSection
            iconName={icons.icShare}
            title={strings.ShareApp}
            onPress={() => {
              Share.open({ message: "BMLY" })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
            }}
          />
          <SettingSection
            iconName={icons.icJoinApp}
            title={strings.JoinAPp}
            onPress={() => {
              Linking.openURL(`mailto:${joinAppMail}?subject=Join the App`);
            }}
          />
          <SettingSection
            iconName={icons.icPrivacyPolicy}
            title={strings.PrivacyPolicy}
            onPress={() => {
              navigation.navigate("PrivacyPolicy", { url: privacyURL });
            }}
          />
          <SettingSection
            iconName={icons.icHelp}
            title={strings.Help}
            onPress={() => {
              navigation.navigate("Help", { url: helpURL });
            }}
          />
          {/* <SettingSection
            iconName={icons.icDataSetting}
            title={strings.Logout}
            onPress={() => {
              Alert.alert(
                strings.AppName,
                "Are you sure want to logout from app?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await asyncHelper.removeAllValues();
                      Alert.alert(strings.AppName, "Logout successfully.");
                      this.goToNextView("Register");
                    },
                  },
                  { text: "No", onPress: () => {}, style: "cancel" },
                ]
              );
            }}
          /> */}
        </ScrollView>
        <Loader isVisible={isVisible} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getAboutUs,
})(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  textStyle: {
    color: color.black,
    fontWeight: "bold",
    fontSize: fontSize.regular,
  },
  sectionTextStyle: {
    color: color.black,
    fontSize: fontSize.regular,
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("2.5"),
    backgroundColor: color.backGroundGray,
  },
  sectionContainer: {
    flexDirection: "row",
    backgroundColor: color.white,
    paddingHorizontal: responsiveWidth("4"),
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
    paddingVertical: responsiveWidth("2"),
  },
  iconStyle: {
    height: responsiveWidth("7"),
    width: responsiveWidth("7"),
    resizeMode: "cover",
    marginRight: responsiveWidth("2.5"),
  },
});
