import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native'
import { Header, SearchBox } from '../../common';
import { homeMenuList } from '../../constant/menuList';
import { color, fontFamily, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
            storesList: [
                {
                    title: "A",
                    data: [
                        { title: 'Active sport' },
                        { title: 'All toys' },
                        { title: 'Attention shoes' },
                        { title: 'AR Fruit' },
                    ]
                },
                {
                    title: "B",
                    data: [
                        { title: 'Bare minerales' },
                        { title: 'Bite' },
                        { title: 'Breads and cookies' },
                        { title: 'Brooms' },
                    ]
                },
                {
                    title: "C",
                    data: [
                        { title: 'Cars' },
                        { title: 'Cool stuff' },
                        { title: 'Corner Plazza' },
                    ]
                },
                {
                    title: "D",
                    data: [{ title: 'D Mart' }]
                },
                {
                    title: "S",
                    data: [{ title: 'Shop4you' }]
                }
            ]
        }
    }

    onPressMenuItem = (data) => {
        if (data?.id == 2 || data?.id == 3) {
            this.props.navigation.navigate('InboxList', {
                title: data?.title
            })
        } else if (data?.id == 5) {
            this.props.navigation.navigate('StoreSettings', {
                title: data?.title
            })
        }
    }

    render() {
        const { txtSearch, storesList } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={strings.AppName}
                    showRightIcon={true}
                    menuList={homeMenuList}
                    onPressItem={(data) => { this.onPressMenuItem(data) }}
                />
                <SearchBox
                    value={txtSearch}
                    onChangeText={txt => this.setState({ txtSearch: txt })}
                />
                <SectionList
                    sections={storesList}
                    stickySectionHeadersEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.itemContainer}
                                onPress={() => { }}
                            >
                                <Text style={styles.itemTextStyle}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.headerText}>{title}</Text>
                    )}
                />
            </View>
        )
    }
}

export default Stores

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.extraLightgray,
    },
    headerText: {
        color: color.black,
        fontSize: fontSize.regular,
        paddingVertical: responsiveWidth('2'),
        fontWeight: 'bold',
        paddingHorizontal: responsiveWidth('4')
    },
    itemContainer: {
        backgroundColor: color.white,
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray
    },
    itemTextStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        paddingVertical: responsiveWidth('2.5'),
        paddingHorizontal: responsiveWidth('4')
    }
})