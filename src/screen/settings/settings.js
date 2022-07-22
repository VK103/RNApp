import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { icons } from '../../assets';
import { AppIcon, Header } from '../../common';
import { color, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

const SettingSection = ({ iconName, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.sectionContainer}
        >
            <Image source={iconName} style={styles.iconStyle} />
            <Text style={styles.sectionTextStyle}>{title}</Text>
            <AppIcon
                name={'chevron-right'}
                size={responsiveWidth('6')}
                type={'material-community'}
                style={{
                    left: responsiveWidth('2')
                }}
            />
        </TouchableOpacity>
    )
}

class Settings extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Header
                    title={strings.Settings}
                    showRightIcon
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.textStyle}>{strings.Account}</Text>
                    </View>
                    <SettingSection
                        iconName={icons.icUser}
                        title={strings.MyAccount}
                        onPress={() => { navigation.navigate('MyAccount') }}
                    />
                    <SettingSection
                        iconName={icons.icPreferences}
                        title={strings.Preferences}
                        onPress={() => { navigation.navigate('Preferences') }}
                    />
                    <SettingSection
                        iconName={icons.icDataSetting}
                        title={strings.DataSettings}
                        onPress={() => { navigation.navigate('DataSettings') }}
                    />
                    <SettingSection
                        iconName={icons.icStoreSetting}
                        title={strings.StoreSettings}
                        onPress={() => {
                            navigation.navigate('StoreSettings', {
                                title: strings.StoreSettings
                            });
                        }}
                    />
                    <SettingSection
                        iconName={icons.icCampignSetting}
                        title={strings.CampaignSettings}
                        onPress={() => { navigation.navigate('CampaignSetting') }}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.textStyle}>{strings.About}</Text>
                    </View>
                    <SettingSection
                        iconName={icons.icContact}
                        title={strings.ContactBMLY}
                        onPress={() => { }}
                    />
                    <SettingSection
                        iconName={icons.icShare}
                        title={strings.ShareApp}
                        onPress={() => { }}
                    />
                    <SettingSection
                        iconName={icons.icJoinApp}
                        title={strings.JoinAPp}
                        onPress={() => { }}
                    />
                    <SettingSection
                        iconName={icons.icPrivacyPolicy}
                        title={strings.PrivacyPolicy}
                        onPress={() => { }}
                    />
                    <SettingSection
                        iconName={icons.icHelp}
                        title={strings.Help}
                        onPress={() => { }}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    textStyle: {
        color: color.black,
        fontWeight: 'bold',
        fontSize: fontSize.regular
    },
    sectionTextStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        flex: 1
    },
    titleContainer: {
        paddingHorizontal: responsiveWidth('4'),
        paddingVertical: responsiveWidth('2.5'),
        backgroundColor: color.backGroundGray
    },
    sectionContainer: {
        flexDirection: 'row',
        backgroundColor: color.white,
        paddingHorizontal: responsiveWidth('4'),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray,
        paddingVertical: responsiveWidth('2')
    },
    iconStyle: {
        height: responsiveWidth('7'),
        width: responsiveWidth('7'),
        resizeMode: 'cover',
        marginRight: responsiveWidth('2.5')
    }
})