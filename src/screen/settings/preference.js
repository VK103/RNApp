import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { icons } from "../../assets";
import { AppIcon, Header } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";
import { setPushNotificationStatus } from "../../redux/actions/settingAction";

import globleString from "../../language/localized";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

const AccountSection = ({ value, title, onChnage }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTextStyle}>{title}</Text>
      <Switch
        trackColor={{ false: color.extraLightgray, true: color.green }}
        thumbColor={color.white}
        ios_backgroundColor={color.extraLightgray}
        onValueChange={onChnage}
        value={value}
        style={{
          borderWidth: 1,
          borderColor: value ? color.green : color.extraLightgray,
        }}
      />
    </View>
  );
};

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabledCamera: true,
      isEnabledLocation: true,
      isEnabledNotification: false,
      isEnabledInAppNotification: false,
    };
  }

  onSwitchNotificationStatus = async () => {
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    this.props.setPushNotificationStatus({
      peopleSubscriberId: phoneData?.peopleSubscriberId || "",
      isActive: true,
    });
  };

  async componentDidMount() {
    let inAppNotification = await AsyncStorage.getItem(
      asyncKey.IN_APP_NOTIFICATIONS
    );
    this.setState({
      isEnabledInAppNotification: JSON.parse(inAppNotification),
    });
  }

  render() {
    const {
      isEnabledCamera,
      isEnabledLocation,
      isEnabledNotification,
      isEnabledInAppNotification,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.Preferences}
          //showRightIcon
          showBack={true}
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <AccountSection
            value={isEnabledCamera}
            title={strings.Camera}
            onChnage={(val) => {
              this.setState({ isEnabledCamera: val });
            }}
          />
          <AccountSection
            value={isEnabledLocation}
            title={strings.Location}
            onChnage={(val) => {
              this.setState({ isEnabledLocation: val });
            }}
          />
          <AccountSection
            value={isEnabledNotification}
            title={strings.PushNotifications}
            onChnage={(val) => {
              this.setState({ isEnabledNotification: val });
              this.onSwitchNotificationStatus();
            }}
          />
          <AccountSection
            value={isEnabledInAppNotification}
            title={strings.InAppNotifications}
            onChnage={(val) => {
              this.setState({ isEnabledInAppNotification: val });
              AsyncStorage.setItem(
                asyncKey.IN_APP_NOTIFICATIONS,
                JSON.stringify(val)
              );
            }}
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
  setPushNotificationStatus,
})(Preferences);

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
    paddingVertical: responsiveWidth("4"),
  },
  iconStyle: {
    height: responsiveWidth("7"),
    width: responsiveWidth("7"),
    resizeMode: "cover",
    marginRight: responsiveWidth("2.5"),
  },
});
