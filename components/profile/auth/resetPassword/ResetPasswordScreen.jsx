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
import styles from './ResetPasswordScreen.style';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { getBaseURL } from '../../../../utils/apiConfig';

import ErrorMessage from '../../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../../components/contexts/AuthContext';
import validateForm from '../../../../utils/validateForm';

const ResetPasswordScreen = () => {


const router = useRouter();
const [formMessage, setFormMessage] = useState();
const [isError, setIsError] = useState(false);
const [loading, setLoading] = useState(false);

const { email } = useLocalSearchParams();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [formFieldErrors, setFormFieldErrors] = useState();
const [formValidated, setFormValidated] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const { resetPassword } = useContext(AuthContext);

const handleResetPassword = async () => {
  if (!formValidated) {
    setFormMessage('Please enter details correctly.');
    setIsError(true);
    return; // Stop form submission if validation fails
  }

  setLoading(true);
  const credentials = {
    email: email,
    newPassword: password,
    confirmPassword: confirmPassword,
  };

  try {
    await resetPassword(credentials);
    setFormMessage('Your password has been changed successfully. Go back to login');
    setLoading(false);
    setIsError(true);
    router.replace("profile/auth/successful");
  } catch (error) {
    setFormMessage(error.message || 'An unexpected error occurred.');
    setIsError(true);
    setLoading(false);
  }
};

const handleBlur = (field) => {
  // console.log(email);
  const credentials = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  const requiredFields = ['email', 'password', 'confirmPassword'];
  const errors = validateForm(credentials, requiredFields);

  if (Object.keys(errors).length > 0) {
    setFormFieldErrors(errors);
    setFormValidated(false);
  } else {
    setFormValidated(true);
    setFormFieldErrors({});
  }
  // console.log("Errors: ", errors, "Form Validated: ", formValidated);
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.container} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formBody}>
              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                onDismiss={() => setIsError(false)}
              />

              <View style={styles.inputBox}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Enter new password"
                  style={[styles.input, formFieldErrors?.password ? styles.inputError : '']}
                  onBlur={() => handleBlur('password')}
                />
                <Pressable onPress={ () => {setShowPassword(prevState => !prevState)} } style={styles.showPasswordIconBox} >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} style={styles.showPasswordIcon} />
                </Pressable>

                {formFieldErrors?.password &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.password || ""}
                    </Text>
                  )
                }
              </View>
              
              <View style={styles.inputBox}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm password"
                  style={[styles.input, formFieldErrors?.password ? styles.inputError : '']}
                  onBlur={() => handleBlur('confirmPassword')}
                />
                <Pressable onPress={ () => {setShowConfirmPassword(prevState => !prevState)} } style={styles.showPasswordIconBox}>
                  <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} style={styles.showPasswordIcon} />
                </Pressable>
                {formFieldErrors?.confirmPassword &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.confirmPassword || ""}
                    </Text>
                  )
                }
              </View>
            </View>
            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Reset password</Text>
              <LottieView
                source={require('../../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
                speed={4}
              />
              <Pressable
                onPress={handleResetPassword}
                style={({ pressed }) => [
                  styles.formBtn,
                  pressed && styles.formBtnPressed,
                ]}
              >
                <Ionicons name="enter" style={styles.formBtnIcon} />
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ResetPasswordScreen