import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppIcon } from './appIcon';
import { color, responsiveWidth } from '../constant/theme';

const CheckBox = ({ isSelected, onPress, container, size, isSquare, boxContainer, disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[container]}
            disabled={disabled}
            activeOpacity={0.6}
        >
            <View style={[styles.boxContainer, {
                height: size || responsiveWidth('4.8%'),
                width: size || responsiveWidth('4.8%'),
            }, boxContainer]}>
                {isSelected ?
                    <>
                        {isSquare ?
                            <View style={[styles.boxStyle, {
                                height: (size - responsiveWidth('1%')) || responsiveWidth('4.2%'),
                                width: (size - responsiveWidth('1%')) || responsiveWidth('4.2%'),
                            }]} /> :
                            <AppIcon
                                name="check"
                                size={size || responsiveWidth('4.2%')}
                                color={color.black}
                                type="Feather"
                            />
                        }
                    </> : null}
            </View>
        </TouchableOpacity>
    )
}

export { CheckBox }

const styles = StyleSheet.create({
    boxContainer: {
        borderColor: color.lightgray,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    boxStyle: {
        backgroundColor: color.black,
        borderColor: color.white,
        borderWidth: 2
    }
})