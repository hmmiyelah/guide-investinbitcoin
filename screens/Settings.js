import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
  Share,
} from 'react-native'
import global from '../global.js'
//import messaging from '@react-native-firebase/messaging';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  AdBadge,
} from 'react-native-admob-native-ads'
import AppLovinMAX from 'react-native-applovin-max'
import { admobs, applovin } from '../utils/index.js'
import BannerSmallAd from '../components/BannerSmallAd.js'
import NativeBigAd from '../components/NativeBigAd.js'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allowNotifications: false,
    }
  }

  componentDidMount() {
    readBoolean('allow_notifications', true, (allowNotifications) => {
      ;(async () => {
        await this.setState({ allowNotifications: allowNotifications })
      })()
    })
  }

  openHowToPage() {
    this.props.navigation.navigate('HowTo')
  }

  contactUs() {
    Linking.openURL('mailto:' + cs_email)
  }

  moreApps() {
    Linking.openURL(DEVELOPER_HOME)
  }

  openAbout() {
    this.props.navigation.navigate('About')
  }

  rateUs() {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.al2.whatisbitcoin.treading.bullish.crypto.bitcoin'
    )
  }

  async share() {
    try {
      const result = await Share.share({ message: string.share_text })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
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
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
            {string.settings}
          </Text>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('Settings')}
          ></View>
        </View>
        <ScrollView style={{ flex: 1, marginTop: 52, padding: 24 }}>
          <Text style={{ color: '#adadad', fontSize: 15, fontStyle: 'italic' }}>
            {string.notification}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
              {string.allow_notifications}
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={this.state.allowNotifications ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={async () => {
                await this.setState({
                  allowNotifications: !this.state.allowNotifications,
                })
                writeBoolean(
                  'allow_notifications',
                  this.state.allowNotifications,
                  () => {
                    /*if (this.state.allowNotifications) {
										messaging()
			  								.subscribeToTopic('all')
	  										.then(() => console.log('Subscribed to topic!'));
							  		} else {
										messaging()
			  								.unsubscribeFromTopic('all')
						  					.then(() => console.log('Unsubscribed from topic!'));
							  		}*/
                  }
                )
              }}
              value={this.state.allowNotifications}
            />
          </View>
          {/* <Text
            style={{
              color: '#adadad',
              fontSize: 15,
              marginTop: 24,
              fontStyle: 'italic',
            }}
          >
            {string.help}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
            onPress={() => this.openHowToPage()}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
              {string.how_to_use}
            </Text>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../assets/images/right.png')}
                style={{ width: 13, height: 13 }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#FFFFFFAA',
              marginTop: 8,
              marginLeft: 4,
              marginRight: 4,
            }}
          />
          <Text
            style={{
              color: '#adadad',
              fontSize: 15,
              marginTop: 24,
              fontStyle: 'italic',
            }}
          >
            {string.contact_us}
          </Text> */}
          {/* <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={() => this.contactUs()}
          >
            <Image
              source={require('../assets/images/email.png')}
              style={{ width: 18, height: 18 }}
              resizeMode='contain'
            />
            <Text style={{ color: '#FFFFFF', fontSize: 15, marginLeft: 16 }}>
              luckynine.cs@gmail.com
            </Text>
          </TouchableOpacity> */}
          {/* <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#FFFFFFAA',
              marginTop: 16,
              marginLeft: 4,
              marginRight: 4,
            }}
          />
          <Text
            style={{
              color: '#adadad',
              fontSize: 15,
              marginTop: 24,
              fontStyle: 'italic',
            }}
          >
            {string.about}
          </Text> */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={() => this.openAbout()}
          >
            <Image
              source={require('../assets/images/info.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
            <Text style={{ color: '#FFFFFF', fontSize: 17, marginLeft: 16 }}>
              {string.about}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={() => this.moreApps()}
          >
            <Image
              source={require('../assets/images/app.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
            <Text style={{ color: '#FFFFFF', fontSize: 17, marginLeft: 16 }}>
              {string.more_apps}
            </Text>
          </TouchableOpacity> */}
          <Text
            style={{
              color: '#adadad',
              fontSize: 15,
              marginTop: 24,
              fontStyle: 'italic',
            }}
          >
            {string.share}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={() => this.rateUs()}
          >
            <Image
              source={require('../assets/images/star.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
            <Text style={{ color: '#FFFFFF', fontSize: 17, marginLeft: 16 }}>
              {string.give_5_stars}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
            }}
            onPress={() => this.share()}
          >
            <Image
              source={require('../assets/images/share.png')}
              style={{ width: 17, height: 17 }}
              resizeMode='contain'
            />
            <Text style={{ color: '#FFFFFF', fontSize: 17, marginLeft: 16 }}>
              {string.share_apps}
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 50 }} />
          <NativeBigAd />
        </ScrollView>
        <BannerSmallAd />
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
      </View>
    )
  }
}
