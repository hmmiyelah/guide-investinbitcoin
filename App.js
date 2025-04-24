import React from 'react';
import {StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Intro from './screens/Intro.js';
import Guide from './screens/Guide.js';
import Settings from './screens/Settings.js';
import HowTo from './screens/HowTo.js';
import About from './screens/About.js';
import GuideContent from './screens/GuideContent.js';
import {colors} from './utils';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.main} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {backgroundColor: '#1b2229'},
            headerTintColor: '#FFFFFF',
          }}
        >
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Guide" component={Guide} />
          <Stack.Screen name="GuideContent" component={GuideContent} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="HowTo"
            component={HowTo}
            options={{
              headerShown: true,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'livvic',
                    fontWeight: 'bold',
                  }}
                >
                  How To Use
                </Text>
              ),
              headerStyle: {backgroundColor: '#1b2229'},
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerShown: true,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'livvic',
                    fontWeight: 'bold',
                  }}
                >
                  About Us
                </Text>
              ),
              headerStyle: {backgroundColor: '#1b2229'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
