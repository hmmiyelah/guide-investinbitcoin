import React from 'react'
import { AppOpenAd, AdEventType } from 'react-native-google-mobile-ads'
import { admobs } from '../utils'

const appOpen = AppOpenAd.createForAdRequest(admobs.appOpen)

appOpen.load()

export default function useOpenAppAds() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = appOpen.addAdEventListener(AdEventType.LOADED, () => {
      setTimeout(() => appOpen.show(), 2000)
    })

    return unsubscribe
  }, [])

  return [loaded]
}
