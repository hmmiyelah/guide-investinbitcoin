import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import global from '../global.js'

export default class HowTo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webViewWidth: Dimensions.get('window').width - 16 - 16,
      webViewHeight:
        Dimensions.get('window').height - 16 - 16 - 12 - 12 - 52 - 16,
      content:
        'This app is a guide app for playing PUBG game. Get tricks and tips how to win every level in the game, and be a champion over your friends!\n\nThis app includes images that can make your gaming life easier, and the tutorial can be read clearly, so you will win easily without any help from your friends.\n\nShow it to your friends, and make your friends amazed. Try it now!',
    }
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
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
          <ScrollView>
            <Text
              contentWidth={this.state.webViewWidth}
              style={{ color: '#000000', fontSize: 16 }}
            >
              {this.state.content}
            </Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}
