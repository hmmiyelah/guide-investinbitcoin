import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import PhotoManipulator from 'react-native-photo-manipulator'
import RNFetchBlob from 'react-native-fetch-blob'
import RNReactNativeSharingWinstagram from '@micabe/react-native-share-instagram'
import Share from 'react-native-share'
import ProgressDialog from 'react-native-progress-dialog'
import AppLovinMAX from 'react-native-applovin-max'

import { applovin } from '../utils'
import BannerSmallAd from '../components/BannerSmallAd'

export default class GuideContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: this.props.route.params['index'],
      name: this.props.route.params['name'],
      kind: this.props.route.params['kind'],
      showSource: this.props.route.params['showSource'],
      description: this.props.route.params['description'],
      showAd: parseInt(this.props.route.params['show_ad']),
      imageWidth: Dimensions.get('window').width - 8 - 8,
      steps: [],
      currentPage: 0,
      progressVisible: false,
      click: 0,
    }
    this.viewPager = React.createRef()
  }

  componentDidMount() {
    log('STEPS NAME:')
    log(this.state.name)
    this.getStepsByName(this.state.name)
  }

  componentDidUpdate(prevProps, prevState) {
    const oldClick = prevState.click
    const currentClick = this.state.click
    const currentIndex = this.state.index

    if (oldClick !== currentClick && currentClick === 1 && currentIndex === 0) {
      AppLovinMAX.showInterstitial(applovin.interstitial)
    } else if (
      oldClick !== currentClick &&
      currentClick === 2 &&
      currentIndex !== 0
    ) {
      AppLovinMAX.showInterstitial(applovin.interstitial)
    } else if (
      oldClick !== currentClick &&
      currentClick % 2 === 1 &&
      currentIndex === 0
    ) {
      AppLovinMAX.showInterstitial(applovin.interstitial)
    } else if (
      oldClick !== currentClick &&
      currentClick % 2 === 0 &&
      currentIndex !== 0
    ) {
      AppLovinMAX.showInterstitial(applovin.interstitial)
    }
  }

  async share(social) {
    await this.setState({ progressVisible: true })
  }

  shareFacebook() {
    let content =
      this.state.description +
      ' (' +
      (this.state.currentPage + 1) +
      ')' +
      ': ' +
      this.state.steps[this.state.currentPage]['content']
    if (content.includes('\n\n')) {
      content =
        content.substr(0, content.indexOf('\n\n')).replace(/(?:@)/g, ' ') +
        '\n\nDOWNLOAD FOR FREE: https://play.google.com/l9.pubgmobilebattlegroundlite.guidepubgmbesttipstricks'
    }
    Linking.openURL(
      'https://web.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fluckynineapps.com&quote=' +
        content
    )
  }

  shareTwitter() {
    let content =
      this.state.description +
      ' (' +
      (this.state.currentPage + 1) +
      ')' +
      '\n\n' +
      this.state.steps[this.state.currentPage]['content']
    if (content.includes('\n\n')) {
      content =
        content.substr(0, content.indexOf('\n\n')).replace(/(?:@)/g, ' ') +
        '\n\nDOWNLOAD FOR FREE: https://play.google.com/l9.pubgmobilebattlegroundlite.guidepubgmbesttipstricks'
    }
    Linking.openURL('https://twitter.com/intent/tweet?text=' + content)
  }

  async shareInstagram() {
    await this.setState({ progressVisible: true })
    let content = this.state.steps[this.state.currentPage]['content']
    if (content.includes('\n\n')) {
      content =
        content.substr(0, content.indexOf('\n\n')).replace(/(?:@)/g, ' ') +
        '\n\nDOWNLOAD FOR FREE: https://play.google.com/l9.pubgmobilebattlegroundlite.guidepubgmbesttipstricks'
    }
    const image =
      'https://www.iliketowastemytime.com/system/files/three-peaks-italy-hd-wallpaper-by-severin-hoin-iltwmt.jpg?download=1'
    let contents = content.split('\n')
    let totalHeight = 0
    for (let i = 0; i < contents.length; i++) {
      totalHeight += 70
    }
    const texts = [
      {
        position: { x: 100, y: 1500 - totalHeight - 100 },
        text:
          this.state.description + ' (' + (this.state.currentPage + 1) + ')',
        textSize: 90,
        color: '#FFFFFF',
      },
      {
        position: { x: 100, y: 1500 - totalHeight - 100 },
        text:
          this.state.description + ' (' + (this.state.currentPage + 1) + ')',
        textSize: 90,
        color: '#FFFFFF',
        thickness: 2,
      },
    ]
    let y = 1500 - totalHeight
    for (let i = 0; i < contents.length; i++) {
      texts.push({
        position: { x: 100, y: y },
        text: contents[i],
        textSize: 60,
        color: '#FFFFFF',
      })
      texts.push({
        position: { x: 100, y: y },
        text: contents[i],
        textSize: 60,
        color: '#FFFFFF',
        thickness: 2,
      })
      y += 70
    }
    PhotoManipulator.printText(require('../assets/images/bg.jpg'), texts).then(
      (path) => {
        log(`Result image path: ${path}`)
        const fs = RNFetchBlob.fs
        fs.readFile(path, 'base64').then((data) => {
          this.setState({ progressVisible: false })
          RNReactNativeSharingWinstagram.shareWithInstagram(
            uuidv4(),
            data,
            (message) => {},
            (error) => {
              alert(error.message)
            }
          )
        })
      }
    )
  }

  shareWA() {
    let content = this.state.steps[this.state.currentPage]['content']
    if (content.includes('\n\n')) {
      content =
        content.substr(0, content.indexOf('\n\n')).replace(/(?:@)/g, ' ') +
        '\n\nDOWNLOAD FOR FREE: https://play.google.com/l9.pubgmobilebattlegroundlite.guidepubgmbesttipstricks'
    }

    Linking.openURL(
      'whatsapp://send?text=' +
        this.state.description +
        ' (' +
        (this.state.currentPage + 1) +
        '):\n\n' +
        content
    )
  }

  async shareOther() {
    let content = this.state.steps[this.state.currentPage]['content']
    if (content.includes('\n\n')) {
      content =
        content.substr(0, content.indexOf('\n\n')).replace(/(?:@)/g, ' ') +
        '\n\nDOWNLOAD FOR FREE: https://play.google.com/l9.pubgmobilebattlegroundlite.guidepubgmbesttipstricks'
    }
    await Share.open({
      title: string.text3,
      message:
        this.state.description +
        ' (' +
        (this.state.currentPage + 1) +
        '): ' +
        content,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        err && console.log(err)
      })
  }

  getStepsByName(name) {
    let contents = CONTENTS[this.state.kind]
    for (let i = 0; i < contents.length; i++) {
      if (contents[i]['name'] == this.state.name) {
        this.setState({ steps: contents[i]['contents'] })
        break
      }
    }
  }

  renderSteps = () => {
    return this.state.steps.map((e, idx) => {
      return (
        <ScrollView
          key={idx}
          style={{}}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: e.poster }}
            style={{
              marginTop: 10,
              marginLeft: 8,
              marginRight: 8,
              width: this.state.imageWidth,
              height: 200,
            }}
            resizeMode='stretch'
          />

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 17,
              alignSelf: 'center',
              textAlign: 'justify',
              marginTop: 8,
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            {e.content.replace(/(?:@)/g, ' ')}
          </Text>

          {e.image && (
            <Image
              source={{ uri: e.image }}
              style={{
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                width: this.state.imageWidth,
                height: 200,
              }}
              resizeMode='stretch'
            />
          )}

          {e.image2 && (
            <Image
              source={{ uri: e.image2 }}
              style={{
                marginTop: 10,
                marginLeft: 8,
                marginRight: 8,
                width: this.state.imageWidth,
                height: 200,
              }}
              resizeMode='stretch'
            />
          )}

          {idx === this.state.steps.length - 1 &&
            this.state.showSource === 'show' && (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontStyle: 'italic',
                  marginLeft: 10,
                  textDecorationLine: 'underline',
                  lineHeight: 20,
                  marginTop: 10,
                }}
                onPress={() =>
                  Linking.openURL(
                    'https://cryptomaniaks.com/how-to-invest-in-bitcoin'
                  )
                }
              >
                Source: https://cryptomaniaks.com/how-to-invest-in-bitcoin
              </Text>
            )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                height: 45,
                backgroundColor: '#949393ff',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}
              onPress={() => this.goToPrevPage()}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 17 }}>
                {string.prev}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 45,
                backgroundColor: '#949393ff',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}
              onPress={() => this.goToNextPage()}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 17 }}>
                {string.next}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    })
  }

  async goToPrevPage() {
    this.setState({ click: this.state.click - 1 })

    if (this.state.currentPage > 0) {
      await this.setState({ currentPage: this.state.currentPage - 1 })
    } else {
      await this.setState({ currentPage: this.state.steps.length - 1 })
    }
    this.viewPager.current.setPage(this.state.currentPage)
  }

  async goToNextPage() {
    this.setState({ click: this.state.click + 1 })

    if (this.state.currentPage < this.state.steps.length - 1) {
      await this.setState({ currentPage: this.state.currentPage + 1 })
    } else {
      await this.setState({ currentPage: 0 })
    }
    this.viewPager.current.setPage(this.state.currentPage)
  }

  render() {
    console.log(this.state.click)
    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
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
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: 60,
            backgroundColor: '#1b2229ff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image
              source={require('../assets/images/back.png')}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#FFFFFF', flex: 1 }}>
            {this.state.name}
          </Text>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('Settings')}
          >
            <Image
              source={require('../assets/images/settings_2.png')}
              style={{ width: 20, height: 20 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 24,
            marginTop: 84,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 13 }}>{string.share}</Text>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.shareFacebook()}
          >
            <Image
              source={require('../assets/images/fb.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.shareTwitter()}
          >
            <Image
              source={require('../assets/images/twitter.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.shareInstagram()}
          >
            <Image
              source={require('../assets/images/ig.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.shareWA()}
          >
            <Image
              source={require('../assets/images/wa.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.shareOther()}
          >
            <Image
              source={require('../assets/images/other.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 16, marginLeft: 8, marginRight: 8 }}>
          <ViewPager
            scrollEnabled={false}
            style={{ width: '100%', height: '100%' }}
            initialPage={0}
            ref={this.viewPager}
            onPageSelected={(e) => {
              this.setState({ currentPage: e.nativeEvent.position })
            }}
          >
            {this.renderSteps()}
          </ViewPager>
        </View>
        <BannerSmallAd
          otherStyles={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />

        {/* <NativeAdView
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          adUnitID={admobs.native}
        >
          <View
            style={{
              width: '100%',
              paddingTop: 8,
              paddingBottom: 8,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
              elevation: 12,
            }}
          >
            <AdBadge />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <IconView
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View
                style={{
                  width: '65%',
                  maxWidth: '65%',
                  paddingHorizontal: 6,
                }}
              >
                <HeadlineView
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}
                />
                <TaglineView
                  numberOfLines={1}
                  style={{
                    fontSize: 11,
                  }}
                />
                <AdvertiserView
                  style={{
                    fontSize: 10,
                    color: 'gray',
                  }}
                />
              </View>

              <CallToActionView
                style={{
                  height: 45,
                  paddingHorizontal: 12,
                  backgroundColor: 'purple',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  elevation: 10,
                }}
                textStyle={{ color: 'white', fontSize: 14 }}
              />
            </View>
          </View>
        </NativeAdView> */}

        <ProgressDialog
          loaderColor='#1b2229'
          visible={this.state.progressVisible}
        />
      </View>
    )
  }
}
