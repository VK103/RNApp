import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, CheckBox, Header, TextBox } from '../../common'
import { color, fontSize, responsiveWidth } from '../../constant/theme'

import globleString from '../../language/localized';
const strings = globleString.strings

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtFirstName: '',
            txtMobile: '',
            txtCountryCode: '',
            isAgree: false,
        }
    }

    render() {
        let isDisabled = true

        const { txtMobile, txtFirstName, txtCountryCode, isAgree } = this.state
        if (txtMobile.length > 0 && txtFirstName.length > 0 && txtCountryCode.length > 0 && isAgree) {
            isDisabled = false
        }

        return (
            <View style={styles.container}>
                <Header
                    title={strings.AppName}
                />
                <View style={{ padding: responsiveWidth('4') }}>
                    <Text style={styles.titleText}>{strings.BMLYsFriends}</Text>
                    <Text style={[styles.descText, { paddingBottom: responsiveWidth('4') }]}>{strings.LoginDesc}</Text>
                    <TextBox
                        title={strings.Firstname}
                        value={txtFirstName}
                        onChangeText={(txt) => { this.setState({ txtFirstName: txt }) }}
                    />
                    <TextBox
                        title={strings.Mobile}
                        value={txtMobile}
                        onChangeText={(txt) => { this.setState({ txtMobile: txt }) }}
                        isMobile={true}
                        mobileValue={txtCountryCode}
                        onChangeMobileText={(txt) => { this.setState({ txtCountryCode: txt }) }}
                        keyboardType="number-pad"
                    />
                    <View style={{ flexDirection: 'row', marginVertical: responsiveWidth('6') }}>
                        <CheckBox
                            isSelected={isAgree}
                            onPress={() => this.setState({ isAgree: !isAgree })}
                        />
                        <Text style={[styles.descText, {
                            textDecorationLine: "underline",
                            marginLeft: responsiveWidth('2')
                        }]}>{strings.TermsConditions}</Text>
                    </View>

                    <Button
                        title={strings.SignUp}
                        container={{ alignSelf: 'flex-end' }}
                        titleStyle={{ paddingHorizontal: responsiveWidth('6') }}
                        disabled={isDisabled}
                        onPress={() => this.props.navigation.navigate('ConfirmLogin')}
                    />

                </View>
            </View>
        )
    }
}

export default Login

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