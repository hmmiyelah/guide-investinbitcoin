import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import AppLovinMAX from 'react-native-applovin-max'

import { admobs, applovin } from '../utils'

export default function BannerBigAd() {
  return (
    <View style={styles.container}>
      {/* <PublisherBanner
        adSize='mediumRectangle'
        adUnitID={admobs.banner}
        testDevices={[PublisherBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
        onAppEvent={(event) => console.log(event.name, event.info)}
      /> */}
      <AppLovinMAX.AdView
        adUnitId={applovin.banner}
        adFormat={AppLovinMAX.AdFormat.MEDIUM_RECTANGLE}
        style={styles.banner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
