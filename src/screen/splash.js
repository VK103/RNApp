import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { icons } from '../assets'
import { color, responsiveHeight, responsiveWidth } from '../constant/theme'
import * as Progress from 'react-native-progress';

class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={icons.icLogo} style={styles.logoStyle} />
                <Progress.CircleSnail
                    color={[color.black]}
                    size={responsiveWidth('15')}
                />
                <View style={{ height: responsiveHeight('20') }} />
            </View>
        )
    }
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        resizeMode: 'contain',
        width: responsiveWidth("60"),
    }
})