// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../../components/contexts/AuthContext';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

import { ResetPasswordScreen } from '../../../../../components';

import { StyleSheet, View, TextInput, Button, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';

const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const { login } = useContext(AuthContext);

    // Configure Google Sign-In
    // GoogleSignin.configure({
    //     webClientId: 'your_google_web_client_id', // From Google Console
    // });

    // const handleGoogleLogin = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         const { idToken } = userInfo;
    
    //         // Send idToken to backend
    //         const response = await axios.post(`${API_URL}/auth/google`, { token: idToken });
    
    //         if (response.data.token) {
    //             await login({ token: response.data.token });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    
    // const handleFacebookLogin = async () => {
    //     try {
    //         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //         if (result.isCancelled) {
    //             throw 'User cancelled the login process';
    //         }
    
    //         const data = await AccessToken.getCurrentAccessToken();
    //         if (!data) {
    //             throw 'Something went wrong obtaining access token';
    //         }
    
    //         // Send access token to backend
    //         const response = await axios.post(`${API_URL}/auth/facebook`, { token: data.accessToken });
    
    //         if (response.data.token) {
    //             await login({ token: response.data.token });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleLogin = async () => {
    //     try {
    //         await login({ email, password });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
					<Stack.Screen
						options={{
							headerStyle: { backgroundColor: COLORS.lightWhite },
							headerShadowVisible: false,
							// headerRight: ({ color, size }) => (
							// 	<Ionicons name="settings-outline" size={SIZES.xLarge} color={COLORS.white} />
							// ),
							headerTitle: "",
							headerTitleAlign: "center",
							headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white },
						}}
					/>

				{/* <ScrollView showsVerticalScrollIndicator={false}> */}
					<ResetPasswordScreen />
				{/* </ScrollView> */}
      </SafeAreaView>
        // <View style={{ padding: 20 }}>
            
        //    <Text>Email:</Text>
        //     <TextInput
        //         value={email}
        //         onChangeText={setEmail}
        //         autoCapitalize="none"
        //         keyboardType="email-address"
        //         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        //     />
        //     <Text>Password:</Text>
        //     <TextInput
        //         value={password}
        //         onChangeText={setPassword}
        //         secureTextEntry
        //         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        //     /> 
            // {/* <Button title="Login" onPress={handleLogin} /> */}
            // {/* <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
            //     <Text style={{ color: 'blue', marginTop: 10 }}>Forgot Password?</Text>
            // </TouchableOpacity>
            // <TouchableOpacity onPress={handleGoogleLogin} style={{ marginTop: 20 }}>
            //     <Text style={{ color: 'red' }}>Login with Google</Text>
            // </TouchableOpacity>
            // <TouchableOpacity onPress={handleFacebookLogin} style={{ marginTop: 10 }}>
            //     <Text style={{ color: 'blue' }}>Login with Facebook</Text>
            // </TouchableOpacity>
            // <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 20 }}>
            //     <Text style={{ color: 'green' }}>Don't have an account? Sign Up</Text>
            // </TouchableOpacity> */}
        // </View>
    );
};

export default ResetPassword;
