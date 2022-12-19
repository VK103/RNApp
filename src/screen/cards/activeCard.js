import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppIcon, Header, SearchBox } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";

import { connect } from "react-redux";

import { getLoyaltyCard, getStampCard } from "../../redux/actions/cardAction";

import globleString from "../../language/localized";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

class ActiveCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      activeCardsList: [
        // { title: 'OBOS' },
        // { title: 'Cars' },
      ],
      activeStampList: [
        // { title: "Active sport" }, { title: "CoffeeLover" }
      ],
      searchedList: [],
    };
  }

  componentDidMount() {
    const { details } = this.props.route.params;
    details?.id === 1 ? this.onCallGetLoyaltyCard() : this.onCallGetStampCard();
  }

  //Button Click Events
  onPressCard = (item) => {
    const { details } = this.props.route.params;
    if (details?.id === 2)
      this.props.navigation.navigate("StampURL", { detail: item });
  };

  //API call methods
  onCallGetLoyaltyCard = async () => {
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    let params = {
      phoneNumber: phoneData?.phoneNumber || "",
      peopleSubscriberId: phoneData?.peopleSubscriberId || "",
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .getLoyaltyCard(params)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, activeCardsList: res?.data || [] });
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
  onCallGetStampCard = () => {
    try {
      this.setState({ isVisible: true });
      this.props
        .getStampCard()
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, activeStampList: res?.data || [] });
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

  onHandleSearch = (txt) => {
    const { details } = this.props.route.params;
    const { txtSearch, activeCardsList, activeStampList } = this.state;
    this.setState({ txtSearch: txt });

    const newData = (
      details.id === 1 ? activeCardsList : activeStampList
    ).filter((item) => {
      const itemData = item ? item?.cardName?.toUpperCase() : "".toUpperCase();
      const textData = txt.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ searchedList: newData });
  };

  //Render Methods
  render() {
    const { details } = this.props.route.params;
    const { txtSearch, activeCardsList, activeStampList, searchedList } =
      this.state;
    return (
      <View style={styles.container}>
        <Header title={details.title} showBack showRightIcon />
        <SearchBox
          value={txtSearch}
          onChangeText={(txt) => {
            this.onHandleSearch(txt);
          }}
        />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Text style={styles.titleTextStyle}>
            {details.id === 1
              ? strings.ActiveLoyaltyCard
              : strings.ActiveStampCard}
          </Text>
          {(txtSearch.length > 0
            ? searchedList
            : details.id === 1
            ? activeCardsList
            : activeStampList
          ).map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.subContainer}
                onPress={() => this.onPressCard(item)}
                disabled={details.id === 1}
              >
                <Text style={styles.titleStyle}>
                  {details.id === 1 ? item?.cardName : item.cardName || ""}
                </Text>
                <AppIcon
                  name={"chevron-right"}
                  size={responsiveWidth("6")}
                  type={"material-community"}
                  style={{
                    left: responsiveWidth("2"),
                  }}
                />
              </TouchableOpacity>
            );
          })}
          {details?.id === 1 ? (
            <View style={styles.BottomContainer}>
              <TouchableOpacity
                style={styles.subBottomContainer}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigation.navigate("ScanCard", {
                    details: this.props.route.params?.details,
                  });
                }}
              >
                <AppIcon
                  name={"plus"}
                  size={responsiveWidth("8")}
                  color={color.themeGray}
                />
                <Text style={styles.buttonTextStyle}>{strings.AddCard}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subBottomContainer}
                activeOpacity={0.5}
                onPress={() => {}}
              >
                <AppIcon
                  name={"search"}
                  size={responsiveWidth("8")}
                  color={color.themeGray}
                />
                <Text style={styles.buttonTextStyle}>{strings.SearchCard}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getLoyaltyCard,
  getStampCard,
})(ActiveCards);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backGroundGray,
  },
  titleTextStyle: {
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("3"),
    color: color.black,
    fontWeight: "bold",
    fontSize: fontSize.regularx,
  },
  titleStyle: {
    flex: 1,
    paddingRight: responsiveWidth("4"),
    fontSize: fontSize.regular,
  },
  subContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: color.white,
    borderBottomWidth: 2,
    borderBottomColor: color.backGroundGray,
    paddingHorizontal: responsiveWidth("4"),
    paddingVertical: responsiveWidth("2"),
  },
  BottomContainer: {
    paddingVertical: responsiveWidth("8"),
    paddingHorizontal: responsiveWidth("4"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subBottomContainer: {
    width: "47.5%",
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveWidth("4"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.defaultGray,
  },
  buttonTextStyle: {
    color: color.black,
    fontWeight: "bold",
    fontSize: fontSize.mini,
    paddingTop: responsiveWidth("2"),
  },
});
