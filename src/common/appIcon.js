import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../constant/theme';

const AppIcon = (props) => {
    if (props.type === 'material') {
        return (
            <MaterialIcon
                style={props.style}
                name={props.name || 'home'}
                size={props.size || 25}
                color={props.color || color.black}
                onPress={props.onPress}
                onLongPress={props.onLongPress}
            />
        );
    } else if (props.type === 'material-community') {
        return (
            <MaterialCommunityIcons
                style={props.style}
                name={props.name || 'home'}
                size={props.size || 25}
                color={props.color || color.black}
                onPress={props.onPress}
            />
        );
    } else if (props.type === 'Feather') {
        return (
            <FeatherIcon
                style={props.style}
                name={props.name || 'home'}
                size={props.size || 25}
                color={props.color || color.black}
                onPress={props.onPress}
            />
        );
    } else {
        return (
            <Icon
                style={props.style}
                solid={props.solid || false}
                name={props.name || 'home'}
                size={props.size || 25}
                color={props.color || color.black}
                onPress={props.onPress}
            />
        );
    }
};

export { AppIcon };
