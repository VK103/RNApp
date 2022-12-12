import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Button, CardTextbox, Header, Loader } from "../../../common";
import { color, fontSize, responsiveWidth } from "../../../constant/theme";

import { connect } from "react-redux";
import { WebView } from "react-native-webview";

import globleString from "../../../language/localized";
const strings = globleString.strings;

class StampURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webURL: "",
      title: "",
      isVisible: false,
    };
  }

  componentDidMount() {
    console.log("detail: ", this.props?.route?.params?.detail);
    let data = this.props?.route?.params?.detail;
    this.setState({ webURL: data?.campaignUrl, title: data?.cardName });
  }

  render() {
    const { webURL, isVisible, title } = this.state;
    return (
      <View style={styles.container}>
        <Header title={title} showBack />
        {webURL ? (
          <WebView
            source={{ uri: webURL }}
            style={{ flex: 1 }}
            onLoadStart={() => this.setState({ isVisible: true })}
            onLoadEnd={() => this.setState({ isVisible: false })}
          />
        ) : null}
        <Loader isVisible={isVisible} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(StampURL);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
