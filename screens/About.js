import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import global from '../global.js'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webViewWidth: Dimensions.get('window').width - 16 - 16,
      webViewHeight:
        Dimensions.get('window').height - 16 - 16 - 12 - 12 - 52 - 16,
      content:
        "We have created this guide to provide a summary of how to play the best for PUBG game players where every day there are lots of new players who don't know how to play at all.\n\nIf you have any suggestions or criticisms, please email us at luckynine.cs@gmail.com",
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <StatusBar translucent={false} backgroundColor='#00cdac' />
        <LinearGradient
          colors={['#02aab0', '#00cdac']}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}
          useAngle={true}
          angle={90}
        />
        <Image
          source={require('../assets/images/bg01.png')}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}
          resizeMode='cover'
        />
        <View
          style={{
            width: this.state.webViewWidth,
            height: this.state.webViewHeight,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            margin: 16,
            padding: 12,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          <Text
            contentWidth={this.state.webViewWidth}
            style={{ color: '#000000', fontSize: 16 }}
          >
            {this.state.content}
          </Text>
        </View>
      </View>
    )
  }
}
