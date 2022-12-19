import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { AppIcon, Button, Header, Loader } from "../../common";
import { color, fontSize, responsiveWidth } from "../../constant/theme";
import { AirbnbRating } from "react-native-ratings";

import {
  getStoreDetail,
  addStoreRate,
  getStoreCampaign,
  followStore,
  getStoresCardList,
} from "../../redux/actions/storeAction";

import globleString from "../../language/localized";
import { SwipeableItem } from "../home/inbox/component/swipeableItem";
import { icons } from "../../assets";
import { CardItem } from "../cards/component/cardItem";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { asyncKey } from "../../constant/keys";
const strings = globleString.strings;

const ActionButton = ({ onPress, source, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ alignItems: "center", marginHorizontal: responsiveWidth("4") }}
    >
      <View style={styles.iconContainer}>
        <Image source={source} style={styles.iconStyle} />
      </View>
      <Text style={styles.actionTitleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const SectionButton = ({ onPress, isActive, title }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: isActive ? color.black : color.white,
          marginRight: responsiveWidth("4"),
        }}
      >
        <Text
          style={[
            styles.sectionTitleStyle,
            {
              color: isActive ? color.black : color.blue,
              fontWeight: isActive ? "bold" : "normal",
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      activeindex: 0,
      activeSectionIndex: 0,
      rateCount: 1,
      itemList: [],
      timeList: [
        { day: "Monday", time: "08-16" },
        { day: "Tuesday", time: "08-16" },
        { day: "Wednesday", time: "08-16" },
        { day: "Thursday", time: "08-16" },
        { day: "Friday", time: "08-16" },
        { day: "Saturday", time: "08-16" },
        { day: "Sunday", time: "Closed" },
      ],
      cardsList: [
        { title: "Loyalty cards", iconName: icons.icLoyaltyCards },
        { title: "Stamp cards", iconName: icons.icStampCard },
      ],
      showTimeList: false,
      showRating: false,
      txtRatingMessage: "",
    };
  }

  //Life cycle methods
  componentDidMount() {
    this.onCallGetStoreDetail();
    this.onCallGetStoreCampaign();
    this.onCallGetCardList();
  }

  //Button Click Events
  onPressSubmit = () => {
    const { rateCount } = this.state;
    if (rateCount <= 0) {
      Alert.alert(strings.AppName, "Please select rate");
      return;
    }
    this.onCallAddRate();
  };
  onPressFollow = () => {
    this.onCallFollowStore();
  };

  //API call methods
  onCallGetStoreDetail = async () => {
    const { details } = this.props.route.params;
    const { timeList } = this.state;
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    try {
      this.setState({ isVisible: true });
      this.props
        .getStoreDetail({
          storeId: details?.storeId,
          peopleSubscriberId: phoneData?.peopleSubscriberId || "",
        })
        .then((res) => {
          console.log("res: ", res?.data);
          let storeData = res?.data;
          timeList[0].time =
            storeData?.storeOpeningHours?.mondayOpeningHours || "";
          timeList[1].time =
            storeData?.storeOpeningHours?.tuesdayOpeningHours || "";
          timeList[2].time =
            storeData?.storeOpeningHours?.wednesdayOpeningHours || "";
          timeList[3].time =
            storeData?.storeOpeningHours?.thursdayOpeningHours || "";
          timeList[4].time =
            storeData?.storeOpeningHours?.fridayOpeningHours || "";
          timeList[5].time =
            storeData?.storeOpeningHours?.saturdayOpeningHours || "";
          timeList[6].time =
            storeData?.storeOpeningHours?.sundayOpeningHours || "";
          this.setState({
            isVisible: false,
            imageList: res?.data?.image || [],
            storeData,
            timeList: timeList,
          });
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
  onCallGetStoreCampaign = () => {
    const { details } = this.props.route.params;
    try {
      this.setState({ isVisible: true });
      this.props
        .getStoreCampaign({
          storeId: details?.storeId,
        })
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ itemList: res?.data || [] });
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
  onCallAddRate = async () => {
    const { details } = this.props.route.params;
    const { rateCount } = this.state;
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    try {
      this.setState({ isVisible: true });
      this.props
        .addStoreRate({
          storeId: details?.storeId,
          rateCount: rateCount,
          phoneNumber: phoneData?.phoneNumber || "",
          peopleSubscriberId: phoneData?.peopleSubscriberId || "",
        })
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, showRating: false });
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
  onCallFollowStore = async () => {
    const { details } = this.props.route.params;
    const { storeData } = this.state;
    let phoneStr = await AsyncStorage.getItem(asyncKey.USER_PHONE);
    let phoneData = JSON.parse(phoneStr);
    try {
      this.setState({ isVisible: true });
      this.props
        .followStore({
          storeId: details?.storeId,
          isFollowed: storeData?.isFollowed ? false : true,
          phoneNumber: phoneData?.phoneNumber || "",
          peopleSubscriberId: phoneData?.peopleSubscriberId || "",
        })
        .then((res) => {
          console.log("res: ", res?.data);
          storeData.isFollowed = !storeData.isFollowed;
          this.setState({ isVisible: false, storeData: storeData });
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
  onCallGetCardList = async () => {
    const { details } = this.props.route.params;
    this.props
      .getStoresCardList({ storeId: details?.storeId })
      .then((list) => {
        console.log(("list :: ", list));
        this.setState({ cardsList: list });
      })
      .catch((e) => {
        console.log("Erroe :: ", e);
      });
  };

  //Render Methods
  render() {
    const { details } = this.props.route.params;
    const {
      imageList,
      activeindex,
      activeSectionIndex,
      itemList,
      timeList,
      showTimeList,
      showRating,
      txtRatingMessage,
      cardsList,
      isVisible,
      storeData,
      rateCount,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header title={details?.storeName} showBack showRightIcon />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <ScrollView
            horizontal={true}
            // bounces={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={{
              marginHorizontal: responsiveWidth("4"),
              paddingTop: responsiveWidth("4"),
            }}
            onScroll={(event) => {
              this.setState({
                activeindex: Math.floor(
                  event.nativeEvent.contentOffset.x / responsiveWidth("92")
                ),
              });
            }}
          >
            {imageList?.map((i, index) => {
              return (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: i?.imageUrl }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode={"cover"}
                  />
                </View>
              );
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageList.map((i, index) => {
              return (
                <View
                  style={[
                    styles.dotContainer,
                    {
                      backgroundColor:
                        activeindex == index ? color.black : color.lightgray,
                    },
                  ]}
                />
              );
            })}
          </View>

          <View style={styles.ratingContainer}>
            {storeData?.isRatingVisible ? (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.setState({ showRating: !showRating })}
                activeOpacity={0.5}
              >
                <AirbnbRating
                  count={5}
                  defaultRating={4}
                  size={responsiveWidth("5.5")}
                  showRating={false}
                  selectedColor={
                    storeData?.ratingColor
                      ? `#${storeData?.ratingColor}`
                      : color.themeOrnage
                  }
                  unSelectedColor={color.lightgray}
                  starContainerStyle={{ alignSelf: "flex-start" }}
                  isDisabled={true}
                />
              </TouchableOpacity>
            ) : null}

            <View style={{ width: responsiveWidth("43") }}>
              <TouchableOpacity
                style={{ flexDirection: "row", justifyContent: "center" }}
                activeOpacity={0.5}
                onPress={() => this.setState({ showTimeList: !showTimeList })}
              >
                <Text style={[styles.timeStyle, { flex: 1 }]}>
                  {`${strings.Open} - `}
                  <Text
                    style={{ color: color.black, fontWeight: "normal" }}
                  >{`${strings.Closing} 16`}</Text>
                </Text>
                <AppIcon
                  name={showTimeList ? "chevron-up" : "chevron-down"}
                  size={responsiveWidth("6")}
                  type={"material-community"}
                  style={{
                    bottom: responsiveWidth("1"),
                  }}
                />
              </TouchableOpacity>
              {showTimeList
                ? timeList.map((i, index) => {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={[
                            styles.actionTitleStyle,
                            { paddingTop: 3, color: color.black, flex: 1 },
                          ]}
                        >
                          {i?.day}
                        </Text>
                        <Text
                          style={[
                            styles.actionTitleStyle,
                            { paddingTop: 3, color: color.black },
                          ]}
                        >
                          {i?.time}
                        </Text>
                      </View>
                    );
                  })
                : null}
            </View>
          </View>

          {showRating ? (
            <View style={styles.rateUsContainer}>
              <Text
                style={[
                  styles.timeStyle,
                  {
                    color: color.black,
                    fontWeight: "normal",
                  },
                ]}
              >{`${strings.RateUs}`}</Text>
              <AirbnbRating
                count={5}
                defaultRating={rateCount}
                size={responsiveWidth("12")}
                showRating={false}
                selectedColor={color.themeOrnage}
                unSelectedColor={color.lightgray}
                starContainerStyle={{
                  alignSelf: "flex-start",
                  paddingVertical: responsiveWidth("2"),
                }}
                onFinishRating={(number) =>
                  this.setState({ rateCount: number })
                }
              />
              <Button
                title={"Submit"}
                container={{
                  marginVertical: 5,
                  marginLeft: 10,
                }}
                titleStyle={{ fontSize: 14 }}
                onPress={() => this.onPressSubmit()}
              />
              {/* <TextInput
                style={styles.textboxContainer}
                placeholder={strings.RatePlaceholder}
                placeholderTextColor={color.gray}
                value={txtRatingMessage}
                onChangeText={(txt) => this.setState({ txtRatingMessage: txt })}
              /> */}
            </View>
          ) : null}

          <View style={styles.actionContainer}>
            {storeData?.storeButtons?.isPhoneNumberVisible ? (
              <ActionButton
                title={strings.Call}
                source={icons.icCall}
                onPress={() =>
                  Linking.openURL(
                    `tel:${storeData?.storeButtons?.phoneNumber || ""}`
                  )
                }
              />
            ) : null}
            {storeData?.storeButtons?.isEmailAddressVisible ? (
              <ActionButton
                title={strings.Email}
                source={icons.icEmail}
                onPress={() =>
                  Linking.openURL(
                    `mailto:${storeData?.storeButtons?.emailAddress || ""}`
                  )
                }
              />
            ) : null}
            {storeData?.storeButtons?.isDirectionDisplayVisible ? (
              <ActionButton
                title={strings.Directions}
                source={icons.icDirection}
                onPress={async () => {
                  const destination = encodeURIComponent(
                    `${storeData?.storeButtons?.address} ${storeData?.storeButtons?.city}, ${storeData?.storeButtons?.state},${storeData?.storeButtons?.country}, ${storeData?.storeButtons?.zip}`
                  );
                  const provider = Platform.OS === "ios" ? "apple" : "google";
                  const link = `http://maps.${provider}.com/?daddr=${destination}`;
                  try {
                    const supported = await Linking.canOpenURL(link);
                    if (supported) Linking.openURL(link);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            ) : null}
            {storeData?.storeButtons?.isDisplayWebSiteVisible ? (
              <ActionButton
                title={strings.Website}
                source={icons.icWebsite}
                onPress={() =>
                  Linking.openURL(`${storeData?.storeButtons?.webSite || ""}`)
                }
              />
            ) : null}
          </View>

          <View style={styles.sectionContainer}>
            <SectionButton
              title={strings.Info}
              isActive={activeSectionIndex === 0}
              onPress={() => {
                this.setState({ activeSectionIndex: 0 });
              }}
            />
            <SectionButton
              title={strings.Inbox}
              isActive={activeSectionIndex === 1}
              onPress={() => {
                this.setState({ activeSectionIndex: 1 });
              }}
            />
            <SectionButton
              title={strings.Cards}
              isActive={activeSectionIndex === 2}
              onPress={() => {
                this.setState({ activeSectionIndex: 2 });
              }}
            />
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.followContainer,
                {
                  backgroundColor: storeData?.isFollowed
                    ? color.themeOrnage
                    : color.themeDarkGray,
                },
              ]}
              onPress={() => this.onPressFollow()}
            >
              <Text style={styles.followTitle}>
                {storeData?.isFollowed ? strings.Followed : strings.Follow}
              </Text>
            </TouchableOpacity>
          </View>

          {activeSectionIndex == 0 ? (
            <Text style={styles.infoTextStyle}>
              {storeData?.storeDescription || ""}
            </Text>
          ) : null}

          {activeSectionIndex == 1
            ? itemList.map((item, index) => {
                return (
                  <SwipeableItem
                    key={index.toString()}
                    data={item}
                    onPress={() => {
                      let newData = item;
                      newData.campaignUrl = item?.campaignURL;
                      newData.cardName = item?.campaignName;
                      this.props.navigation.navigate("StampURL", {
                        detail: newData,
                      });
                    }}
                    disableRightSwipe={true}
                    disableLeftSwipe={true}
                    // frontContainer={{ paddingHorizontal: 0 }}
                  />
                );
              })
            : null}

          {activeSectionIndex === 2
            ? cardsList.map((item, index) => {
                return (
                  <CardItem
                    key={index.toString()}
                    title={item?.cardName || ""}
                    source={item?.icon}
                    isURL={true}
                  />
                );
              })
            : null}

          <View style={{ height: responsiveWidth("10") }} />
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
  getStoreDetail,
  addStoreRate,
  getStoreCampaign,
  followStore,
  getStoresCardList,
})(StoreDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  imageContainer: {
    backgroundColor: color.lightgray,
    height: responsiveWidth("40"),
    width: responsiveWidth("92"),
    justifyContent: "center",
    alignItems: "center",
    // marginRight: responsiveWidth("2"),
  },
  dotContainer: {
    height: responsiveWidth("2"),
    width: responsiveWidth("2"),
    borderRadius: responsiveWidth("2"),
    marginHorizontal: responsiveWidth("1"),
    marginVertical: responsiveWidth("2"),
  },
  timeStyle: {
    fontSize: fontSize.regularx,
    color: color.green,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    paddingVertical: responsiveWidth("2"),
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
    paddingHorizontal: responsiveWidth("4"),
  },
  actionContainer: {
    paddingVertical: responsiveWidth("4"),
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
    flexDirection: "row",
    // paddingHorizontal: responsiveWidth('4')
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: responsiveWidth("10"),
    width: responsiveWidth("10"),
    borderRadius: responsiveWidth("10"),
    borderWidth: 0.5,
    borderColor: color.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    height: responsiveWidth("6"),
    width: responsiveWidth("6"),
    resizeMode: "cover",
  },
  actionTitleStyle: {
    color: color.blue,
    fontSize: fontSize.xxsmall,
    paddingTop: responsiveWidth("3"),
  },
  sectionContainer: {
    flexDirection: "row",
    paddingTop: responsiveWidth("4"),
    paddingBottom: responsiveWidth("6"),
    paddingHorizontal: responsiveWidth("4"),
  },
  sectionTitleStyle: {
    fontSize: fontSize.regular,
  },
  followTitle: {
    fontSize: fontSize.regular,
    color: color.white,
    fontWeight: "bold",
  },
  followContainer: {
    backgroundColor: color.themeOrnage,
    paddingHorizontal: responsiveWidth("3"),
    paddingVertical: responsiveWidth("1"),
    borderRadius: responsiveWidth("5"),
  },
  infoTextStyle: {
    color: color.black,
    fontSize: fontSize.regularx,
    paddingHorizontal: responsiveWidth("4"),
  },
  rateUsContainer: {
    paddingVertical: responsiveWidth("2"),
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
    paddingHorizontal: responsiveWidth("4"),
  },
  textboxContainer: {
    backgroundColor: color.extraLightgray,
    borderBottomColor: color.gray,
    borderBottomWidth: 1.5,
    fontSize: fontSize.regularx,
    padding: responsiveWidth("2"),
  },
});
