import React, { useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { AppIcon } from '../../../common';
import { color, responsiveWidth } from '../../../constant/theme';

const HomeMenu = ({ height }) => {
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Menu
                visible={visible}
                anchor={<TouchableOpacity
                    onPress={showMenu}
                    style={{ padding: responsiveWidth('1%') }}
                >
                    <AppIcon name={'bars'} color={color.white} size={responsiveWidth('5%')} />
                </TouchableOpacity>}
                onRequestClose={hideMenu}
                style={{
                    backgroundColor: 'red',
                    height: '100%',
                    // left: responsiveWidth('90'),
                    width: responsiveWidth('60'),
                    bottom: -height,
                }}
            >
                <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
                <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>

            </Menu>
        </View>
    );
}

export { HomeMenu }