import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, CardTextbox, Header } from '../../../common'
import { color, fontSize, responsiveWidth } from '../../../constant/theme'

import globleString from '../../../language/localized';
const strings = globleString.strings

class AddCardManually extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtCardName: '',
            txtCardHolderName: '',
            txtCardNumber: '',
            txtCardDate: '',
        }
    }
    render() {
        let isDisabled = true
        const { txtCardName, txtCardHolderName, txtCardNumber, txtCardDate } = this.state

        if (txtCardName && txtCardHolderName && txtCardNumber && txtCardDate) {
            isDisabled = false
        }

        return (
            <View style={styles.container}>
                <Header
                    title={strings.AddCard}
                    showBack
                    showRightIcon
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.textBoxStyle}>{txtCardName.length > 0 ? txtCardName : strings.CardName}</Text>

                    <CardTextbox
                        container={{
                            borderTopWidth: 2,
                            borderTopColor: color.backGroundGray,
                        }}
                        value={txtCardName}
                        title={strings.CardName}
                        onChangeText={txt => this.setState({ txtCardName: txt })}
                    />
                    <CardTextbox
                        value={txtCardHolderName}
                        title={strings.CardHolder}
                        onChangeText={txt => this.setState({ txtCardHolderName: txt })}
                    />
                    <CardTextbox
                        value={txtCardNumber}
                        title={strings.CardNumber}
                        onChangeText={txt => this.setState({ txtCardNumber: txt })}
                    />
                    <CardTextbox
                        value={txtCardDate}
                        title={strings.ExpiryDate}
                        onChangeText={txt => this.setState({ txtCardDate: txt })}
                    />
                    <Button
                        title={strings.AddCard}
                        container={styles.buttonContainer}
                        titleStyle={{ paddingHorizontal: responsiveWidth('6') }}
                        disabled={isDisabled}
                        onPress={() => this.props.navigation.navigate('CardDetails', {
                            cardName: txtCardName,
                            holderName: txtCardHolderName,
                            cardNumber: txtCardNumber,
                            cardDate: txtCardDate
                        })}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default AddCardManually

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
    }
})