import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { FlatItem, Header, Loader } from "../../common";
import { color, responsiveWidth } from "../../constant/theme";
import asyncHelper from "../../helper/async";

import { connect } from "react-redux";

import { deleteAccount } from "../../redux/actions/authActions";

import globleString from "../../language/localized";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../constant/keys";
import { StackActions } from "@react-navigation/native";
const strings = globleString.strings;

class DataSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
    };
  }

  //Life Cycle Methods
  componentDidMount() {}

  //Navigation Methods
  goToNextView = (nextView) => {
    this.props.navigation.dispatch(StackActions.replace(nextView));
  };

  //API call methods
  onCallDeleteAccount = async () => {
    this.setState({ isVisible: true });
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    this.props
      .deleteAccount({
        peopleSubscriberId: phoneData?.peopleSubscriberId || "",
      })
      .then(async (res) => {
        console.log("res: ", res?.data);
        if (res?.data?.Success) {
          await asyncHelper.removeAllValues();
          Alert.alert(strings.AppName, "Delete account successfully.");
          this.goToNextView("Register");
        } else {
          Alert.alert(strings.AppName, res?.data?.Message);
        }
      })
      .catch(() => this.setState({ isVisible: false }));
  };

  //Click Events
  onPressDelete = () => {
    Alert.alert(
      strings.AppName,
      "Are you sure you want to delete account? This action can not be undone.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: strings.DeleteAccount,
          style: "destructive",
          onPress: () => this.onCallDeleteAccount(),
        },
      ]
    );
  };
  onPressExport = () => {
    Alert.alert(
      strings.AppName,
      "The data we have stored on you will be sent to your registered email address.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: strings.ExportData,
          onPress: () => {},
        },
      ]
    );
  };

  //Render Methods
  render() {
    const { isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.DataSettings}
          //showRightIcon
          showBack={true}
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <FlatItem
            title={strings.ManageData}
            containerStyle={{ paddingVertical: responsiveWidth("3") }}
            onPress={() => this.props.navigation.navigate("ManageMySetting")}
          />
          <FlatItem
            title={strings.ExportData}
            containerStyle={{ paddingVertical: responsiveWidth("3") }}
            onPress={() => this.onPressExport()}
          />
          <FlatItem
            title={strings.DeleteAccount}
            containerStyle={{ paddingVertical: responsiveWidth("3") }}
            onPress={() => this.onPressDelete()}
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
  deleteAccount,
})(DataSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
