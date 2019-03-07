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

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = 0.7974;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
  constructor(props) {
    super(props);

    this.handlePressBaseCurrency = this.handlePressBaseCurrency.bind(this);
    this.handlePressQuoteCurrency = this.handlePressQuoteCurrency.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSwapCurrency = this.handleSwapCurrency.bind(this);
    this.handleOptionsPress = this.handleOptionsPress.bind(this);
  }

  handlePressBaseCurrency() {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Base Currency' });
  }

  handlePressQuoteCurrency() {
    const { navigation } = this.props;
    navigation.navigate('CurrencyList', { title: 'Quote Currency' });
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
    const { baseCurrency, quoteCurrency, amount } = this.props;

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            editable={false}
            onPress={this.handlePressQuoteCurrency}
            value={TEMP_QUOTE_PRICE}
          />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            date={TEMP_CONVERSION_DATE}
            conversionRate={TEMP_CONVERSION_RATE}
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
};

const mapStateToProps = (state) => {
  // state.currencies comes from redux state
  // and we must access baseCurrencies since we use combineReducers
  const { baseCurrency, quoteCurrency, amount } = state.currencies;

  return {
    baseCurrency,
    quoteCurrency,
    amount,
  };
};

export default connect(mapStateToProps)(Home);
