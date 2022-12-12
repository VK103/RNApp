import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Button, CardTextbox, Header } from "../../common";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../constant/theme";

import { connect } from "react-redux";

import { addLoyaltyCard } from "../../redux/actions/cardAction";

import globleString from "../../language/localized";
const strings = globleString.strings;

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  //API call methods
  onCallAddLoyaltyCard = () => {
    let data = this?.props?.route?.params;
    try {
      this.setState({ isVisible: true });
      let params = {
        phoneNumber: "",
        peopleSubscriberId: 0,
        storeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        loyaltyCards: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            cardName: data?.cardName,
            cardHolder: data?.holderName,
            cardNumber: data?.cardNumber,
            expiryDate: data?.cardDate,
            cardImage: "",
          },
        ],
      };
      this.props
        .addLoyaltyCard(params)
        .then((res) => {
          console.log("res: ", res?.data);
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
    const { cardName, holderName, cardNumber, cardDate } =
      this.props.route.params;

    return (
      <View style={styles.container}>
        <Header title={cardName} showBack showRightIcon />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Text style={styles.textBoxStyle}>{cardName}</Text>
          <View style={styles.cardImageStyle}></View>
          <CardTextbox
            container={{
              borderTopWidth: 2,
              borderTopColor: color.backGroundGray,
            }}
            value={cardName}
            title={strings.CardName}
            editable={false}
          />
          <CardTextbox
            value={holderName}
            title={strings.CardHolder}
            editable={false}
          />
          <CardTextbox
            value={cardNumber}
            title={strings.CardNumber}
            editable={false}
          />
          <CardTextbox
            value={cardDate}
            title={strings.ExpiryDate}
            editable={false}
          />
          <Button
            title={strings.DeleteCard}
            container={styles.buttonContainer}
            titleStyle={{
              paddingHorizontal: responsiveWidth("6"),
              color: color.black,
            }}
            onPress={() => {}}
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
  addLoyaltyCard,
})(CardDetails);

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
    borderColor: color.lightgray,
    backgroundColor: color.white,
  },
  cardImageStyle: {
    height: responsiveHeight("20"),
    backgroundColor: color.lightgray,
    marginHorizontal: responsiveWidth("4"),
    borderRadius: responsiveWidth("4"),
    marginBottom: responsiveWidth("6"),
  },
});
