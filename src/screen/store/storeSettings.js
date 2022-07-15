import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../constant/theme';
import { AppIcon, Button, Header, SideMenu } from '../../common'

import globleString from '../../language/localized';
import moment from 'moment';
import { countryList, homeMenuList } from '../../constant/menuList';
const strings = globleString.strings

const SectionContainer = ({ title, value, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
            activeOpacity={0.6}
        >
            <View style={styles.subContainer}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={[styles.titleStyle, {
                    color: color.gray2,
                    textAlign: 'right',
                    left: responsiveWidth('2'),
                }]}>{value}</Text>
                <AppIcon
                    name={'chevron-right'}
                    size={responsiveWidth('6')}
                    type={'material-community'}
                    style={{
                        left: responsiveWidth('2'),
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

class StoreSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerHeight: 50,
            showSideMenu: false
        }
    }


    render() {
        const { title } = this.props.route.params
        const { showSideMenu, headerHeight } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={title}
                    showRightIcon={true}
                    showBack={true}
                    // hanldeGoBack={() => this.props.navigation.navigate('Stores')}
                    getHeaderHeight={(height) => this.setState({ headerHeight: height })}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <SectionContainer
                        title={strings.Category}
                        value={'All Category'}
                        onPress={() => {

                        }}
                    />
                    <SectionContainer
                        title={strings.Country}
                        value={'Norway'}
                        onPress={() => {
                            this.setState({ showSideMenu: true })
                        }}
                    />
                    <SectionContainer
                        title={strings.Region}
                        value={'Akershus'}
                        onPress={() => { }}
                    />
                    <SectionContainer
                        title={strings.City}
                        value={'Lysaker'}
                        onPress={() => { }}
                    />
                </ScrollView>
                <Button
                    title={strings.FindStores}
                    container={styles.buttonContainer}
                    titleStyle={{ color: color.black }}
                />
                {showSideMenu ? <SideMenu
                    menuList={countryList}
                    headerHeight={headerHeight}
                    onPressItem={() => {
                        this.setState({ showSideMenu: false })
                    }}
                    onPressOut={() => {
                        this.setState({ showSideMenu: false })
                    }}
                /> : null}
            </View>
        )
    }
}

export default StoreSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    itemContainer: {
        paddingHorizontal: responsiveWidth('4'),
        // paddingTop: responsiveWidth('2'),
        paddingVertical: responsiveWidth("3"),
        borderBottomColor: color.lightgray,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    dateTextStyle: {
        fontSize: fontSize.xsmall,
        color: color.gray2,
        alignSelf: 'flex-end'
    },
    titleStyle: {
        flex: 1,
        paddingRight: responsiveWidth("4"),
        fontSize: fontSize.regular
    },
    subContainer: {
        flexDirection: 'row',
        marginTop: responsiveWidth('1.5'),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: responsiveWidth('4'),
        right: responsiveWidth('4'),
        backgroundColor: color.white,
        borderColor: color.lightgray
    }
})