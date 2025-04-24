import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {admobs} from '../utils';

export default function BannerSmallAd({style, size}) {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={admobs.banner}
        size={size ?? BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
