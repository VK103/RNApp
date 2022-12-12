import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import WebView from "react-native-webview";
import { FlatItem, Header, Loader } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import globleString from "../../language/localized";
const strings = globleString.strings;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.ContactBMLY}
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
        {/* <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topContainer}>
                        <Text style={styles.titleStyle}>{strings.AboutUS}</Text>
                        <Text style={styles.basicTextStyle}>{strings.AboutDesc}</Text>
                    </View>
                    <FlatItem
                        title={strings.AccountEmail}
                        containerStyle={{
                            paddingVertical: responsiveWidth('3'),
                            borderTopWidth: 2,
                            borderTopColor: color.backGroundGray,
                        }}
                    />
                    <FlatItem
                        title={strings.Webpage}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                </ScrollView> */}
      </View>
    );
  }
}

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  topContainer: {
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("6"),
  },
  basicTextStyle: {
    color: color.black,
    fontSize: fontSize.mini,
  },
  titleStyle: {
    color: color.black,
    fontSize: fontSize.large,
    paddingBottom: responsiveWidth("4"),
  },
});
