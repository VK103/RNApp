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

import { addLoyaltyCard } from "../../../redux/actions/cardAction";

import globleString from "../../../language/localized";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../../constant/keys";
const strings = globleString.strings;

class AddCardManually extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtCardName: "",
      txtCardHolderName: "",
      txtCardNumber: "",
      txtCardDate: "",
    };
  }

  componentDidMount() {
    console.log("props: ", this?.props);
    let details = this.props.route.params?.cardDetails;
    if (Object.keys(details)?.length > 0) {
      let exDate = "";
      if (details?.expiryMonth != null && details?.expiryYear != null) {
        const month =
          details?.expiryMonth?.length > 1
            ? details?.expiryMonth
            : `0${details?.expiryMonth}`;
        exDate = `${month}/${details?.expiryYear}`;
      }
      this.setState({
        txtCardName: details?.cardType || "",
        txtCardHolderName: details?.cardholderName || "",
        txtCardNumber: this.formatCardNumber(details?.cardNumber) || "",
        txtCardDate: exDate,
      });
    }
  }

  formatCardNumber = (value) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
    const onlyNumbers = value.replace(/[^\d]/g, "");

    const data = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
      [$1, $2, $3, $4].filter((group) => !!group).join(" ")
    );
    console.log(data);
    return data;
  };

  //Button Click Events
  onPressAdd = () => {
    let details = this.props.route.params?.details;
    if (this.validateCard(true)) {
      if (details?.id == 1) this.onCallAddLoyaltyCard();
    }
  };

  //validate methods
  validateCard = (isAlert) => {
    const { txtCardDate, txtCardHolderName, txtCardName, txtCardNumber } =
      this.state;
    if (!txtCardName || txtCardName?.length === 0) {
      if (isAlert) Alert.alert(strings.AppName, "Please enter card name.");
      return;
    }
    if (!txtCardHolderName || txtCardHolderName?.length === 0) {
      if (isAlert) Alert.alert(strings.AppName, "Please enter card holder.");
      return;
    }
    if (!txtCardNumber || txtCardNumber?.length < 19) {
      if (isAlert)
        Alert.alert(strings.AppName, "Please enter valid card number.");
      return;
    }
    if (!txtCardDate || txtCardDate?.length < 5) {
      if (isAlert)
        Alert.alert(strings.AppName, "Please enter valid card date.");
      return;
    }
    return true;
  };

  //API call methods
  onCallAddLoyaltyCard = async () => {
    const { txtCardDate, txtCardHolderName, txtCardName, txtCardNumber } =
      this.state;
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    try {
      this.setState({ isVisible: true });
      let params = {
        phoneNumber: phoneData?.phoneNumber || "",
        peopleSubscriberId: phoneData?.peopleSubscriberId || "",
        loyaltyCards: [
          {
            cardName: txtCardName,
            cardHolder: txtCardHolderName,
            cardNumber: txtCardNumber,
            expiryDate: txtCardDate,
            cardImage: "",
          },
        ],
      };
      this.props
        .addLoyaltyCard(params)
        .then((res) => {
          console.log("res: ", res?.data);
          Alert.alert(strings.AppName, res?.data.Message);
          if (res?.data.Success) this.props.navigation.popToTop();
          this.setState({ isVisible: false });
        })
        .catch((e) => {
          this.setState({ isVisible: false });
          Alert.alert(strings.AppName, strings.SomethingWentWrong);
          console.log("Error :: ", e);
        });
    } catch (error) {
      console.log("Catch Error :: ", error);
    }
  };

  render() {
    let isDisabled = true;
    const {
      txtCardName,
      txtCardHolderName,
      txtCardNumber,
      txtCardDate,
      isVisible,
    } = this.state;

    if (txtCardName && txtCardHolderName && txtCardNumber && txtCardDate) {
      isDisabled = false;
    }

    return (
      <View style={styles.container}>
        <Header title={strings.AddCard} showBack showRightIcon />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Text style={styles.textBoxStyle}>
            {txtCardName.length > 0 ? txtCardName : strings.CardName}
          </Text>

          <CardTextbox
            container={{
              borderTopWidth: 2,
              borderTopColor: color.backGroundGray,
            }}
            value={txtCardName}
            title={strings.CardName}
            onChangeText={(txt) => this.setState({ txtCardName: txt })}
          />
          <CardTextbox
            value={txtCardHolderName}
            title={strings.CardHolder}
            onChangeText={(txt) => this.setState({ txtCardHolderName: txt })}
          />
          <CardTextbox
            maxLength={19}
            value={txtCardNumber}
            title={strings.CardNumber}
            onChangeText={(txt) => {
              let cardNewNumber = txt
                .replace(/\s?/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim();
              this.setState({ txtCardNumber: cardNewNumber });
            }}
          />
          <CardTextbox
            maxLength={5}
            value={txtCardDate}
            title={strings.ExpiryDate}
            onChangeText={(text) => {
              if (text.indexOf(".") >= 0 || text.length > 5) {
                return;
              }
              if (text.length === 2 && this.state.txtCardDate.length === 1) {
                text += "/";
              }
              this.setState({ txtCardDate: text });
            }}
          />
          <Button
            title={strings.AddCard}
            container={styles.buttonContainer}
            titleStyle={{ paddingHorizontal: responsiveWidth("6") }}
            disabled={this.validateCard(false) ? false : true}
            onPress={() => this.onPressAdd()}
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
  addLoyaltyCard,
})(AddCardManually);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  textBoxStyle: {
    flex: 1,
    textAlign: "center",
    padding: responsiveWidth("4"),
    fontSize: fontSize.large,
    fontWeight: "bold",
    paddingVertical: responsiveWidth("5"),
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginRight: responsiveWidth("4"),
    marginVertical: responsiveWidth("6"),
  },
});
