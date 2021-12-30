import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './Redux/Reducer';
import {MainScreen, BrowseScreen, PostScreen, EditScreen} from './Screens';
import {StackParamList} from './Interfaces';
import {Toast} from './Components';

const Stack = createNativeStackNavigator<StackParamList>();
const {store, persistor} = configureStore();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen
                name="Edit"
                component={EditScreen}
                options={{animation: 'none'}}
              />
              <Stack.Screen name="Browse" component={BrowseScreen} />
              <Stack.Screen name="Post" component={PostScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
