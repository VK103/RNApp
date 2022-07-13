import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class Cards extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{strings.Cards}</Text>
            </View>
        )
    }
}

export default Cards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: color.black
    }
})