import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { color, fontSize, responsiveWidth } from '../constant/theme';
import { AppIcon } from './appIcon'
import Modal from 'react-native-modal';

const SideMenu = ({
    menuList,
    onPressItem,
    headerHeight,
    onPressOut,
}) => {
    const [showMenu, setShowMenu] = useState(true)
    return (
        <Modal
            transparent={true}
            testID={'modal'}
            isVisible={showMenu}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            backdropOpacity={0}
            style={{ padding: 0, margin: 0 }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressOut={() => {
                    setShowMenu(false)
                    onPressOut()
                }}
                style={styles.modalContainer}
            >
                <TouchableWithoutFeedback>
                    <View style={[styles.menuContainer, { top: headerHeight }]}>
                        {menuList && Array.isArray(menuList) ? menuList.map((i, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    onPress={() => {
                                        setShowMenu(false)
                                        setTimeout(() => {
                                            onPressItem(i)
                                        }, 80);
                                    }}
                                    style={styles.itemContainer}
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.menuItemtitleStyle}>{i.title} {i.count > 0 ? `(${i?.count})` : ''}</Text>
                                    {i?.showIcon ? <AppIcon
                                        name={'chevron-right'}
                                        size={responsiveWidth('6')}
                                        type={'material-community'}
                                        style={{
                                            left: responsiveWidth('2')
                                        }}
                                    /> : null}
                                </TouchableOpacity>
                            )
                        }) : null}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export { SideMenu }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth('4%')
    },
    titleText: {
        fontSize: fontSize.regular,
        color: color.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    iconStyle: {
        resizeMode: 'contain',
        height: responsiveWidth('4%'),
        width: responsiveWidth('4%')
    },
    menuContainer: {
        width: responsiveWidth('60'),
        height: '100%',
        backgroundColor: color.white,
        position: 'absolute',
        right: 0,
        borderLeftWidth: 1,
        borderLeftColor: color.lightgray
    },
    modalContainer: {
        height: '100%',
        width: '100%'
    },
    menuItemtitleStyle: {
        flex: 1,
        paddingRight: responsiveWidth("4"),
        fontSize: fontSize.regularx
    },
    itemContainer: {
        flexDirection: 'row',
        padding: responsiveWidth('4'),
        borderBottomColor: color.lightgray,
        borderBottomWidth: 1
    }
})