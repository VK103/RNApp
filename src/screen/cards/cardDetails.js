import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, CardTextbox, Header } from '../../common'
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { cardName, holderName, cardNumber, cardDate } = this.props.route.params

        return (
            <View style={styles.container}>
                <Header
                    title={cardName}
                    showBack
                    showRightIcon
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.textBoxStyle}>{cardName}</Text>
                    <View style={styles.cardImageStyle}></View>
                    <CardTextbox
                        container={{
                            borderTopWidth: 2,
                            borderTopColor: color.backGroundGray,
                        }}
                        value={cardName}
                        title={strings.CardName}
                        editable={false}
                    />
                    <CardTextbox
                        value={holderName}
                        title={strings.CardHolder}
                        editable={false}
                    />
                    <CardTextbox
                        value={cardNumber}
                        title={strings.CardNumber}
                        editable={false}
                    />
                    <CardTextbox
                        value={cardDate}
                        title={strings.ExpiryDate}
                        editable={false}
                    />
                    <Button
                        title={strings.DeleteCard}
                        container={styles.buttonContainer}
                        titleStyle={{ paddingHorizontal: responsiveWidth('6'), color: color.black }}
                    // onPress={() => this.props.navigation.navigate('ConfirmLogin')}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default CardDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    textBoxStyle: {
        flex: 1,
        textAlign: 'center',
        padding: responsiveWidth('4'),
        fontSize: fontSize.large,
        fontWeight: 'bold',
        paddingVertical: responsiveWidth('5')
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: responsiveWidth('4'),
        marginVertical: responsiveWidth('6'),
        borderColor: color.lightgray,
        backgroundColor: color.white,
    },
    cardImageStyle: {
        height: responsiveHeight("20"),
        backgroundColor: color.lightgray,
        marginHorizontal: responsiveWidth('4'),
        borderRadius: responsiveWidth("4"),
        marginBottom: responsiveWidth('6')
    }
})