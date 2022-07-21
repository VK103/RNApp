import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { icons } from '../../assets';
import { AppIcon, Header } from '../../common';
import { color, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

const AccountSection = ({ value, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.sectionContainer}
        >
            <Text style={styles.sectionTextStyle}>{title}</Text>
            <Text style={[styles.sectionTextStyle, {
                textAlign: 'right', color: color.defaultGray
            }]}>{value}</Text>
        </TouchableOpacity>
    )
}

class MyAccount extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={strings.MyAccount}
                    showRightIcon
                    showBack={true}
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <AccountSection
                        value={'Malin'}
                        title={strings.AccountFirstName}
                        onPress={() => { }}
                    />
                    <AccountSection
                        value={'Syvertsen'}
                        title={strings.LastName}
                        onPress={() => { }}
                    />
                    <AccountSection
                        value={'+45 556 75 765'}
                        title={strings.MobileNumber}
                        onPress={() => { }}
                    />
                    <AccountSection
                        value={'malin@storestamp.com'}
                        title={strings.AccountEmail}
                        onPress={() => { }}
                    />
                    <AccountSection
                        value={'Female'}
                        title={strings.Gender}
                        onPress={() => { }}
                    />
                    <AccountSection
                        value={'1515'}
                        title={strings.Zip}
                        onPress={() => { }}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default MyAccount

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
        paddingVertical: responsiveWidth('4')
    },
    iconStyle: {
        height: responsiveWidth('7'),
        width: responsiveWidth('7'),
        resizeMode: 'cover',
        marginRight: responsiveWidth('2.5')
    }
})