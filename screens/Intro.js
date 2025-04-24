import React, {Component} from 'react';
import {Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import {admobs, colors} from '../utils';
import {AppOpenAd} from 'react-native-google-mobile-ads';

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      nextText: string.done,
      indicator1BgColor: '#C4C4C4FF',
      indicator2BgColor: '#C4C4C400',
      appOpen: undefined,
    };
    this.viewPager = React.createRef();
  }

  componentDidMount() {
    const appOpenAd = AppOpenAd.createForAdRequest(admobs.appOpen);
    appOpenAd.load();
    this.setState({appOpen: appOpenAd});
  }

  async goToNextPage() {
    const {appOpen} = this.state;
    if (appOpen?.loaded) {
      appOpen?.show().then(() => {
        const appOpenAd = AppOpenAd.createForAdRequest(admobs.appOpen);
        appOpenAd.load();
        this.setState({appOpen: appOpenAd});
      });
    }

    this.props.navigation.navigate('Guide', {
      kind: 'newbie',
    });
  }

  setIndicatorColor() {
    if (this.state.currentPage == 0) {
      this.setState({
        nextText: string.next,
        indicator1BgColor: '#C4C4C4FF',
        indicator2BgColor: '#C4C4C400',
      });
    } else if (this.state.currentPage == 1) {
      this.setState({
        nextText: string.done,
        indicator1BgColor: '#C4C4C400',
        indicator2BgColor: '#C4C4C4FF',
      });
    }
  }

  render() {
    return (
      <>
        <Image
          source={require('../assets/images/intro.png')}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 50,
            right: 8,
            paddingHorizontal: 30,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.main,
            borderRadius: 999,
          }}
          onPress={() => this.goToNextPage()}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 15,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            {this.state.nextText}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}
