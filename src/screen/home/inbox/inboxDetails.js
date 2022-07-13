// react-native-swipe-list-view
import moment from 'moment';
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Header } from '../../../common';
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../../constant/theme'

import globleString from '../../../language/localized';
const strings = globleString.strings

class InboxDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { title, details } = this.props.route.params
        return (
            <View style={styles.container}>
                <Header
                    title={title}
                    showRightIcon={true}
                    showBack={true}
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, padding: responsiveWidth('4') }}
                >
                    <Text style={[styles.titleStyle, { flex: 1 }]}>{details?.type}</Text>
                    <Text style={[styles.basicTextStyle, {
                        color: color.gray2
                    }]}>{`Expire: ${moment().format('DD/MM/YYYY')}`}</Text>
                    <Text style={[styles.titleStyle, { flex: 1, fontWeight: 'normal', paddingTop: responsiveWidth('4') }]}>{details?.title}</Text>
                    <Text style={[styles.basicTextStyle, { paddingVertical: responsiveWidth('3') }]}>{details?.desc}</Text>
                    <View style={styles.campaignContainer}>
                        <Text style={[styles.basicTextStyle, { paddingVertical: responsiveWidth('3') }]}>{'Campaign here'}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default InboxDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    titleStyle: {
        color: color.black,
        fontSize: fontSize.regular,
        fontWeight: 'bold',
    },
    basicTextStyle: {
        color: color.black,
        fontSize: fontSize.mini,
    },
    campaignContainer: {
        backgroundColor: color.lightgray,
        height: responsiveHeight('57'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveWidth("2"),
        marginBottom: responsiveWidth("8"),
    }
})