import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WebView from "react-native-webview";
import { FlatItem, Header, Loader } from "../../common";
import { color, responsiveWidth } from "../../constant/theme";

import globleString from "../../language/localized";
const strings = globleString.strings;

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.Help}
          //showRightIcon
          showBack={true}
        />
        <WebView
          source={{ uri: this.props.route?.params?.url || "" }}
          style={{ flex: 1 }}
          onLoadStart={() => this.setState({ isVisible: true })}
          onLoadEnd={() => this.setState({ isVisible: false })}
        />
        <Loader isVisible={isVisible} />
      </View>
    );
  }
}

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
