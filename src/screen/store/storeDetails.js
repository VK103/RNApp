import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { AppIcon, Header } from '../../common'
import { color, fontSize, responsiveWidth } from '../../constant/theme'
import { AirbnbRating } from 'react-native-ratings';

import globleString from '../../language/localized';
import { SwipeableItem } from '../home/inbox/component/swipeableItem';
import { icons } from '../../assets';
import { CardItem } from '../cards/component/cardItem';
const strings = globleString.strings

const ActionButton = ({ onPress, source, title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{ alignItems: 'center', marginHorizontal: responsiveWidth('4') }}
        >
            <View style={styles.iconContainer}>
                <Image
                    source={source}
                    style={styles.iconStyle}
                />
            </View>
            <Text style={styles.actionTitleStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

const SectionButton = ({ onPress, isActive, title }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={{
                borderBottomWidth: 2,
                borderColor: isActive ? color.black : color.white,
                marginRight: responsiveWidth('4')
            }}>
                <Text style={[styles.sectionTitleStyle, {
                    color: isActive ? color.black : color.blue,
                    fontWeight: isActive ? 'bold' : 'normal'
                }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

class StoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: [
                { id: 1 }, { id: 2 }, { id: 3 }
            ],
            activeindex: 0,
            activeSectionIndex: 0,
            itemList: [
                {
                    title: 'Sign up for the event now!',
                    type: 'Reminder',
                    desc: 'We still need your RSVP. We want to invite y night with red carpet, goodie bags, DJ and th autumn collection.',
                },
            ],
            timeList: [
                { day: 'Monday', time: '08-16' },
                { day: 'Tuesday', time: '08-16' },
                { day: 'Wednesday', time: '08-16' },
                { day: 'Thursday', time: '08-16' },
                { day: 'Friday', time: '08-16' },
                { day: 'Saturday', time: '08-16' },
                { day: 'Sunday', time: 'Closed' },
            ],
            cardsList: [
                { title: 'Loyalty cards', iconName: icons.icLoyaltyCards },
                { title: 'Stamp cards', iconName: icons.icStampCard },
            ],
            showTimeList: false,
            showRating: false,
            txtRatingMessage: ''
        }
    }

    render() {
        const { details } = this.props.route.params
        const { imageList, activeindex, activeSectionIndex, itemList, timeList, showTimeList, showRating, txtRatingMessage, cardsList } = this.state

        return (
            <View style={styles.container}>
                <Header
                    title={details?.title}
                    showBack
                    showRightIcon
                />
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <ScrollView
                        horizontal={true}
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        style={{ marginHorizontal: responsiveWidth('4'), paddingTop: responsiveWidth('4') }}
                    >
                        {imageList.map((i, index) => {
                            return (
                                <View style={styles.imageContainer}>
                                    <Text>Store Image here</Text>
                                </View>
                            )
                        })}
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {imageList.map((i, index) => {
                            return (
                                <View style={[styles.dotContainer, {
                                    backgroundColor: activeindex == index ? color.black : color.lightgray,
                                }]} />
                            )
                        })}
                    </View>

                    <View style={styles.ratingContainer}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.setState({ showRating: !showRating })}
                            activeOpacity={0.5}
                        >
                            <AirbnbRating
                                count={5}
                                defaultRating={4}
                                size={responsiveWidth('5.5')}
                                showRating={false}
                                selectedColor={color.themeOrnage}
                                unSelectedColor={color.lightgray}
                                starContainerStyle={{ alignSelf: 'flex-start' }}
                                isDisabled={true}
                            />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'center' }}
                                activeOpacity={0.5}
                                onPress={() => this.setState({ showTimeList: !showTimeList })}
                            >
                                <Text style={[styles.timeStyle, { flex: 1 }]}>{`${strings.Open} - `}
                                    <Text style={{ color: color.black, fontWeight: 'normal' }}>{`${strings.Closing} 16`}</Text>
                                </Text>
                                <AppIcon
                                    name={showTimeList ? 'chevron-up' : 'chevron-down'}
                                    size={responsiveWidth('6')}
                                    type={'material-community'}
                                    style={{
                                        bottom: responsiveWidth('1')
                                    }}
                                />
                            </TouchableOpacity>
                            {showTimeList ? timeList.map((i, index) => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.actionTitleStyle, { paddingTop: 3, color: color.black, flex: 1 }]}>{i?.day}</Text>
                                        <Text style={[styles.actionTitleStyle, { paddingTop: 3, color: color.black }]}>{i?.time}</Text>
                                    </View>
                                )
                            }) : null}
                        </View>
                    </View>

                    {showRating ? <View style={styles.rateUsContainer}>
                        <Text style={[styles.timeStyle, {
                            color: color.black, fontWeight: 'normal'
                        }]}>{`${strings.RateUs}`}</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={0}
                            size={responsiveWidth('12')}
                            showRating={false}
                            selectedColor={color.themeOrnage}
                            unSelectedColor={color.lightgray}
                            starContainerStyle={{ alignSelf: 'flex-start', paddingVertical: responsiveWidth('2') }}
                        />
                        <TextInput
                            style={styles.textboxContainer}
                            placeholder={strings.RatePlaceholder}
                            placeholderTextColor={color.gray}
                            value={txtRatingMessage}
                            onChangeText={txt => this.setState({ txtRatingMessage: txt })}
                        />
                    </View> : null}

                    <View style={styles.actionContainer}>
                        <ActionButton
                            title={strings.Call}
                            source={icons.icCall}
                        />
                        <ActionButton
                            title={strings.Email}
                            source={icons.icEmail}
                        />
                        <ActionButton
                            title={strings.Directions}
                            source={icons.icDirection}
                        />
                        <ActionButton
                            title={strings.Website}
                            source={icons.icWebsite}
                        />
                    </View>

                    <View style={styles.sectionContainer}>
                        <SectionButton
                            title={strings.Info}
                            isActive={activeSectionIndex === 0}
                            onPress={() => { this.setState({ activeSectionIndex: 0 }) }}
                        />
                        <SectionButton
                            title={strings.Inbox}
                            isActive={activeSectionIndex === 1}
                            onPress={() => { this.setState({ activeSectionIndex: 1 }) }}
                        />
                        <SectionButton
                            title={strings.Cards}
                            isActive={activeSectionIndex === 2}
                            onPress={() => { this.setState({ activeSectionIndex: 2 }) }}
                        />
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.followContainer}
                        >
                            <Text style={styles.followTitle}>{strings.Followed}</Text>
                        </TouchableOpacity>
                    </View>

                    {activeSectionIndex == 0 ?
                        <Text style={styles.infoTextStyle}>{`Shop4You is a one-stop solution for all your marketing needs! But it does not stop at that! \n\nOur varied widgets, apart from helping you market your product better, help you improve your customers' overall experience as well! From easy customer opt-ins to insights that help you improve your product, we have you covered!`}</Text>
                        : null}

                    {activeSectionIndex == 1 ? itemList.map((item, index) => {
                        return <SwipeableItem
                            key={index.toString()}
                            data={item}
                            onPress={() => {
                                this.props.navigation.navigate('InboxDetails', {
                                    title: item?.title || '',
                                    details: item
                                })
                            }}
                            disableRightSwipe={true}
                            disableLeftSwipe={true}
                        // frontContainer={{ paddingHorizontal: 0 }}
                        />
                    }) : null}

                    {activeSectionIndex === 2 ? cardsList.map((item, index) => {
                        return (
                            <CardItem
                                key={index.toString()}
                                title={item.title}
                                source={item.iconName}
                            />
                        )
                    }) : null}

                    <View style={{ height: responsiveWidth('10') }} />
                </ScrollView>
            </View>
        )
    }
}

