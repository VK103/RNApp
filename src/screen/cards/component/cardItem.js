import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'
import { AppIcon } from '../../../common'
import { color, fontSize, responsiveWidth } from '../../../constant/theme'

const CardItem = ({ onPress, title, source }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
            activeOpacity={0.6}
        >
            <Image source={source} style={styles.iconStyle} />
            <View style={styles.subContainer}>
                <Text style={styles.titleStyle}>{title}</Text>
                <AppIcon
                    name={'chevron-right'}
                    size={responsiveWidth('6')}
                    type={'material-community'}
                    style={{
                        left: responsiveWidth('2')
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export { CardItem }

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: responsiveWidth('4'),
        paddingTop: responsiveWidth('2'),
        paddingBottom: responsiveWidth("4"),
        borderBottomColor: color.lightgray,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    titleStyle: {
        flex: 1,
        paddingRight: responsiveWidth("4"),
        fontSize: fontSize.regular
    },
    subContainer: {
        flexDirection: 'row',
        marginTop: responsiveWidth('1.5'),
        flex: 1
    },
    iconStyle: {
        height: responsiveWidth('8'),
        width: responsiveWidth('8'),
        resizeMode: 'cover',
        marginRight: responsiveWidth('3')
    }
})