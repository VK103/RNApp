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
import { alphabetList, homeMenuList } from "../../constant/menuList";
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
      storesList: [],
    };
  }

  //API call methods
  onCallGetStore = () => {
    try {
      this.props
        .getStoreList()
        .then((res) => {
          this.setState({ isVisible: false, isRefresh: false });
        })
        .catch((e) => {
          this.setState({ isVisible: false, isRefresh: false });
          Alert.alert(strings.AppName, strings.SomethingWentWrong);
        });
    } catch (error) {
      console.log("Catch Error :: ", error);
    }
  };

  filterStore = (text) => {
    const { storeList } = this.props;
    let storeArr = [];
    for (const i of alphabetList) {
      let alpha = i.toUpperCase();
      let alphaItems = storeList?.filter((el) => {
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
    const { storeListByAlpha } = this.props;
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
          sections={txtSearch.length > 0 ? storesList : storeListByAlpha}
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
  const { storeList, storeListByAlpha } = state.stores;
  return {
    storeList,
    storeListByAlpha,
  };
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
