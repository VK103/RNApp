import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { icons } from '../../assets';
import { AppIcon, Header } from '../../common';
import { color, fontSize, responsiveWidth } from '../../constant/theme'
import { CardItem } from './component/cardItem';

import globleString from '../../language/localized';
const strings = globleString.strings

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsList: [
                { title: 'Loyalty cards', iconName: icons.icLoyaltyCards, id: 1 },
                { title: 'Stamp cards', iconName: icons.icStampCard, id: 2 },
            ]
        }
    }
    render() {
        const { cardsList } = this.state
        return (
            <View style={styles.container}>
                <Header
                    title={strings.AppName}
                    showRightIcon={true}
                />
                <FlatList
                    data={cardsList}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={({ item, index }) => {
                        return (
                            <CardItem
                                title={item.title}
                                source={item.iconName}
                                onPress={() => this.props.navigation.navigate('ActiveCards', { details: item })}
                            />
                        )
                    }}
                />
            </View>
        )
    }
}

export default Cards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    }
})