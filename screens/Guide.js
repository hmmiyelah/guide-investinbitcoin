import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native'
import NativeAdView, {
  IconView,
  HeadlineView,
  TaglineView,
} from 'react-native-admob-native-ads'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
import AppLovinMAX from 'react-native-applovin-max'
import { applovin } from '../utils'

import global from '../global.js'
import BannerSmallAd from '../components/BannerSmallAd'
import { admobs } from '../utils/index.js'
import NativeBigAd from '../components/NativeBigAd'

export default class Guide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kind: this.props.route.params['kind'],
      imageWidth: Dimensions.get('window').width - 12 - 12 - 200,
      categories: [],
      progressVisible: false,
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  async getCategories() {
    if (this.state.kind == 'newbie') {
      await this.setState({ categories: CONTENTS.newbie })
      this.props.navigation.setOptions({ headerTitle: string.newbie_guide })
    } else if (this.state.kind == 'advance') {
      await this.setState({ categories: CONTENTS.advance })
      this.props.navigation.setOptions({ headerTitle: string.advance_guide })
    } else if (this.state.kind == 'pro') {
      await this.setState({ categories: CONTENTS.pro })
      this.props.navigation.setOptions({ headerTitle: string.pro_guide })
    } else if (this.state.kind == 'expert') {
      await this.setState({ categories: CONTENTS.expert })
      this.props.navigation.setOptions({ headerTitle: string.expert_guide })
    }
    let categories = this.state.categories
    for (let i = 0; i < categories.length; i++) {
      categories[i]['index'] = i
      if ((i + 1) % 2 == 0) {
        categories[i]['show_ad'] = true
      } else {
        categories[i]['show_ad'] = false
      }
    }
    for (let i = 0; i < categories.length; i++) {
      categories[i]['type'] = 'guide'
      if ((i + 1) % 3 == 0) {
        categories.splice(i, 0, { type: 'ad' })
      }
    }
  }

  openGuideContent(item, index) {
    console.log(
      index ===
        this.state.categories.filter((cat) => cat.type !== 'ad').length - 1
    )

    readInt('total_button_click', 0, (total) => {
      log('TOTAL BUTTON CLICK: ' + total)
      total++
      writeInt('total_button_click', total)
      if (total > 0 && total % 5 == 0) {
        log('SHOWING AD...')
        AppLovinMAX.showInterstitial(applovin.interstitial)
      }
    })

    this.props.navigation.navigate('GuideContent', {
      name: item.name,
      kind: this.state.kind,
      description: item.description,
      show_ad: item.show_ad ? 1 : 0,
      index,
      showSource:
        index ===
        this.state.categories.filter((cat) => cat.type !== 'ad').length - 1
          ? 'show'
          : 'not-show',
    })
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

        {!this.state.progressVisible && (
          <FlatList
            ListHeaderComponent={
              <>
                <Image
                  source={require('../assets/images/icon1.png')}
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 30,
                  }}
                  resizeMode='contain'
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 8,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.props.navigation.navigate('Settings')}
                >
                  <Image
                    source={require('../assets/images/settings.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </>
            }
            data={this.state.categories.filter((cat) => cat.type !== 'ad')}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingBottom: 62 }}
            renderItem={({ item, index }) => {
              log('IMAGE URL:')
              log(USERDATA_URL + item.img)

              console.log(
                this.state.categories.filter((cat) => cat.type !== 'ad').length
              )

              return (
                <>
                  <View style={{ width: '100%' }}>
                    {item.type == 'guide' && (
                      <TouchableScale
                        style={{
                          height: 120,
                          position: 'relative',
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 8,
                        }}
                        onPress={() => this.openGuideContent(item, index)}
                      >
                        <LinearGradient
                          colors={['#f46b45ff', '#eea849ff']}
                          style={{
                            height: '100%',
                            borderRadius: 8,
                          }}
                        >
                          <View
                            style={{
                              height: '100%',
                              position: 'absolute',
                              left: 24,
                              top: 0,
                              justifyContent: 'center',
                            }}
                          >
                            <Text
                              numberOfLines={2}
                              style={{
                                color: '#FFFFFF',
                                fontSize: 14,
                                width: 140,
                                fontWeight: 'bold',
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{
                                color: '#FFFFFF',
                                fontSize: 12,
                                width: 140,
                              }}
                            >
                              {item.description}
                            </Text>
                          </View>
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            style={{
                              position: 'absolute',
                              left: 190,
                              top: 0,
                              width: this.state.imageWidth,
                              height: 104,
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            }}
                            resizeMode='cover'
                          />
                        </LinearGradient>
                      </TouchableScale>
                    )}
                  </View>
                  {(index + 1) % 2 === 0 &&
                    index + 1 !==
                      this.state.categories.filter((cat) => cat.type !== 'ad')
                        .length && (
                      <View>
                        {index === 1 ? (
                          <NativeBigAd />
                        ) : (
                          <NativeAdView
                            style={{
                              height: 104,
                              position: 'relative',
                              width: '90%',
                              alignSelf: 'center',
                              marginVertical: 5,
                            }}
                            adUnitID={admobs.native}
                          >
                            <View
                              style={{
                                height: 104,
                                width: '100%',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                              }}
                            >
                              <View
                                style={{
                                  height: '100%',
                                  position: 'absolute',
                                  left: 24,
                                  top: 0,
                                  justifyContent: 'center',
                                }}
                              >
                                <HeadlineView
                                  style={{
                                    color: '#000',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    width: 140,
                                  }}
                                  numberOfLines={2}
                                />
                                <TaglineView
                                  numberOfLines={1}
                                  style={{
                                    color: '#000',
                                    fontSize: 15,
                                    width: 140,
                                  }}
                                />
                              </View>
                              <IconView
                                style={{
                                  position: 'absolute',
                                  left: 188,
                                  top: 0,
                                  width: this.state.imageWidth,
                                  height: 104,
                                  borderTopRightRadius: 8,
                                  borderBottomRightRadius: 8,
                                }}
                                resizeMode='contain'
                              />
                              <View
                                style={{
                                  height: 30,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  position: 'absolute',
                                  top: 8,
                                  right: 6,
                                  backgroundColor: 'green',
                                  borderRadius: 4,
                                }}
                              >
                                <Text style={{ color: '#fff', fontSize: 12 }}>
                                  {string.ad}
                                </Text>
                              </View>
                            </View>
                          </NativeAdView>
                        )}
                      </View>
                    )}
                </>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <BannerSmallAd />
      </View>
    )
  }
}
