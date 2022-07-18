import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Header } from '../../../common'
import { color, fontSize, responsiveHeight, responsiveWidth } from '../../../constant/theme'

import globleString from '../../../language/localized';
const strings = globleString.strings

class ScanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCaptured: false
        }
    }

    render() {
        const { isCaptured } = this.state

        return (
            <View style={styles.container}>
                <Header
                    title={strings.AddCard}
                    showBack
                    showRightIcon={true}
                />
                <View style={styles.cameraContainer}>
                    <View style={styles.subCameraContainer}></View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={0.7}
                        onPress={() => this.setState({ isCaptured: true })}
                    >
                        <View style={styles.captureButton} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: responsiveWidth('4') }}>
                    {isCaptured ? <View style={styles.optionButtonCOntainer}>
                        <Button
                            title={strings.Retake}
                            container={[styles.flatButtonContainer, { marginVertical: 0 }]}
                            titleStyle={{ color: color.black, paddingHorizontal: responsiveWidth('6') }}
                            onPress={() => this.setState({ isCaptured: false })}
                        />
                        <Button
                            title={strings.Save}
                            titleStyle={{ paddingHorizontal: responsiveWidth('6') }}
                        />
                    </View> : <>
                        <Text style={styles.titleText}>{strings.AddYourCard}</Text>
                        <Text style={styles.basicTextStyle}>{strings.CardDesc}</Text>
                    </>}
                </View>
                <Button
                    title={strings.ManuallyCard}
                    container={styles.flatButtonContainer}
                    titleStyle={{ color: color.black }}
                />
            </View>
        )
    }
}

export default ScanCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    cameraContainer: {
        backgroundColor: color.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: responsiveWidth('8'),
        paddingTop: responsiveWidth('8'),
    },
    subCameraContainer: {
        height: responsiveHeight('20'),
        backgroundColor: color.white,
        width: '100%',
        borderRadius: 10
    },
    buttonContainer: {
        height: responsiveWidth('13'),
        width: responsiveWidth('13'),
        borderRadius: responsiveWidth('13'),
        backgroundColor: color.white,
        marginVertical: responsiveWidth('3'),
        borderWidth: 1,
        borderColor: color.defaultGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captureButton: {
        height: responsiveWidth('11.5'),
        width: responsiveWidth('11.5'),
        borderRadius: responsiveWidth('11.5'),
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.defaultGray
    },
    titleText: {
        fontSize: fontSize.smallx,
        fontWeight: 'bold',
        color: color.black
    },
    basicTextStyle: {
        fontSize: fontSize.regular,
        color: color.black
    },
    flatButtonContainer: {
        backgroundColor: color.white,
        borderColor: color.lightgray,
        alignSelf: 'center',
        marginVertical: responsiveWidth('4')
    },
    optionButtonCOntainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth('8')
    }
})