export default StoreDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    imageContainer: {
        backgroundColor: color.lightgray,
        height: responsiveWidth('40'),
        width: '101%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsiveWidth('2')
    },
    dotContainer: {
        height: responsiveWidth('2'),
        width: responsiveWidth('2'),
        borderRadius: responsiveWidth('2'),
        marginHorizontal: responsiveWidth('1'),
        marginVertical: responsiveWidth('2')
    },
    timeStyle: {
        fontSize: fontSize.regularx,
        color: color.green,
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        paddingVertical: responsiveWidth('2'),
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray,
        paddingHorizontal: responsiveWidth('4')
    },
    actionContainer: {
        paddingVertical: responsiveWidth('4'),
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray,
        flexDirection: 'row',
        // paddingHorizontal: responsiveWidth('4')
        alignItems: 'center',
        justifyContent: 'center'

    },
    iconContainer: {
        height: responsiveWidth('10'),
        width: responsiveWidth('10'),
        borderRadius: responsiveWidth('10'),
        borderWidth: 0.5,
        borderColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        height: responsiveWidth('6'),
        width: responsiveWidth('6'),
        resizeMode: 'cover'
    },
    actionTitleStyle: {
        color: color.blue,
        fontSize: fontSize.xxsmall,
        paddingTop: responsiveWidth('3')
    },
    sectionContainer: {
        flexDirection: 'row',
        paddingTop: responsiveWidth('4'),
        paddingBottom: responsiveWidth('6'),
        paddingHorizontal: responsiveWidth('4')
    },
    sectionTitleStyle: {
        fontSize: fontSize.regular,
    },
    followTitle: {
        fontSize: fontSize.regular,
        color: color.white,
        fontWeight: 'bold'
    },
    followContainer: {
        backgroundColor: color.themeOrnage,
        paddingHorizontal: responsiveWidth('3'),
        paddingVertical: responsiveWidth('0.5'),
        borderRadius: responsiveWidth('5')
    },
    infoTextStyle: {
        color: color.black,
        fontSize: fontSize.regularx,
        paddingHorizontal: responsiveWidth('4')
    },
    rateUsContainer: {
        paddingVertical: responsiveWidth('2'),
        borderBottomWidth: 1,
        borderBottomColor: color.lightgray,
        paddingHorizontal: responsiveWidth('4')
    },
    textboxContainer: {
        backgroundColor: color.extraLightgray,
        borderBottomColor: color.gray,
        borderBottomWidth: 1.5,
        fontSize: fontSize.regularx,
        padding: responsiveWidth('2')
    },
})