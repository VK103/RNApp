import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  color,
  fontSize,
  responsiveHeight,
  responsiveWidth,
} from "../../constant/theme";
import { AppIcon, Header } from "../../common";

import { connect } from "react-redux";
import { getAllCampaigns } from "../../redux/actions/inboxAction";

import globleString from "../../language/localized";
import moment from "moment";
import { homeMenuList } from "../../constant/menuList";
const strings = globleString.strings;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inboxList: [],
      headerHeight: 50,
    };
  }

  componentDidMount() {
    this.onCallGetCampaignList();
  }

  //API call methods
  onCallGetCampaignList = () => {
    let data = this?.props?.route?.params;
    try {
      this.setState({ isVisible: true });
      let params = {};
      this.props
        .getAllCampaigns(params)
        .then((res) => {
          console.log("res: ", res?.data);
          this.setState({
            isVisible: false,
            isRefresh: false,
            inboxList: res?.data || [],
          });
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

  //Render Methods
  render() {
    const { inboxList, headerHeight } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={strings.AppName}
          showRightIcon={true}
          menuList={homeMenuList}
        />
        <FlatList
          data={inboxList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          // bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.setState({ isRefresh: true }, () => {
                  this.onCallGetCampaignList();
                });
              }}
              tintColor={color.themeDarkGray}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  this.props.navigation.navigate("InboxList", {
                    title: item.storeName,
                    data: item,
                  });
                }}
                activeOpacity={0.6}
              >
                <Text style={styles.dateTextStyle}>
                  {moment(item.lastUpdatedDateTime).format("DD/MM/YYYY")}
                </Text>
                <View style={styles.subContainer}>
                  <Text style={styles.titleStyle}>{item.storeName}</Text>
                  <AppIcon
                    name={item.isRead ? "envelope-open" : "envelope"}
                    solid={!item.isRead}
                    size={responsiveWidth("6")}
                  />
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
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  getAllCampaigns,
})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  itemContainer: {
    paddingHorizontal: responsiveWidth("4"),
    paddingTop: responsiveWidth("2"),
    paddingBottom: responsiveWidth("4"),
    borderBottomColor: color.lightgray,
    borderBottomWidth: 1,
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
});
