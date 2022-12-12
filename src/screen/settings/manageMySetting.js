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
import { AppIcon, Header, Loader } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import { connect } from "react-redux";

import {
  getOptInOutStatus,
  setOptInOutStatus,
} from "../../redux/actions/settingAction";

import globleString from "../../language/localized";
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

class ManageMySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabledSMS: true,
      isEnabledEmail: true,
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    this.onCallGetOptInOutStatus();
  }

  //API call methods
  onCallGetOptInOutStatus = async () => {
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    let params = {
      peopleSubscriberId: phoneData?.peopleSubscriberId || "",
    };
    this.setState({ isVisible: true });
    this.props
      .getOptInOutStatus(params)
      .then((res) => {
        this.setState({ isVisible: false });
        console.log("res: ", res?.data);
        let isEnabledSMS = res?.data[0]?.optInOutType === 1 ? true : false;
        let isEnabledEmail = res?.data[1]?.optInOutType === 1 ? true : false;
        this.setState({ isEnabledSMS, isEnabledEmail });
      })
      .catch(() => this.setState({ isVisible: false }));
  };
  onCallSetOptInOutStatus = async (isOptIn, dType) => {
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    let params = {
      optInOptOut: isOptIn,
      dtype: dType,
      peopleSubscriberId: phoneData?.peopleSubscriberId || "",
    };
    this.setState({ isVisible: true });
    this.props
      .setOptInOutStatus(params)
      .then((res) => {
        this.setState({ isVisible: false });
        console.log("res: ", res?.data);
        // let isEnabledSMS = res?.data[0]?.optInOutType === 1 ? true : false;
        // let isEnabledEmail = res?.data[1]?.optInOutType === 1 ? true : false;
        // this.setState({ isEnabledSMS, isEnabledEmail });
      })
      .catch(() => this.setState({ isVisible: false }));
  };

  //Render Methods
  render() {
    const { isEnabledSMS, isEnabledEmail, isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.ManageData}
          //showRightIcon
          showBack={true}
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <AccountSection
            value={isEnabledSMS}
            title={"SMS Opt-In"}
            onChnage={(val) => {
              this.setState({ isEnabledSMS: val }, () => {
                this.onCallSetOptInOutStatus(val ? "OptIn" : "OptOut", "SMS");
              });
            }}
          />
          <AccountSection
            value={isEnabledEmail}
            title={"Email Opt-In"}
            onChnage={(val) => {
              this.setState({ isEnabledEmail: val }, () => {
                this.onCallSetOptInOutStatus(val ? "OptIn" : "OptOut", "Email");
              });
            }}
          />
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
  getOptInOutStatus,
  setOptInOutStatus,
})(ManageMySetting);

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
