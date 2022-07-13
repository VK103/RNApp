import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../constant/theme';
import { AppIcon, Header } from '../../common'

import globleString from '../../language/localized';
import moment from 'moment';
import { HomeMenu } from './dropdown/homeMenu';
const strings = globleString.strings

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxList: [
                {
                    title: 'Shop4You', date: new Date(), isRead: false,
                },
                {
                    title: 'Bio Creme', date: new Date(), isRead: true,
                },
                {
                    title: 'Womens Clothing', date: new Date(), isRead: true,
                },
                {
                    title: 'GroceryWeekley', date: new Date(), isRead: false,
                },
                {
                    title: 'Daily Beauty', date: new Date(), isRead: false,
                },
            ],
            headerHeight: 50
        }
    }
    render() {
        const { inboxList, headerHeight } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={strings.AppName}
                    // rightContainer={<HomeMenu height={headerHeight} />}
                    showRightIcon={true}
                />
                <FlatList
                    data={inboxList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    this.props.navigation.navigate('InboxList', {
                                        title: item.title
                                    })
                                }}
                                activeOpacity={0.6}
                            >
                                <Text style={styles.dateTextStyle}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                                <View style={styles.subContainer}>
                                    <Text style={styles.titleStyle}>{item.title}</Text>
                                    <AppIcon
                                        name={item.isRead ? "envelope-open" : "envelope"}
                                        solid={!item.isRead}
                                        size={responsiveWidth('6')}
                                    />
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
                    }}
                />
            </View>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    itemContainer: {
        paddingHorizontal: responsiveWidth('4'),
        paddingTop: responsiveWidth('2'),
        paddingBottom: responsiveWidth("4"),
        borderBottomColor: color.lightgray,
        borderBottomWidth: 1
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

    }
})