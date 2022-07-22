import React from 'react'
import { TouchableOpacity, Text, StyleSheet, } from 'react-native'
import { color, fontSize, responsiveWidth } from '../constant/theme'
import { AppIcon } from './appIcon'

const FlatItem = ({ onPress, title, titleStyle, containerStyle }) => {
    return (
        <TouchableOpacity
            style={[styles.subContainer, containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
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

export { FlatItem }

const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        paddingRight: responsiveWidth("4"),
        fontSize: fontSize.regular
    },
    subContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: color.white,
        borderBottomWidth: 2,
        borderBottomColor: color.backGroundGray,
        paddingHorizontal: responsiveWidth('4'),
        paddingVertical: responsiveWidth('3')
    },
})