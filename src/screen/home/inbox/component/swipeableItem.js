import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { AppIcon } from '../../../../common';
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../../../constant/theme';


const SwipeableItem = ({
    data,
    onPress,
    onPressDelete,
    onPressBookmark,
    disableLeftSwipe,
    disableRightSwipe,
    frontContainer
}) => {
    return (
        <View style={styles.container}>
            <SwipeRow
                leftOpenValue={responsiveWidth('22')}
                stopLeftSwipe={responsiveWidth('22')}
                rightOpenValue={-responsiveWidth('22')}
                stopRightSwipe={-responsiveWidth('22')}
                useNativeDriver={true}
                onRowPress={onPress}
                disableLeftSwipe={disableLeftSwipe}
                disableRightSwipe={disableRightSwipe}
            >
                <View style={styles.standaloneRowBack}>
                    <TouchableOpacity
                        style={styles.leftContainer}
                        activeOpacity={0.8}
                        onPress={onPressDelete}
                    >
                        <AppIcon
                            name="trash-alt"
                            color={color.white}
                            size={responsiveWidth('8')}
                        />
                        <Text style={styles.backTextStyle}>{'Delete'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightContainer}
                        activeOpacity={0.8}
                        onPress={onPressBookmark}
                    >
                        <AppIcon
                            name="bookmark"
                            color={color.white}
                            size={responsiveWidth('8')}
                        />
                        <Text style={styles.backTextStyle}>{'Bookmark'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.frontContainer, frontContainer]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.titleStyle, { flex: 1 }]}>{data?.title}</Text>
                        <Text style={[styles.titleStyle, { color: color.blue }]}>{data?.type}</Text>
                        <AppIcon
                            name={'chevron-right'}
                            size={responsiveWidth('6')}
                            type={'material-community'}
                            style={{
                                left: responsiveWidth('2')
                            }}
                        />
                    </View>
                    <Text style={[styles.basicTextStyle, { paddingVertical: responsiveWidth('3') }]}>{data?.desc}</Text>
                    <Text style={[styles.basicTextStyle, {
                        alignSelf: 'flex-end', color: color.gray2
                    }]}>{`Expire: ${moment().format('DD/MM/YYYY')}`}</Text>
                </View>
            </SwipeRow>

        </View>
    );
}

export { SwipeableItem }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    titleStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        fontWeight: 'bold',
    },
    frontContainer: {
        paddingHorizontal: responsiveWidth('4'),
        paddingVertical: responsiveWidth('2.5'),
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray,
        backgroundColor: color.white,
        minHeight: responsiveHeight('14')
    },
    basicTextStyle: {
        color: color.black,
        fontSize: fontSize.mini,
    },
    standaloneRowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        width: responsiveWidth('22'),
        backgroundColor: color.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        width: responsiveWidth('22'),
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backTextStyle: {
        color: color.white,
        fontWeight: 'bold',
        fontSize: fontSize.xsmall,
        paddingTop: responsiveWidth('4')
    }
});