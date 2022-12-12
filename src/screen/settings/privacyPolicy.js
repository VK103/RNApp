import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import WebView from "react-native-webview";
import { FlatItem, Header, Loader } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import globleString from "../../language/localized";
const strings = globleString.strings;

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.PrivacyPolicy}
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
                        <Text style={styles.titleStyle}>{strings.PrivacyPolicyVersion}</Text>
                        <Text style={styles.basicTextStyle}>
                            Effective April 23, 2019 Loyalty Communication AS takes data privacy seriously. This privacy policy explains who we are, how we collect, share and use Personal Information, and how you can exercise your privacy rights. We recommend that you read this privacy policy in full to ensure that you are fully informed. If you have any questions or concerns about our use of your Personal Information, then please contact us using the contact details provided at the end of Section 16.
                            {'\n\n'}SUBSCRIBER PROVISIONS{'\n'}
                            This Privacy Policy applies to processing of your personal data where Loyalty Communication AS (“We”, “Us” or “Our”) is the data controller or where We refer to the applicability of this Privacy Policy. When our services are provided indirectly by a third-party we act in the role of data processor and follow the instructions of the Data Processing Agreement. If You are the customer of such a third- party please refer to their Privacy Policy. It shall also be stated in the Data Processing Agreement with the controller that the processor undertakes to carry out such appropriate technical and organizational security measures as ensue from section 13 of the Norwegian Personal Data Act and the General Data Protection Regulation. This Privacy Policy is by reference to Appendix 1 incorporated in the Terms of Service (the “Agreement”) posted at</Text>
                    </View>
                </ScrollView> */}
      </View>
    );
  }
}

export default PrivacyPolicy;

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
