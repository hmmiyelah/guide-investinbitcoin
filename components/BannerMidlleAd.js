import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppLovinMAX from 'react-native-applovin-max'

import { admobs, applovin } from '../utils'

export default function BannerMiddleAd() {
  return (
    <View style={styles.container}>
      {/* <PublisherBanner
        adSize='largeBanner'
        adUnitID={admobs.banner}
        testDevices={[PublisherBanner.simulatorId]}
        // onAdFailedToLoad={error => console.error(error)}
        onAppEvent={(event) => console.log(event.name, event.info)}
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
    marginTop: 60,
  },
  banner: {
    // Set background color for banners to be fully functional
    backgroundColor: 'transparent',
    position: 'absolute',
    // width: '100%',
    height: 80,
    bottom: Platform.select({
      ios: 36,
      android: 0,
    }),
  },
})
