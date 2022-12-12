// react-native-swipe-list-view
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Header } from "../../../common";
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

  componentDidMount() {
    let data = this.props.route?.params?.data || {};
    this.setState({ itemList: data?.campaignInfo || [] });
  }

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
                disableLeftSwipe={title == "Deleted" || title == "Bookmark"}
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
