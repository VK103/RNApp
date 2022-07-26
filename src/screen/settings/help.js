import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { FlatItem, Header } from '../../common';
import { color, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class Help extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={strings.Help}
                    showRightIcon
                    showBack={true}
                />
            </View>
        )
    }
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
})