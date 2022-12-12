import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color, responsiveWidth } from "../constant/theme";
import { AppIcon } from "../common";

import Home from "../screen/home/home";
import Splash from "../screen/splash";
import Login from "../screen/auth/login";
import Register from "../screen/auth/register";
import ConfirmLogin from "../screen/auth/confirmLogin";
import Stores from "../screen/store/stores";
import Cards from "../screen/cards/cards";
import Settings from "../screen/settings/settings";
import InboxList from "../screen/home/inbox/inboxList";
import InboxDetails from "../screen/home/inbox/inboxDetails";
import StoreSettings from "../screen/store/storeSettings";
import StoreDetails from "../screen/store/storeDetails";
import { Image, StyleSheet } from "react-native";
import { icons } from "../assets";
import ActiveCards from "../screen/cards/activeCard";
import ScanCard from "../screen/cards/addCard/scanCard";
import MyAccount from "../screen/settings/myAccount";
import Preferences from "../screen/settings/preference";
import DataSettings from "../screen/settings/dataSetting";
import CampaignSetting from "../screen/settings/campaignSetting";
import Contact from "../screen/settings/contact";
import PrivacyPolicy from "../screen/settings/privacyPolicy";
import Help from "../screen/settings/help";
import AddCardManually from "../screen/cards/addCard/addCardManually";
import CardDetails from "../screen/cards/cardDetails";
import StampURL from "../screen/cards/addCard/stampURL";
import ManageMySetting from "../screen/settings/manageMySetting";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="HomeTab"
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ConfirmLogin" component={ConfirmLogin} />
        <Stack.Screen name="HomeTab" component={MyTab} />
        {/* <Stack.Screen name="InboxList" component={InboxList} /> */}
        <Stack.Screen name="InboxDetails" component={InboxDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let type = "";
          if (route.name === "Inbox") {
            iconName = icons.icInbox;
            type = "";
          } else if (route.name === "Stores") {
            iconName = icons.icStores;
            type = "material-community";
          } else if (route.name === "Cards") {
            iconName = icons.icCards;
          } else {
            iconName = icons.icSettings;
            type = "material-community";
          }
          return (
            <Image
              source={iconName}
              style={[styles.iconsStyle, { tintColor: color }]}
            />
          );
        },
        tabBarActiveTintColor: color.blue,
        tabBarInactiveTintColor: color.black,
        tabBarStyle: {
          backgroundColor: color.extraLightgray,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen name="Inbox" component={MyInboxTab} />
      <Tab.Screen name="Stores" component={MyStoreTab} />
      <Tab.Screen name="Cards" component={MyCardsTab} />
      <Tab.Screen name="Settings" component={MySettingsTab} />
    </Tab.Navigator>
  );
}

function MyInboxTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Inbox" component={Home} />
      <Stack.Screen name="InboxList" component={InboxList} />
      <Stack.Screen name="StampURL" component={StampURL} />
    </Stack.Navigator>
  );
}

function MyStoreTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoreSettings" component={StoreSettings} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
    </Stack.Navigator>
  );
}

function MyCardsTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cards" component={Cards} />
      <Stack.Screen name="ActiveCards" component={ActiveCards} />
      <Stack.Screen name="ScanCard" component={ScanCard} />
      <Stack.Screen name="AddCardManually" component={AddCardManually} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen name="StampURL" component={StampURL} />
    </Stack.Navigator>
  );
}

function MySettingsTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="ManageMySetting" component={ManageMySetting} />
      <Stack.Screen name="DataSettings" component={DataSettings} />
      <Stack.Screen name="CampaignSetting" component={CampaignSetting} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  );
}

export default MainNavigator;

const styles = StyleSheet.create({
  iconsStyle: {
    height: responsiveWidth("6"),
    width: responsiveWidth("6"),
    resizeMode: "cover",
  },
});
