import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import mobileAds from 'react-native-google-mobile-ads'

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    console.log({ adapterStatuses })
  })

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle: node_modules\react-native-fetch-blobindex.js',
  'Require cycles are allowed',
  '`new NativeEventEmitter()` was called',
])

AppRegistry.registerComponent(appName, () => App)
