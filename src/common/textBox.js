import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { color, fontSize, responsiveHeight, responsiveWidth } from '../constant/theme';

const TextBox = ({
    title,
    value,
    onChangeText,
    placeholder,
    placeholderColor,
    secureTextEntry,
    multiline,
    textBoxStyle,
    btnText,
    onPress,
    titleStyle,
    editable,
    onSelectionChange,
    onBlur,
    onFocus,
    disabled,
    container,
    mobileValue,
    onChangeMobileText,
    isMobile,
    keyboardType
}) => {
    return (
        <View style={[styles.container, container]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onPress} disabled={disabled}>
                    <Text style={[styles.titleStyle, {
                        color: color.blue,
                        marginRight: 0,
                        flex: 0
                    }]}>{btnText}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', }}>
                {isMobile ? <TextInput
                    value={mobileValue}
                    onChangeText={onChangeMobileText}
                    style={styles.mobiletextBoxStyle}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                /> : null}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor || 'lightgray'}
                    style={[styles.textBoxStyle, textBoxStyle]}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    editable={editable}
                    onSelectionChange={onSelectionChange}
                    textAlignVertical="top"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    )
}

export { TextBox };

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsiveWidth('2.5%')
    },
    titleStyle: {
        fontSize: fontSize.regular,
        color: color.black,
        marginBottom: responsiveWidth('2%'),
        marginRight: responsiveHeight('10%'),
        flex: 1
    },
    textBoxStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        borderWidth: 1,
        borderColor: color.lightgray,
        borderRadius: 5,
        paddingVertical: responsiveWidth("1.9%"),
        paddingHorizontal: responsiveWidth('3%'),
        flex: 1
    },
    mobiletextBoxStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        borderWidth: 1,
        borderColor: color.lightgray,
        borderRadius: 5,
        paddingVertical: responsiveWidth("1.9%"),
        paddingHorizontal: responsiveWidth('3%'),
        flex: 0.2,
        marginRight: responsiveWidth('1')
    }
})