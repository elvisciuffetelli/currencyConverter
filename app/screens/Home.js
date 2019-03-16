import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { connectAlert } from '../components/Alert';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handlePressBaseCurrency = this.handlePressBaseCurrency.bind(this);
    this.handlePressQuoteCurrency = this.handlePressQuoteCurrency.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSwapCurrency = this.handleSwapCurrency.bind(this);
    this.handleOptionsPress = this.handleOptionsPress.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getInitialConversion());
  }

  componentWillReceiveProps(nextProps) {
    const { currencyError, alertWithType } = this.props;
    if (nextProps.currencyError && nextProps.currencyError !== currencyError) {
      alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  handlePressBaseCurrency() {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  }

  handlePressQuoteCurrency() {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  }

  handleTextChange(amount) {
    const { dispatch } = this.props;
    dispatch(changeCurrencyAmount(amount));
  }

  handleSwapCurrency() {
    const { dispatch } = this.props;
    dispatch(swapCurrency());
  }

  handleOptionsPress() {
    const { navigation } = this.props;
    navigation.navigate('Options');
  }

  render() {
    const {
      baseCurrency,
      quoteCurrency,
      amount,
      conversionRate,
      isFetching,
      lastConvertedDate,
      primaryColor,
    } = this.props;
    let quotePrice = (amount * conversionRate).toFixed(2);

    if (isFetching) {
      quotePrice = '...';
    }

    return (
      <Container backgroundColor={primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={primaryColor} />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={primaryColor}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            editable={false}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            textColor={primaryColor}
          />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            date={lastConvertedDate}
            conversionRate={conversionRate}
          />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  baseCurrency: PropTypes.string,
  quoteCurrency: PropTypes.string,
  amount: PropTypes.number,
  conversionRate: PropTypes.number,
  isFetching: PropTypes.bool,
  lastConvertedDate: PropTypes.object,
  primaryColor: PropTypes.string,
  alertWithType: PropTypes.func,
  currencyError: PropTypes.string,
};

const mapStateToProps = (state) => {
  // state.currencies comes from redux state
  // and we must access baseCurrencies since we use combineReducers
  const { baseCurrency, quoteCurrency, amount } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
