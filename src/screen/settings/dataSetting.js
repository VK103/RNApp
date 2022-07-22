import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { FlatItem, Header } from '../../common';
import { color, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class DataSettings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={strings.DataSettings}
                    showRightIcon
                    showBack={true}
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatItem
                        title={strings.SettingPrivacyPolicy}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                    <FlatItem
                        title={strings.ManageData}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                    <FlatItem
                        title={strings.ExportData}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                    <FlatItem
                        title={strings.DeleteAccount}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default DataSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
})