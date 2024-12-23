// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { StatusBar, StyleSheet, View, TextInput, Button, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons, SIZES, FONT } from '../../../../../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LoginScreen } from '../../../../../components';
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from 'expo-router';

const Login = ({ navigation }) => { 
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
					<StatusBar
						style="translucent"
						backgroundColor={COLORS.lightWhite}
						barStyle="dark-content"
					/>
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

					<LoginScreen />

				<LinearGradient
					colors={['transparent', COLORS.white, COLORS.white]}
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '15%',
					}}
				/>
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

export default Login;
