import React, { useState, useEffect, useContext, useRef } from 'react';
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
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './SignUpScreen.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from "expo-linear-gradient";
import Video from 'react-native-video';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';

import { AuthContext } from '../../../../components/contexts/AuthContext';
import ErrorMessage from '../../../../components/common/form/ErrorMessage';
import validateForm from '../../../../utils/validateForm';


const SignUpScreen = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailOrPhone, setEmailOrPhone] = useState("");
	const [password, setPassword] = useState("");

  const [formMessage, setFormMessage] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [isError, setIsError] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  
  const { signUp, user } = useContext(AuthContext);

  const { width } = Dimensions.get('window');

  const slides = [
    {
      id: '1',
      image: require('../../../../assets/images/spinster.jpg'),
      text: 'Start your journey to a stress-free life.',
    },
    {
      id: '2',
      image: require('../../../../assets/images/family1.jpg'),
      text: 'More family time... More happiness.',
    },
    {
      id: '3',
      image: require('../../../../assets/images/doorstep-lady.jpeg'),
      text: 'Save money. Save time. Achieve more.',
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger fade animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

        // Reset fade animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000); // Adjust the interval duration as needed

    return () => clearInterval(interval);
  }, [fadeAnim]);











  const handleBlur = (field) => {
    const credentials = {
      emailOrPhone: emailOrPhone,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword,
    }
    const requiredFields = ['emailOrPhone', 'password', 'firstName', 'lastName', 'confirmPassword'];
    const errors = validateForm(credentials, requiredFields);

    if (field === 'emailOrPhone') {
        setFormFieldErrors((prevErrors) => ({
          ...prevErrors, 
          [field]: 'Invalid email or phone number',
        }));
    } else {
      // Generic error handling for other fields
      setFormFieldErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errors[field] || '',
      }));
    }
    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
    } else {
      setFormValidated(true);
    }
  }

	const handleSignUp = async () => {
    if (!formValidated) {
      setFormMessage('Please enter details correctly.');
      setIsError(true);
      return
    }
    setLoading(true);
    const credentials = {
      emailOrPhone: emailOrPhone,
      firstName: firstName,
      lastName: lastName,
      password: password,
    }
    try {
      await signUp(credentials);
      setLoading(true);
      setFormMessage('Signup successful');
      setIsError(true);
      router.replace("/(tabs)/profile");
    } catch (error) {
      setLoading(false);
      setFormMessage(error.message || 'An unexpected error occurred.');
      setIsError(true);
    }
	};

  const sanitizeEmailOrPhone = (value) => {
    return value.replace(/[+\s]/g, ''); // Remove spaces and '+' signs
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1, marginBottom: 120, }}>
        <KeyboardAvoidingView
          style={{ flex: 1, paddingBottom: 100 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* <View style={styles.header}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={styles.gradientOverlay}
              />
              <ImageBackground
                source={require('../../../../assets/images/couple1.png')}
                style={styles.backgroundImage}
              >
                <Text style={styles.headerTitle}>
                  Start your journey to a stress-free life.
                </Text>
              </ImageBackground>
            </View> */}

            <View style={styles.header}>
              <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <ImageBackground
                  source={slides[currentIndex].image}
                  style={styles.backgroundImage}
                >
                  <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                    style={styles.gradientOverlay}
                  />
                  <Text style={styles.headerTitle}>{slides[currentIndex].text}</Text>
                </ImageBackground>
              </Animated.View>
            </View>
            <View style={styles.formBody}>

              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                onDismiss={() => setIsError(false)}
                />
              <View style={styles.inputBox}>
                <TextInput
                  value={emailOrPhone}
                  onChangeText={(text) => setEmailOrPhone(sanitizeEmailOrPhone(text))}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Email address or Phone number"
                  style={[styles.input, formFieldErrors?.emailOrPhone ? styles.inputError : '']}
                  onBlur={() => handleBlur('emailOrPhone')}
                />
                <Text style={styles.inputFieldErrorText}>{formFieldErrors?.emailOrPhone ? formFieldErrors.emailOrPhone : ""}</Text>
              </View>
              <View style={styles.inputFlexBox}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="none"
                    placeholder="First name"
                    style={[styles.input, formFieldErrors?.firstName ? styles.inputError : '']}
                    onBlur={() => handleBlur('firstName')}
                  />
                  <Text style={styles.inputFieldErrorText}>{formFieldErrors?.firstName ? formFieldErrors.firstName : ""}</Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="none"
                    placeholder="Last name"
                    style={[styles.input, formFieldErrors?.lastName ? styles.inputError : '']}
                    onBlur={() => handleBlur('lastName')}
                  />
                  <Text style={styles.inputFieldErrorText}>{formFieldErrors?.lastName ? formFieldErrors.lastName : ""}</Text>
                </View>
                
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
              <View style={styles.inputBox}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm password"
                  style={[styles.input, formFieldErrors?.confirmPassword ? styles.inputError : '']}
                  onBlur={() => handleBlur('confirmPassword')}
                />
                <Pressable onPress={ () => {setShowConfirmPassword(prevState => !prevState)} } style={styles.showPasswordIconBox} >
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} style={styles.showPasswordIcon} />
                </Pressable>
                <Text style={styles.inputFieldErrorText}>{formFieldErrors?.confirmPassword ? formFieldErrors.confirmPassword : ""}</Text>
              </View>
            </View>
            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Sign up</Text>
              <LottieView
                source={require('../../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
              />
              <Pressable
                onPress={handleSignUp}
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
              <Text onPress={() => router.replace("profile/auth/login")} style={styles.footerLink}>
                Sign in
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen

