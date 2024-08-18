import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Page/Login/Login';
import Splash from '../Page/Splash/Splash';
import ForgotPassword from '../Page/ForgotPassword/ForgotPassword';
import BottomTabNavigation from './BottomTabNavigation';
import VideoDetails from '../Page/VideoDetails/VideoDetails';
import ViewQuiz from '../Page/VideoDetails/ViewQuiz';
import Profile from '../Page/BottomTabScreens/Account/Profile';
import ChangePassword from '../Page/BottomTabScreens/Account/ChangePassword';
import VideoPlay from '../Page/VideoDetails/VideoPlay';
import CloseButton from '../Components/CloseButton';
import PrivacyPolicy from '../Page/BottomTabScreens/Account/PrivacyPolicy';
import MyVideos from '../Page/BottomTabScreens/Account/MyVideos';
import Notifications from '../Page/BottomTabScreens/Account/Notifications';
import CreateManual from '../Page/CreateManual/CreateManual';
import TermsOfUse from '../Page/BottomTabScreens/Account/TermsOfUse';
import CloseAccount from '../Page/BottomTabScreens/Account/CloseAccount';
import ManualDetails from '../Page/ManualDetails/ManualDetails';
import CustomHeader from '../Components/CustomHeader';
import VideoViews from '../Page/VideoDetails/VideoViews';
import VideoDetails1 from '../Page/BottomTabScreens/Account/VideoDetails1';
import EditVideo from '../Page/BottomTabScreens/Account/EditVideo';
import ViewAll from '../Page/TopTabScreens/ViewAll';

import AddMembers from '../Page/AddMembers/AddMembers';
import AddFromExistingMembers from '../Page/AddFromExistingMembers/AddFromExistingMembers';
import ViewQuizResult from '../Page/VideoDetails/ViewQuizResult';
import ViewResultAnswer from '../Page/VideoDetails/ViewResultAnswer';
import ManualViewAll from '../Page/ManualViewAll/ManualViewAll';
import ManualUserDetails from '../Page/ManualUsersDetails/ManualUserDetails'
import MyVideoViewAll from '../Page/BottomTabScreens/Account/MyVideoViewAll';
import FavoriteViewAll from '../Page/BottomTabScreens/FavoriteViewAll';


const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoDetails"
          component={VideoDetails}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="VideoDetails1"
          component={VideoDetails1}
          options={{headerShown: false}}
        />
        <Stack.Screen name='ViewAll' component={ViewAll} options={{}}/>
        <Stack.Screen name='EditVideo' component={EditVideo} options={{headerShown: false}}/>
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{headerShown: false}}/>
        <Stack.Screen name="TermsOfUse" component={TermsOfUse} options={{headerShown: false}}/>
        <Stack.Screen name="Notifications" component={Notifications}  options={{headerShown: false}}/>
        <Stack.Screen name="CloseAccount" component={CloseAccount} options={{headerShown: false}}/>
        <Stack.Screen name='MyVideos' component={MyVideos} options={{headerShown: false}}/>
        <Stack.Screen name="ViewQuiz" component={ViewQuiz}  options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
        <Stack.Screen name="VideoPlay" component={VideoPlay} 
          options={{ headerShown:true,headerTitle:' ',headerTransparent: true, 
          headerLeft: () => <CloseButton/>,
          headerStyle: { backgroundColor: '#2c2c2c'},
         }}/>

    
        <Stack.Screen
          name="CreateManual"
          component={CreateManual}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManualDetails"
          component={ManualDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoViews"
          component={VideoViews}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddMembers"
          component={AddMembers}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddFromExistingMembers"
          component={AddFromExistingMembers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="ViewQuizResult" component={ViewQuizResult} options={{headerShown:false}}/>
        <Stack.Screen name="ViewResultAnswer" component={ViewResultAnswer} options={{headerShown:false}}/>
        <Stack.Screen name="ManualViewAll" component={ManualViewAll} options={{headerShown:false}}/>
        <Stack.Screen name="ManualUsersDetail" component={ManualUserDetails} options={{headerShown:false}}/>
        <Stack.Screen name="MyVideoViewAll" component={MyVideoViewAll} />
        <Stack.Screen name="FavoriteViewAll" component={FavoriteViewAll}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

const styles = StyleSheet.create({


});
