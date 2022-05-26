/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Customer from '../screens/Customer';
import CustomerInfo from '../screens/CustomerInfo';
import Home from '../screens/Home';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootStackScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
      options={({navigation}: RootStackScreenProps<'Home'>) => ({
        headerTitle: 'Customer List',
        headerTitleStyle: {color: '#3498db', fontSize: 28, fontWeight: '600'},
        unmountOnBlur: true,
      })}/>
      <Stack.Screen name="Customer" component={Customer} 
      options={({route, navigation}: RootStackScreenProps<'Customer'>) => ({
        headerTitle: 'Agregar cliente',
        headerTitleStyle: {color: '#3498db', fontSize: 28, fontWeight: '600'},
        unmountOnBlur: true,
      })}/>
      <Stack.Screen name="CustomerInfo" component={CustomerInfo} 
      options={({route, navigation}: RootStackScreenProps<'CustomerInfo'>) => ({
        headerTitle: 'Información del cliente',
        headerTitleStyle: {color: '#3498db', fontSize: 28, fontWeight: '600'},
        unmountOnBlur: true,
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.replace('Home')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <Ionicons
              name="arrow-back"
              size={30}
              color='#3498db'
              style={{ marginLeft: 15 }}
            />
          </Pressable>
        ),
      })}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
