import React, { Component } from "react";
import { LogBox, Platform, View } from "react-native";
import { Provider } from "react-redux";
import { color } from "./src/constant/theme";
import store from "./store";

import globleString from './src/language/localized';
import KeyboardManager from 'react-native-keyboard-manager';
import MainNavigator from "./src/routes/navigations";

const strings = globleString.strings;

class App extends Component {

  componentDidMount() {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();

    strings.setLanguage('en');

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldShowToolbarPlaceholder(false);
    }

  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </View>
    )
  }
}

export default App