// react-native-swipe-list-view
import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Header } from '../../../common';
import { color } from '../../../constant/theme'

import globleString from '../../../language/localized';
import { SwipeableItem } from './component/swipeableItem';
const strings = globleString.strings

class InboxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                {
                    title: 'Sign up for the event now!',
                    type: 'Reminder',
                    desc: 'We still need your RSVP. We want to invite y night with red carpet, goodie bags, DJ and th autumn collection.',
                },
                {
                    title: 'Ladies Night',
                    type: 'Invitation',
                    desc: 'We want to invite you to a night with red carpet, goodie bags, DJ and the new autumn collection. We want to invite you to a night with red carpet, goodie bags, DJ and the new autumn collection.',
                }
            ]
        }
    }
    render() {
        const { title } = this.props.route.params
        const { itemList } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={title}
                    showRightIcon={true}
                    showBack={true}
                />
                <FlatList
                    data={itemList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={({ item, index }) => {
                        return <SwipeableItem
                            data={item}
                            onPress={() => {
                                this.props.navigation.navigate('InboxDetails', {
                                    title: title,
                                    details: item
                                })
                            }}
                        />
                    }}
                />
            </View>
        )
    }
}

export default InboxList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    textStyle: {
        color: color.black
    }
})