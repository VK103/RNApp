import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { color, fontSize, responsiveWidth } from '../constant/theme';
import { AppIcon } from './appIcon'
import Modal from 'react-native-modal';

const Header = ({
    title,
    rightContainer,
    leftContainer,
    showBack,
    titleText,
    container,
    onLayout,
    leftContainerStyle,
    middleContainerStyle,
    rightContainerStyle,
    hanldeGoBack,
    onPressRight,
    rightIconName,
    showRightIcon
}) => {
    const { goBack } = useNavigation()
    const [headerHeight, setHeaderHeight] = useState(50)
    const [showMenu, setShowMenu] = useState(false)
    return (
        <SafeAreaView onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setHeaderHeight(height)
        }}
            style={{ backgroundColor: color.darkBlue }}>
            <StatusBar barStyle='light-content' backgroundColor={color.darkBlue} />
            <View style={[styles.container, { marginVertical: Platform.OS == 'android' ? responsiveWidth('4%') : responsiveWidth('2%') }, container]}>
                <View style={[styles.subContainer, leftContainerStyle]}>
                    {leftContainer ? leftContainer :
                        showBack && <TouchableOpacity
                            onPress={() => {
                                if (hanldeGoBack) {
                                    hanldeGoBack()
                                } else {
                                    goBack()
                                }
                            }}
                            style={{ padding: responsiveWidth('1%') }}
                        >
                            <AppIcon name={'arrow-left'} color={color.white} size={responsiveWidth('5%')} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.subContainer, { alignItems: 'center', flex: 4 }, middleContainerStyle]}>
                    <Text style={[styles.titleText, titleText]}>{title}</Text>
                </View>
                <View style={[styles.subContainer, { alignItems: 'flex-end' }, rightContainerStyle]}>{
                    rightContainer ? rightContainer :
                        <>{showRightIcon ?
                            <TouchableOpacity
                                onPress={() => setShowMenu(true)}
                                style={{ padding: responsiveWidth('1%') }}
                            >
                                <AppIcon name={rightIconName || 'bars'} color={color.white} size={responsiveWidth('5%')} />
                            </TouchableOpacity>
                            : null}</>
                }</View>
            </View>


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
                    onPressOut={() => { setShowMenu(false) }}
                    style={styles.modalContainer}
                >
                    <TouchableWithoutFeedback>
                        <View style={[styles.menuContainer, { top: headerHeight }]}>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    )
}

export { Header }

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
    }
})