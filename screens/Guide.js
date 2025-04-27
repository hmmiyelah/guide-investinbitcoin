import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import BannerSmallAd from '../components/BannerSmallAd';
import NativeSmallAd from '../components/NativeSmallAd';
import {InterstitialAd} from 'react-native-google-mobile-ads';
import {admobs, colors} from '../utils';

const Guide = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [kind, setKind] = useState(route.params['kind']);
  const [imageWidth, setImageWidth] = useState(
    Dimensions.get('window').width - 12 - 12 - 200,
  );
  const [categories, setCategories] = useState([]);
  const [progressVisible, setProgressVisible] = useState(false);
  const [click, setClick] = useState(0);
  const [inters, setInters] = useState();

  useEffect(() => {
    const ad = InterstitialAd.createForAdRequest(admobs.interstitial);
    ad.load();
    setInters(ad);
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let updatedCategories = [];

    if (kind === 'newbie') {
      updatedCategories = CONTENTS.newbie;
      navigation.setOptions({headerTitle: string.newbie_guide});
    } else if (kind === 'advance') {
      updatedCategories = CONTENTS.advance;
      navigation.setOptions({headerTitle: string.advance_guide});
    } else if (kind === 'pro') {
      updatedCategories = CONTENTS.pro;
      navigation.setOptions({headerTitle: string.pro_guide});
    } else if (kind === 'expert') {
      updatedCategories = CONTENTS.expert;
      navigation.setOptions({headerTitle: string.expert_guide});
    }

    updatedCategories = updatedCategories.map((item, index) => ({
      ...item,
      index,
      show_ad: (index + 1) % 2 === 0,
      type: 'guide',
    }));

    for (let i = 0; i < updatedCategories.length; i++) {
      if ((i + 1) % 3 === 0) {
        updatedCategories.splice(i, 0, {type: 'ad'});
      }
    }

    setCategories(updatedCategories);
  };

  const openGuideContent = (item, index) => {
    const nextClick = click + 1;
    setClick(nextClick);

    if (nextClick === 5 || (nextClick > 5 && (nextClick - 5) % 7 === 0)) {
      if (inters?.loaded) {
        inters?.show().then(() => {
          const ads = InterstitialAd.createForAdRequest(admobs.interstitial);
          ads.load();
          setInters(ads);
        });
      }
    }

    const totalGuides = categories.filter(cat => cat.type !== 'ad').length;

    navigation.navigate('GuideContent', {
      name: item.name,
      kind,
      description: item.description,
      show_ad: item.show_ad ? 1 : 0,
      index,
      showSource: index === totalGuides - 1 ? 'show' : 'not-show',
      showInters: index > 0 && (index + 1) % 2 === 0,
    });
  };

  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <Image
        source={require('../assets/images/bg01.png')}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />
      {!progressVisible && (
        <FlatList
          ListHeaderComponent={
            <>
              <Image
                source={require('../assets/images/icon1.png')}
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: 'center',
                  marginVertical: 20,
                  borderRadius: 30,
                }}
                resizeMode="contain"
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
                }}
                onPress={() => navigation.navigate('Settings')}>
                <Image
                  source={require('../assets/images/settings.png')}
                  style={{width: 25, height: 25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </>
          }
          data={categories.filter(cat => cat.type !== 'ad')}
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: 62}}
          renderItem={({item, index}) => (
            <View style={{width: '100%'}}>
              {item.type === 'guide' && (
                <TouchableScale
                  style={{
                    height: 120,
                    width: '90%',
                    alignSelf: 'center',
                    paddingVertical: 8,
                  }}
                  onPress={() => openGuideContent(item, index)}>
                  <LinearGradient
                    colors={['#1D1D1D', '#2A5161']}
                    style={{height: '100%', borderRadius: 8}}>
                    <View
                      style={{
                        height: '100%',
                        position: 'absolute',
                        left: 24,
                        justifyContent: 'center',
                      }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#FFFFFF',
                          fontSize: 14,
                          width: 140,
                          fontWeight: 'bold',
                          lineHeight: 20,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: '#FFFFFF',
                          fontSize: 12,
                          width: 140,
                          lineHeight: 20,
                        }}>
                        {item.description}
                      </Text>
                    </View>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        position: 'absolute',
                        left: 190,
                        width: imageWidth,
                        height: 104,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      }}
                      resizeMode="cover"
                    />
                  </LinearGradient>
                </TouchableScale>
              )}
              {index === 2 && <NativeSmallAd />}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Guide;
