import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button, Header } from "../../../common";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../../constant/theme";
import {
  CardIOView,
  CardIOUtilities,
  CardIOModule,
} from "react-native-awesome-card-io";
import globleString from "../../../language/localized";
const strings = globleString.strings;

class ScanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCaptured: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      CardIOUtilities.preload();
    }
  }

  scanCard = () => {
    CardIOModule.scanCard({
      suppressManualEntry: true,
      hideCardIOLogo: true,
      usePaypalActionbarIcon: true,
      suppressConfirmation: true,
      scanInstructions: strings.CardDesc,
    })
      .then((card) => {
        this.props.navigation.navigate("AddCardManually", {
          details: this.props.route.params?.details,
          cardDetails: card,
        });
        console.log("card data :: ", card);
      })
      .catch((e) => {
        console.log("card data error :: ", e);
      });
  };
  render() {
    const { isCaptured } = this.state;

    return (
      <View style={styles.container}>
        <Header title={strings.AddCard} showBack showRightIcon={true} />
        {/* <View style={styles.cameraContainer}>
          <View style={styles.subCameraContainer}>
            <CardIOView
              style={{
                // flex: 1,
                borderRadius: 10,
                backgroundColor: "red",
                height: 100,
                width: 100,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.7}
            onPress={() => {
              // this.setState({ isCaptured: true })
              this.scanCard();
            }}
          >
            <View style={styles.captureButton} />
          </TouchableOpacity>
        </View> */}
        <View style={{ flex: 0, padding: responsiveWidth("4") }}>
          {isCaptured ? (
            <View style={styles.optionButtonCOntainer}>
              <Button
                title={strings.Retake}
                container={[styles.flatButtonContainer, { marginVertical: 0 }]}
                titleStyle={{
                  color: color.black,
                  paddingHorizontal: responsiveWidth("6"),
                }}
                onPress={() => this.setState({ isCaptured: false })}
              />
              <Button
                title={strings.Save}
                titleStyle={{ paddingHorizontal: responsiveWidth("6") }}
                onPress={() => {
                  this.props.navigation.navigate("AddCardManually", {
                    details: this.props.route.params?.details,
                  });
                }}
              />
            </View>
          ) : (
            <>
              <Text style={styles.titleText}>{strings.AddYourCard}</Text>
              {/* <Text style={styles.basicTextStyle}>{strings.CardDesc}</Text> */}
            </>
          )}
        </View>
        <Button
          title={"Scan card"}
          container={styles.flatButtonContainer}
          titleStyle={{ color: color.black }}
          onPress={() => {
            this.scanCard();
          }}
        />
        <Button
          title={strings.ManuallyCard}
          container={styles.flatButtonContainer}
          titleStyle={{ color: color.black }}
          onPress={() =>
            this.props.navigation.navigate("AddCardManually", {
              details: this.props.route.params?.details,
              cardDetails: {},
            })
          }
        />
      </View>
    );
  }
}

export default ScanCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  cameraContainer: {
    backgroundColor: color.lightgray,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveWidth("8"),
    paddingTop: responsiveWidth("8"),
  },
  subCameraContainer: {
    height: responsiveHeight("20"),
    backgroundColor: color.white,
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    height: responsiveWidth("13"),
    width: responsiveWidth("13"),
    borderRadius: responsiveWidth("13"),
    backgroundColor: color.white,
    marginVertical: responsiveWidth("3"),
    borderWidth: 1,
    borderColor: color.defaultGray,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    height: responsiveWidth("11.5"),
    width: responsiveWidth("11.5"),
    borderRadius: responsiveWidth("11.5"),
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.defaultGray,
  },
  titleText: {
    fontSize: fontSize.smallx,
    fontWeight: "bold",
    color: color.black,
  },
  basicTextStyle: {
    fontSize: fontSize.regular,
    color: color.black,
  },
  flatButtonContainer: {
    backgroundColor: color.white,
    borderColor: color.lightgray,
    alignSelf: "center",
    marginTop: responsiveWidth("4"),
    width: responsiveWidth("80"),
    alignItems: "center",
    paddingVertical: 10,
  },
  optionButtonCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth("8"),
  },
});
