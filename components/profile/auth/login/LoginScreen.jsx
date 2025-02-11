import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './LoginScreen.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { AuthContext } from '../../../../components/contexts/AuthContext';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import ErrorMessage from '../../../../components/common/form/ErrorMessage';
import validateForm from '../../../../utils/validateForm';

const LoginScreen = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [isError, setIsError] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [messageType, setMessageType] = useState();


  const { login, user } = useContext(AuthContext);

  // Google Login Configuration
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '5410789330-4jm6s4vnsjmap6dim8ote1n3frjf7or3.apps.googleusercontent.com',
    iosClientId: '5410789330-ebp9o9l6obb1n44gv1hdhj6hk665hn1k.apps.googleusercontent.com',
    androidClientId: '5410789330-e5m3ikv2c9riq6vdun2qr6fbrect0b5q.apps.googleusercontent.com',
    webClientId: '5410789330-o7tb7g4taft9hjjdog7ovf6irk1ue14e.apps.googleusercontent.com',
  });

  // Facebook Login Configuration
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: 'your_facebook_app_id',
  });

  React.useEffect(() => {
    // Handle Google login response
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      handleSocialLogin('google', id_token);
    }

    // Handle Facebook login response
    if (facebookResponse?.type === 'success') {
      const { access_token } = facebookResponse.params;
      handleSocialLogin('facebook', access_token);
    }
  }, [googleResponse, facebookResponse]);

  const handleSocialLogin = async (provider, token) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/auth/${provider}/callback?token=${token}`);
      if (response.data.token) {
        await login({ token: response.data.token });
      }
    } catch (error) {
      alert('Login Failed', 'An error occurred during social login.');
      console.error(error);
    }
  };

  const handleBlur = (field) => {
    const credentials = { email: email };
    const requiredFields = ['email', 'password'];

    const errors = validateForm(credentials, requiredFields);

    // if (field === 'email') {
    //     setFormFieldErrors((prevErrors) => ({
    //       ...prevErrors, 
    //       [field]: 'Invalid email or phone number',
    //     }));
    // } else {
    //   // Generic error handling for other fields
    //   setFormFieldErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [field]: errors[field] || '',
    //   }));
    // }

    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
    } else {
      // console.log('All fields are valid.', errors);
      setFormValidated(true);
    }
  }

  // Handle login with password
  const handleLogin = async () => {
    if (!formValidated) {
      setFormMessage('Please enter details correctly.');
      setIsError(true);
      return
    }
    setLoading(true);
    const credentials = { email: email, password: password };
    try {
      await login(credentials);
      setMessageType('success')
      setFormMessage('Login successful');
      setIsError(true);
      setLoading(false);
      router.replace("/(tabs)/profile");
    } catch (error) {
      setFormMessage(error.message || 'An unexpected error occurred.');
      setMessageType('error');
      setLoading(false);
      setIsError(true);
    }
  };


  const normalizeInput = (value) => {
  if (value.includes('@')) {
    // Treat as email
    setEmail(value);
  } else {
    // Treat as phone number
    let normalized = value.replace(/\s/g, ''); // Remove spaces
    // Check for country code starting with '+'
    if (normalized.startsWith('+')) {
      const phoneWithoutCountryCode = normalized.replace(/^\+\d+/, ''); // Remove + and country code
      normalized = '0' + phoneWithoutCountryCode; // Replace country code with '0'
    } else if (!normalized.startsWith('0')) {
      // If it doesn't start with 0, add 0
      normalized = '0' + normalized;
    }

    setEmail(normalized.replace(/[^0-9]/g, '')); // Keep only numbers
  }
};
  
  const sanitizeemail = (value) => {
    return value.replace(/[+\s]/g, ''); // Remove spaces and '+' signs
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1, marginBottom: 100, }}>
        <KeyboardAvoidingView
          style={{ flex: 1, paddingBottom: 100 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Image
                source={require('../../../../assets/logo-icon-text.png')}
                style={styles.imageIcon}
              />
            </View>
            <View style={styles.formBody}>
              <Pressable
                style={({ pressed }) => [styles.googleBtn, pressed && styles.googleBtnPressed]}
                disabled={!googleRequest}
                onPress={() => googlePromptAsync()}
              >
                <View style={styles.googleBtnImageBox}>
                  <Image
                    source={require('../../../../assets/icons/google.png')}
                    style={styles.googleBtnIcon}
                  />
                </View>
                <Text style={styles.googleBtnText}>Sign in with Google</Text>
              </Pressable>
              
              {/* <Pressable
                style={({ pressed }) => [styles.facebookBtn, pressed && styles.facebookBtnPressed]}
                disabled={!facebookRequest}
                onPress={() => facebookPromptAsync()}
              >
                <View style={styles.facebookBtnImageBox}>
                  <Image
                    source={require('../../../../assets/icons/facebook.png')}
                    style={styles.googleBtnIcon}
                  />
                </View>
                <Text style={styles.googleBtnText}>Login with Facebook</Text>
              </Pressable> */}

              <Text style={styles.orLoginText}>Or Login with password</Text>
              
              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                messageType={messageType}
                onDismiss={() => setIsError(false)} // Reset error state when dismissed
              />
              <View style={styles.inputBox}>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(sanitizeemail(text))}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Email address"
                  style={[styles.input, formFieldErrors?.email ? styles.inputError : '']}
                  onBlur={() => handleBlur('email')}
                />
                <Text style={styles.inputFieldErrorText}>{formFieldErrors?.email ? formFieldErrors.email : ""}</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Enter password"
                  style={[styles.input, formFieldErrors?.password ? styles.inputError : '']}
                  onBlur={() => handleBlur('password')}
                />
                <Pressable onPress={ () => {setShowPassword(prevState => !prevState)} } style={styles.showPasswordIconBox} >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} style={styles.showPasswordIcon} />
                </Pressable>
                <Text style={styles.inputFieldErrorText}>{formFieldErrors?.password ? formFieldErrors.password : ""}</Text>
              </View>
              <Text onPress={() => router.push("profile/auth/recoverPassword")} style={styles.forgotPasswordLink}>
                Forgot password?
              </Text>
            </View>
            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Login</Text>
              <LottieView
                source={require('../../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
              />
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.formBtn,
                  pressed && styles.formBtnPressed,
                ]}
              >
                <Ionicons name="enter" style={styles.formBtnIcon} />
              </Pressable>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                Already have an account?
              </Text>
              <Text onPress={() => router.replace("profile/auth/signup")} style={styles.footerLink}>
                Create account
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen