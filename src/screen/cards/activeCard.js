import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { AppIcon, Header, SearchBox } from '../../common'
import { color, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class ActiveCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtSearch: '',
            activeCardsList: [
                { title: 'OBOS' },
                { title: 'Cars' },
            ],
            activeStampList: [
                { title: 'Active sport' },
                { title: 'CoffeeLover' },
            ],
        }
    }
    render() {
        const { details } = this.props.route.params
        const { txtSearch, activeCardsList, activeStampList } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={details.title}
                    showBack
                    showRightIcon
                />
                <SearchBox
                    value={txtSearch}
                    onChangeText={txt => this.setState({ txtSearch: txt })}
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.titleTextStyle}>{details.id === 1 ? strings.ActiveLoyaltyCard : strings.ActiveStampCard}</Text>
                    {(details.id === 1 ? activeCardsList : activeStampList).map((item, index) => {
                        return (
                            <View style={styles.subContainer}>
                                <Text style={styles.titleStyle}>{item.title}</Text>
                                <AppIcon
                                    name={'chevron-right'}
                                    size={responsiveWidth('6')}
                                    type={'material-community'}
                                    style={{
                                        left: responsiveWidth('2')
                                    }}
                                />
                            </View>
                        )
                    })}
                    <View style={styles.BottomContainer}>
                        <View style={styles.subBottomContainer}>
                            <AppIcon
                                name={'plus'}
                                size={responsiveWidth('8')}
                                color={color.themeGray}
                            />
                            <Text style={styles.buttonTextStyle}>{strings.AddCard}</Text>
                        </View>
                        <View style={styles.subBottomContainer}>
                            <AppIcon
                                name={'search'}
                                size={responsiveWidth('8')}
                                color={color.themeGray}
                            />
                            <Text style={styles.buttonTextStyle}>{strings.SearchCard}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ActiveCards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backGroundGray
    },
    titleTextStyle: {
        paddingHorizontal: responsiveWidth('4'),
        paddingVertical: responsiveWidth('3'),
        color: color.black,
        fontWeight: 'bold',
        fontSize: fontSize.regularx
    },
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
        paddingVertical: responsiveWidth('2')
    },
    BottomContainer: {
        paddingVertical: responsiveWidth('8'),
        paddingHorizontal: responsiveWidth('4'),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subBottomContainer: {
        width: '47.5%',
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveWidth('4'),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.defaultGray
    },
    buttonTextStyle: {
        color: color.black,
        fontWeight: 'bold',
        fontSize: fontSize.mini,
        paddingTop: responsiveWidth('2')
    }
})
