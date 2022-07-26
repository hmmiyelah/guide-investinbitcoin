/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

import AppLovinMAX from 'react-native-applovin-max'
// import mobileAds from 'react-native-google-mobile-ads'

// mobileAds()
//   .initialize()
//   .then((adapterStatuses) => {
//     console.log('admob: ', adapterStatuses)
//   })

AppLovinMAX.initialize(
  '7kF18ZoOa6m-I0IruqcGNsK5bfUpOlS9JxOhZ3aB4VnSNaInKQ2Zacn_hb6yq4RMn_LoPpPCFir3dquJis7rGS',
  (configuration) => {
    console.log('applovin: ', configuration)
  }
)

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle: node_modules\react-native-fetch-blobindex.js',
  'Require cycles are allowed',
  '`new NativeEventEmitter()` was called',
])

AppRegistry.registerComponent(appName, () => App)
