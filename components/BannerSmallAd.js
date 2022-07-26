import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import AppLovinMAX from 'react-native-applovin-max'

import { admobs, applovin } from '../utils'

export default function BannerSmallAd({ otherStyles }) {
  return (
    <View style={[styles.container, otherStyles]}>
      {/* <AdMobBanner
        adSize='smartBanner'
        adUnitID={admobs.banner}
        testDevices={[AdMobBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
      /> */}
      <AppLovinMAX.AdView
        adUnitId={applovin.banner}
        adFormat={AppLovinMAX.AdFormat.BANNER}
        style={styles.banner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    // Set background color for banners to be fully functional
    backgroundColor: 'transparent',
    position: 'absolute',
    // width: '100%',
    height: AppLovinMAX.isTablet() ? 90 : 50,
    bottom: Platform.select({
      ios: 36,
      android: 0,
    }),
  },
})
