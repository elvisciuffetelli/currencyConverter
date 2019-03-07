import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, StatusBar, Platform, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  constructor(props) {
    super(props);

    this.handleThemesPress = this.handleThemesPress.bind(this);
    this.handleSitePress = this.handleSitePress.bind(this);
  }

  handleThemesPress() {
    const { navigation } = this.props;
    navigation.navigate('Themes');
  }

  handleSitePress() {
    const { alertWithType } = this.props;
    // openURL returns a Promise, so we need a catch for errors
    Linking.openURL('https://fixer.io/').catch(() => alertWithType('error', 'Sorry!', "Fixer.io can't be reached right now"));
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          customIcon={<Ionicons name={`${ICON_PREFIX}-arrow-forward`} />}
          color={ICON_COLOR}
          size={ICON_SIZE}
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={<Ionicons name={`${ICON_PREFIX}-link`} />}
          color={ICON_COLOR}
          size={ICON_SIZE}
        />
      </ScrollView>
    );
  }
}

Options.propTypes = {
  navigation: PropTypes.object,
  alertWithType: PropTypes.func,
};

export default connectAlert(Options);
