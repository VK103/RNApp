import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { Header, Loader, SearchBox } from "../../common";
import { homeMenuList } from "../../constant/menuList";
import {
  color,
  fontFamily,
  fontSize,
  responsiveWidth,
} from "../../constant/theme";

import { getStoreList } from "../../redux/actions/storeAction";

import globleString from "../../language/localized";
const strings = globleString.strings;

class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
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
      storesList: [],
    };
  }

  //Life cycle methods
  componentDidMount() {
    this.onCallGetStore();
  }

  //API call methods
  onCallGetStore = () => {
    const { alphabet, isRefresh } = this.state;
    try {
      if (!isRefresh) this.setState({ isVisible: true });
      this.props
        .getStoreList()
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({ isVisible: false, isRefresh: false });
          let storeData = res?.data || [];
          this.setState({ storeData: storeData });
          let storeArr = [];
          for (const i of alphabet) {
            let alpha = i.toUpperCase();
            let alphaItems = storeData?.filter((el) => {
              let storeAlpha = el?.storeName?.charAt(0)?.toUpperCase();
              return storeAlpha === alpha ? true : false;
            });
            if (alphaItems?.length > 0)
              storeArr.push({ title: alpha, data: alphaItems });
          }
          this.setState({ storesList: storeArr });
        })
        .catch((e) => {
          this.setState({ isVisible: false, isRefresh: false });
          Alert.alert(strings.AppName, strings.SomethingWentWrong);
          console.log("Error :: ", e);
        });
    } catch (error) {
      console.log("Catch Error :: ", error);
    }
  };
  filterStore = (text) => {
    const { alphabet, storeData } = this.state;
    let storeArr = [];
    for (const i of alphabet) {
      let alpha = i.toUpperCase();
      let alphaItems = storeData?.filter((el) => {
        let storeAlpha = el?.storeName?.charAt(0)?.toUpperCase();
        let isSearchable = el?.storeName?.indexOf(text) > -1;
        return storeAlpha === alpha && isSearchable ? true : false;
      });
      if (alphaItems?.length > 0)
        storeArr.push({ title: alpha, data: alphaItems });
    }
    this.setState({ storesList: storeArr });
  };

  //Render Methods
  render() {
    const { txtSearch, storesList, isVisible } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.AppName}
          showRightIcon={true}
          menuList={homeMenuList}
        />
        <SearchBox
          textBoxStyle={{ marginTop: responsiveWidth("3") }}
          value={txtSearch}
          onChangeText={(txt) => {
            this.filterStore(txt);
            this.setState({ txtSearch: txt });
          }}
        />
        <SectionList
          sections={storesList}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.setState({ isRefresh: true }, () => {
                  this.onCallGetStore();
                });
              }}
              tintColor={color.themeDarkGray}
            />
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.itemContainer}
                onPress={() => {
                  this.props.navigation.navigate("StoreDetails", {
                    details: item,
                  });
                }}
              >
                <Text style={styles.itemTextStyle}>{item?.storeName}</Text>
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerText}>{title}</Text>
          )}
        />
        <Loader isVisible={isVisible} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getStoreList,
})(Stores);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.extraLightgray,
  },
  headerText: {
    color: color.black,
    fontSize: fontSize.regular,
    paddingVertical: responsiveWidth("2"),
    fontWeight: "bold",
    paddingHorizontal: responsiveWidth("4"),
  },
  itemContainer: {
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.lightgray,
  },
  itemTextStyle: {
    color: color.black,
    fontSize: fontSize.regular,
    paddingVertical: responsiveWidth("3"),
    paddingHorizontal: responsiveWidth("4"),
  },
});
