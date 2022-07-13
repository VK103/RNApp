import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Header, TextBox } from '../../common'
import { color, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class ConfirmLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtCode: '',
        }
    }

    render() {
        const { txtCode } = this.state
        let isDisabled = txtCode.length > 0 ? false : true

        return (
            <View style={styles.container}>
                <Header
                    title={strings.AppName}
                />
                <View style={{ padding: responsiveWidth('4') }}>
                    <Text style={styles.titleText}>{strings.BMLYsFriends}</Text>
                    <Text style={[styles.descText, { paddingBottom: responsiveWidth('4') }]}>{strings.LoginDesc}</Text>
                    <TextBox
                        title={strings.SMSCode}
                        value={txtCode}
                        onChangeText={(txt) => { this.setState({ txtCode: txt }) }}
                        container={{ marginBottom: responsiveWidth('6') }}
                        keyboardType="number-pad"
                    />

                    <Button
                        title={strings.ConfirmSignUp}
                        container={{ alignSelf: 'flex-end' }}
                        titleStyle={{ paddingHorizontal: responsiveWidth('6') }}
                        disabled={isDisabled}
                        onPress={() => { this.props.navigation.navigate('HomeTab') }}
                    />

                </View>
            </View>
        )
    }
}

export default ConfirmLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    titleText: {
        fontSize: fontSize.mediumx,
        color: color.black,
        fontWeight: 'bold',
        paddingVertical: responsiveWidth('4')
    },
    descText: {
        fontSize: fontSize.mini,
        color: color.black,
    },
})