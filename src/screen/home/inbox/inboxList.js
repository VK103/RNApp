// react-native-swipe-list-view
import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { Header } from "../../../common";
import { asyncKey } from "../../../constant/keys";
import { homeMenuList } from "../../../constant/menuList";
import { color } from "../../../constant/theme";

import globleString from "../../../language/localized";
import { SwipeableItem } from "./component/swipeableItem";
const strings = globleString.strings;

class InboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
  }

  async componentDidMount() {
    const { title } = this?.props?.route?.params;
    if (title == "Bookmark" || title == strings.SavedCampaigns) {
      let bookmarkCampaign = await AsyncStorage.getItem(
        asyncKey.BOOKMARK_CAMPAIGN
      );
      let bookmarkCampaignList = JSON.parse(bookmarkCampaign) || [];
      this.setState({ itemList: bookmarkCampaignList || [] });
    } else if (title == "Deleted" || title == strings.DeletedCampaigns) {
      let deletedCampaign = await AsyncStorage.getItem(
        asyncKey.DELETED_CAMPAIGN
      );
      let deletedCampaignList = JSON.parse(deletedCampaign) || [];
      this.setState({ itemList: deletedCampaignList || [] });
    } else {
      let deletedCampaign = await AsyncStorage.getItem(
        asyncKey.DELETED_CAMPAIGN
      );
      let deletedCampaignList = JSON.parse(deletedCampaign) || [];
      let data = this.props.route?.params?.data || {};
      let newRecordList = [];
      data?.campaignInfo?.map((i) => {
        const checkIsDeleted = deletedCampaignList.filter(
          (f) => JSON.stringify(f) === JSON.stringify(i)
        );
        if (checkIsDeleted.length == 0) {
          newRecordList.push(i);
        }
      });
      this.setState({ itemList: newRecordList || [] });
    }
  }

  onHandleDelete = async (item) => {
    const { itemList } = this.state;
    let deletedCampaign = await AsyncStorage.getItem(asyncKey.DELETED_CAMPAIGN);
    let deletedCampaignList = JSON.parse(deletedCampaign) || [];

    const checkIsExist = deletedCampaignList.filter(
      (i) => JSON.stringify(i) === JSON.stringify(item)
    );

    if (checkIsExist.length === 0) {
      deletedCampaignList.push(item);
      await AsyncStorage.setItem(
        asyncKey.DELETED_CAMPAIGN,
        JSON.stringify(deletedCampaignList)
      );
      let newRecordList = [];
      itemList.map((i) => {
        const checkIsDeleted = deletedCampaignList.filter(
          (f) => JSON.stringify(f) === JSON.stringify(i)
        );
        if (checkIsDeleted.length == 0) {
          newRecordList.push(i);
        }
      });
      this.setState({ itemList: newRecordList || [] });
    }
  };

  onHandleBookmark = async (item) => {
    let bookmarkCampaign = await AsyncStorage.getItem(
      asyncKey.BOOKMARK_CAMPAIGN
    );
    let bookmarkCampaignList = JSON.parse(bookmarkCampaign) || [];

    const checkIsExist = bookmarkCampaignList.filter(
      (i) => JSON.stringify(i) === JSON.stringify(item)
    );

    if (checkIsExist.length === 0) {
      bookmarkCampaignList.push(item);
      await AsyncStorage.setItem(
        asyncKey.BOOKMARK_CAMPAIGN,
        JSON.stringify(bookmarkCampaignList)
      );
      Alert.alert(strings.AppName, "Campaign successfully bookmark.");
    } else {
      Alert.alert(strings.AppName, "This campaign already bookmark by you.");
    }
  };

  render() {
    const { title } = this.props.route.params;
    const { itemList } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={title}
          showRightIcon={true}
          showBack={true}
          menuList={homeMenuList}
          navigations={this.props.navigation}
        />
        <FlatList
          data={itemList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => {
            return (
              <SwipeableItem
                data={item}
                onPress={() => {
                  let newData = item;
                  newData.campaignUrl = item?.campaignURL;
                  newData.cardName = item?.campaignName;
                  this.props.navigation.navigate("StampURL", {
                    detail: newData,
                  });
                }}
                disableRightSwipe={title == "Deleted" || title == "Bookmark"}
                disableLeftSwipe={
                  title == "Deleted" ||
                  title == "Bookmark" ||
                  title == strings.SavedCampaigns ||
                  title == strings.DeletedCampaigns
                }
                onPressBookmark={() => {
                  this.onHandleBookmark(item);
                }}
                onPressDelete={() => {
                  this.onHandleDelete(item);
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default InboxList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  textStyle: {
    color: color.black,
  },
});
