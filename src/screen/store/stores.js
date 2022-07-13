import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class Stores extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{strings.Stores}</Text>
            </View>
        )
    }
}

export default Stores

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