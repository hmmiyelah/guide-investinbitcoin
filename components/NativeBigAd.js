import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  AdBadge,
  StarRatingView,
} from 'react-native-admob-native-ads'

import { admobs } from '../utils'

const { width } = Dimensions.get('window')

export default function NativeBigAd() {
  //   const nativeAdViewRef = React.useRef()

  //   React.useEffect(() => {
  //     nativeAdViewRef.current?.loadAd()
  //   }, [])

  return (
    <View
      style={{
        borderWidth: 0.25,
        borderColor: '#ccc',
        height: width - 100,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
      }}
    >
      <NativeAdView
        // ref={nativeAdViewRef}
        adUnitID={admobs.native}
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <AdBadge
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginLeft: 5,
            }}
            textStyle={{
              fontSize: 14,
            }}
          />
          <StarRatingView style={{ marginLeft: 40, marginTop: 10 }} />
        </View>

        <View
          style={{
            paddingHorizontal: 6,
            flex: 1,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconView
            style={{
              width: width - 260,
              height: width - 260,
            }}
          />

          <HeadlineView
            style={{
              fontWeight: 'bold',
              fontSize: 14,
            }}
          />
          <TaglineView
            numberOfLines={2}
            style={{
              fontSize: 12,
            }}
          />
          <AdvertiserView
            style={{
              fontSize: 10,
              color: 'gray',
            }}
          />
          {/* </View> */}

          <CallToActionView
            style={{
              height: 40,
              paddingHorizontal: 12,
              backgroundColor: 'purple',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              elevation: 10,
              width: 140,
            }}
            textStyle={{ color: 'white', fontSize: 14 }}
          />
        </View>
      </NativeAdView>
    </View>
  )
}

const styles = StyleSheet.create({})
