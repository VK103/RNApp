import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { FlatItem, Header } from '../../common';
import { color, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class CampaignSetting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={strings.CampaignSettings}
                    showRightIcon
                    showBack={true}
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatItem
                        title={strings.SavedCampaigns}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                    <FlatItem
                        title={strings.DeletedCampaigns}
                        containerStyle={{ paddingVertical: responsiveWidth('3') }}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default CampaignSetting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
})