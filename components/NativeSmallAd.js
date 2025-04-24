import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
} from 'react-native-google-mobile-ads';
import {admobs} from '../utils';

export default function NativeSmallAd({style}) {
  const [nativeAd, setNativeAd] = useState();

  useEffect(() => {
    NativeAd.createForAdRequest(admobs.native)
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  if (!nativeAd) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <NativeAdView nativeAd={nativeAd}>
        <NativeMediaView style={styles.mediaView} />
        <View style={{height: 5}} />
        <NativeAsset assetType={NativeAssetType.HEADLINE}>
          <Text style={styles.headline}>{nativeAd.headline}</Text>
        </NativeAsset>
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text style={styles.body}>{nativeAd.body}</Text>
        </NativeAsset>
      </NativeAdView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 18,
  },
  mediaView: {
    width: '100%',
    height: 70,
    alignSelf: 'center',
  },
  headline: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  body: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'center',
  },
});
