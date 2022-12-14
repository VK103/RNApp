import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../constant/theme";
import {
  AppIcon,
  Button,
  Header,
  Loader,
  PickerModal,
  SideMenu,
} from "../../common";

import { connect } from "react-redux";

import {
  getAllCategories,
  getAllRegion,
  getAllCities,
  findStores,
} from "../../redux/actions/storeAction";
import { getAllCountriesList } from "../../redux/actions/authActions";

import globleString from "../../language/localized";
import moment from "moment";
import { countryList, homeMenuList } from "../../constant/menuList";
import store from "../../../store";
import {
  GET_ALL_STORE_LIST,
  GET_ALL_STORE_LIST_BY_ALPHA,
} from "../../redux/actions/types";
const strings = globleString.strings;

const SectionContainer = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.subContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text
          style={[
            styles.titleStyle,
            {
              color: color.gray2,
              textAlign: "right",
              left: responsiveWidth("2"),
            },
          ]}
        >
          {value}
        </Text>
        <AppIcon
          name={"chevron-right"}
          size={responsiveWidth("6")}
          type={"material-community"}
          style={{
            left: responsiveWidth("2"),
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

class StoreSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: 50,
      showSideMenu: false,
      showModal: false,
      categories: [],
      region: [],
      cities: [],
      alphabet: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    };
  }

  //Life Cycle Methods
  componentDidMount() {
    this.onCallGetAllCategory();
    this.onCallGetAllCountry();
  }

  //Validate Methods
  validateStore = () => {
    const { selCategoryIndex, selCountryIndex, selCityIndex, selRegionIndex } =
      this.state;
    if (
      selCategoryIndex == null ||
      selCategoryIndex == undefined ||
      selCategoryIndex <= -1
    ) {
      Alert.alert(strings.AppName, "Please select category");
      return false;
    }
    if (
      selCountryIndex == null ||
      selCountryIndex == undefined ||
      selCountryIndex <= -1
    ) {
      Alert.alert(strings.AppName, "Please select country");
      return false;
    }
    if (
      selRegionIndex == null ||
      selRegionIndex == undefined ||
      selRegionIndex <= -1
    ) {
      Alert.alert(strings.AppName, "Please select region");
      return false;
    }
    if (
      selCityIndex == null ||
      selCityIndex == undefined ||
      selCityIndex <= -1
    ) {
      Alert.alert(strings.AppName, "Please select city");
      return false;
    }
    return true;
  };

  //Button Click Events
  onPressFindStore = () => {
    if (this.validateStore()) this.onCallFindStore();
  };

  //API Call Methods
  onCallGetAllCategory = () => {
    try {
      this.setState({ isVisible: true });
      this.props
        .getAllCategories({ categoryType: "Store" })
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, categories: res?.data || [] });
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
  onCallGetAllCountry = () => {
    try {
      this.setState({ isVisible: true });
      this.props
        .getAllCountriesList()
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
  onCallGetAllRegion = () => {
    const { selCountryIndex } = this.state;
    const { allCountriesList } = this.props;
    let params = {
      countryCode: allCountriesList[selCountryIndex].isOcountrycode,
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .getAllRegion(params)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, region: res?.data || [] });
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
  onCallGetAllCities = () => {
    const { selRegionIndex, region } = this.state;
    let params = {
      regionId: region[selRegionIndex].id,
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .getAllCities(params)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, cities: res?.data || [] });
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
  onCallFindStore = () => {
    const {
      selRegionIndex,
      region,
      selCityIndex,
      cities,
      selCategoryIndex,
      categories,
      selCountryIndex,
      alphabet,
    } = this.state;
    const { allCountriesList } = this.props;
    let params = {
      categoryId: categories[selCategoryIndex].id,
      country: allCountriesList[selCountryIndex].countryname,
      region: region[selRegionIndex].name,
      city: cities[selCityIndex].name,
    };
    try {
      this.setState({ isVisible: true });
      this.props
        .findStores(params)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false });
          store.dispatch({ type: GET_ALL_STORE_LIST, payload: res?.data });
          let storeArr = [];
          for (const i of alphabet) {
            let alpha = i.toUpperCase();
            let alphaItems = res?.data?.filter((el) => {
              let storeAlpha = el?.storeName?.charAt(0)?.toUpperCase();
              return storeAlpha === alpha ? true : false;
            });
            if (alphaItems?.length > 0)
              storeArr.push({ title: alpha, data: alphaItems });
          }
          // this.setState({ storesList: storeArr });
          store.dispatch({
            type: GET_ALL_STORE_LIST_BY_ALPHA,
            payload: storeArr,
          });
          this.props.navigation.navigate("Stores", { fromWhere: "setting" });
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

  //Render Methods
  render() {
    const { title } = this.props.route.params;
    const { allCountriesList } = this.props;
    const {
      showSideMenu,
      headerHeight,
      isVisible,
      selCountryIndex,
      selRegionIndex,
      selCityIndex,
      selCategoryIndex,
      categories,
      region,
      cities,
      showModal,
      isCategory,
      isCountry,
      isRegion,
      isCity,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={title}
          showRightIcon={true}
          showBack={true}
          // hanldeGoBack={() => this.props.navigation.navigate('Stores')}
          getHeaderHeight={(height) => this.setState({ headerHeight: height })}
        />

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <SectionContainer
            title={strings.Category}
            value={
              selCategoryIndex > -1
                ? categories[selCategoryIndex]?.name
                : "Select Category"
            }
            onPress={() =>
              this.setState(
                {
                  isCategory: true,
                  isCountry: false,
                  isRegion: false,
                  isCity: false,
                },
                () => this.setState({ showModal: true })
              )
            }
          />
          <SectionContainer
            title={strings.Country}
            value={
              selCountryIndex > -1
                ? allCountriesList[selCountryIndex]?.countryname
                : "Select Country"
            }
            onPress={() =>
              this.setState(
                {
                  isCategory: false,
                  isCountry: true,
                  isRegion: false,
                  isCity: false,
                },
                () => this.setState({ showModal: true })
              )
            }
          />
          <SectionContainer
            title={strings.Region}
            value={
              region?.length > 0 && selRegionIndex > -1
                ? region[selRegionIndex]?.name
                : region?.length > 0
                ? "Select Region"
                : ""
            }
            onPress={() =>
              this.setState(
                {
                  isCategory: false,
                  isCountry: false,
                  isRegion: true,
                  isCity: false,
                },
                () => this.setState({ showModal: true })
              )
            }
          />
          <SectionContainer
            title={strings.City}
            value={
              cities?.length > 0 && selCityIndex > -1
                ? cities[selCityIndex]?.name
                : cities?.length > 0
                ? "Select City"
                : ""
            }
            onPress={() =>
              this.setState(
                {
                  isCategory: false,
                  isCountry: false,
                  isRegion: false,
                  isCity: true,
                },
                () => this.setState({ showModal: true })
              )
            }
          />
        </ScrollView>
        <Button
          title={strings.FindStores}
          container={styles.buttonContainer}
          titleStyle={{ color: color.black }}
          onPress={() => this.onPressFindStore()}
        />
        {showSideMenu ? (
          <SideMenu
            menuList={countryList}
            headerHeight={headerHeight}
            onPressItem={() => {
              this.setState({ showSideMenu: false });
            }}
            onPressOut={() => {
              this.setState({ showSideMenu: false });
            }}
          />
        ) : null}
        <Loader isVisible={isVisible} />
        <PickerModal
          isVisible={showModal}
          modalContainer={
            <>
              {isCountry && allCountriesList?.length > 0 ? (
                <View
                  style={{
                    width: responsiveWidth("100%"),
                    height: responsiveHeight("24%"),
                  }}
                >
                  <ScrollView style>
                    {allCountriesList?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState(
                              {
                                selRegionIndex: null,
                                region: [],
                                cities: [],
                                selCityIndex: null,
                                selCountryIndex: index,
                                showModal: false,
                              },
                              () => this.onCallGetAllRegion()
                            )
                          }
                          style={{
                            marginHorizontal: responsiveWidth("5"),
                            paddingVertical: responsiveWidth("2"),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize.mini - 1,
                              color: color.white,
                            }}
                          >{`${
                            item?.countryCode ? `(+${item?.countryCode})` : ""
                          } ${item?.countryname}`}</Text>
                          <AppIcon
                            name={"check"}
                            size={20}
                            color={
                              selCountryIndex === index
                                ? color.white
                                : color.transparent
                            }
                            style={{ marginRight: 8 }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <View style={{ height: responsiveHeight("3") }} />
                  </ScrollView>
                </View>
              ) : null}
              {isCategory && categories?.length > 0 ? (
                <View
                  style={{
                    width: responsiveWidth("100%"),
                    height: responsiveHeight("24%"),
                  }}
                >
                  <ScrollView style>
                    {categories?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              selCategoryIndex: index,
                              showModal: false,
                            })
                          }
                          style={{
                            marginHorizontal: responsiveWidth("5"),
                            paddingVertical: responsiveWidth("2"),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize.mini - 1,
                              color: color.white,
                            }}
                          >
                            {item?.name || ""}
                          </Text>
                          <AppIcon
                            name={"check"}
                            size={20}
                            color={
                              selCategoryIndex === index
                                ? color.white
                                : color.transparent
                            }
                            style={{ marginRight: 8 }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <View style={{ height: responsiveHeight("3") }} />
                  </ScrollView>
                </View>
              ) : null}
              {isRegion && region?.length > 0 ? (
                <View
                  style={{
                    width: responsiveWidth("100%"),
                    height: responsiveHeight("24%"),
                  }}
                >
                  <ScrollView style>
                    {region?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState(
                              {
                                selRegionIndex: index,
                                cities: [],
                                selCityIndex: null,
                                showModal: false,
                              },
                              () => this.onCallGetAllCities()
                            )
                          }
                          style={{
                            marginHorizontal: responsiveWidth("5"),
                            paddingVertical: responsiveWidth("2"),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize.mini - 1,
                              color: color.white,
                            }}
                          >
                            {item?.name || ""}
                          </Text>
                          <AppIcon
                            name={"check"}
                            size={20}
                            color={
                              selRegionIndex === index
                                ? color.white
                                : color.transparent
                            }
                            style={{ marginRight: 8 }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <View style={{ height: responsiveHeight("3") }} />
                  </ScrollView>
                </View>
              ) : null}
              {isCity && cities?.length > 0 ? (
                <View
                  style={{
                    width: responsiveWidth("100%"),
                    height: responsiveHeight("24%"),
                  }}
                >
                  <ScrollView style>
                    {cities?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              selCityIndex: index,
                              showModal: false,
                            })
                          }
                          style={{
                            marginHorizontal: responsiveWidth("5"),
                            paddingVertical: responsiveWidth("2"),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: fontSize.mini - 1,
                              color: color.white,
                            }}
                          >
                            {item?.name || ""}
                          </Text>
                          <AppIcon
                            name={"check"}
                            size={20}
                            color={
                              selCityIndex === index
                                ? color.white
                                : color.transparent
                            }
                            style={{ marginRight: 8 }}
                          />
                        </TouchableOpacity>
                      );
                    })}
                    <View style={{ height: responsiveHeight("3") }} />
                  </ScrollView>
                </View>
              ) : null}
            </>
          }
          onRequestClose={() => {
            this.setState({ showModal: false });
          }}
          onPressClose={() => {
            this.setState({ showModal: false });
          }}
          onPressDone={() => {
            this.setState({ showModal: false });
          }}
          onPressOutside={() => {
            this.setState({ showModal: false });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { allCountriesList } = state.auth;
  return {
    allCountriesList,
  };
};

export default connect(mapStateToProps, {
  getAllCountriesList,
  getAllCategories,
  getAllRegion,
  getAllCities,
  findStores,
})(StoreSettings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  itemContainer: {
    paddingHorizontal: responsiveWidth("4"),
    // paddingTop: responsiveWidth('2'),
    paddingVertical: responsiveWidth("3"),
    borderBottomColor: color.lightgray,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  dateTextStyle: {
    fontSize: fontSize.xsmall,
    color: color.gray2,
    alignSelf: "flex-end",
  },
  titleStyle: {
    flex: 1,
    paddingRight: responsiveWidth("4"),
    fontSize: fontSize.regular,
  },
  subContainer: {
    flexDirection: "row",
    marginTop: responsiveWidth("1.5"),
  },
  buttonContainer: {
    position: "absolute",
    bottom: responsiveWidth("4"),
    right: responsiveWidth("4"),
    backgroundColor: color.white,
    borderColor: color.lightgray,
  },
});
