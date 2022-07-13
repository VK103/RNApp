
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { color, responsiveWidth } from '../constant/theme';
import { AppIcon } from '../common';

import Home from '../screen/home/home';
import Splash from '../screen/splash';
import Login from '../screen/auth/login';
import ConfirmLogin from '../screen/auth/confirmLogin';
import Stores from '../screen/store/stores';
import Cards from '../screen/cards/cards';
import Settings from '../screen/settings/settings';
import InboxList from '../screen/home/inbox/inboxList';
import InboxDetails from '../screen/home/inbox/inboxDetails';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ConfirmLogin" component={ConfirmLogin} />
                <Stack.Screen name="HomeTab" component={MyTab} />
                <Stack.Screen name="InboxList" component={InboxList} />
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
                    let type = ''
                    if (route.name === 'Inbox') {
                        iconName = 'envelope'
                        type = ''
                    } else if (route.name === 'Stores') {
                        iconName = 'storefront-outline'
                        type = 'material-community'
                    } else if (route.name === 'Cards') {
                        iconName = 'credit-card'
                    } else {
                        iconName = 'cog-outline'
                        type = 'material-community'
                    }
                    return <AppIcon name={iconName} size={responsiveWidth(route.name === 'Stores' ? '6%' : '5%')} color={color} solid={false} type={type} />;
                },
                tabBarActiveTintColor: color.blue,
                tabBarInactiveTintColor: color.black,
                tabBarStyle: {
                    backgroundColor: color.extraLightgray,
                },
                tabBarLabelStyle: {
                    paddingBottom: 5,
                    fontWeight: '500'
                }
            })}
        >
            <Tab.Screen name="Inbox" component={MyInboxTab} />
            <Tab.Screen name="Stores" component={Stores} />
            <Tab.Screen name="Cards" component={Cards} />
            <Tab.Screen name="Settings" component={Settings} />
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
        </Stack.Navigator>
    );
}

export default MainNavigator;