import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { color, fontSize, responsiveWidth } from '../constant/theme'

const SearchBox = ({ value, onChangeText, textBoxStyle }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[styles.textBoxStyle, textBoxStyle]}
            placeholder="Search"
            placeholderTextColor={color.lightgray}
        />
    )
}

export { SearchBox }

const styles = StyleSheet.create({
    textBoxStyle: {
        backgroundColor: color.white,
        marginHorizontal: responsiveWidth('4'),
        marginVertical: responsiveWidth('2'),
        padding: responsiveWidth("3"),
        borderRadius: 10,
        color: color.black,
        fontSize: fontSize.mini
    }
})