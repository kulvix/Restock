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
import styles from './RecoverPasswordScreen.style';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { getBaseURL } from '../../../../utils/apiConfig';
import { AuthContext } from '../../../../components/contexts/AuthContext';

import ErrorMessage from '../../../../components/common/form/ErrorMessage';
import validateForm from '../../../../utils/validateForm';

const RecoverPasswordScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageType, setMessageType] = useState();

  const { recoverPassword, user } = useContext(AuthContext);

	const handleRecoverPassword = async () => {
    if (!formValidated) {
      setFormMessage('Please enter details correctly.');
      setIsError(true);
      return
    }
    setLoading(true);
    try {
      await recoverPassword(email);
      setFormMessage('Check your mail for instructions to recover your password');
      setIsError(true);
      setLoading(false);
      setMessageType("success");
      router.replace({
        pathname: "/profile/auth/resetPasswordToken",
        params: { email },
      });
    } catch (error) {
      setLoading(false);
      setMessageType("error");
      setFormMessage(error.response.data.message || 'An unexpected error occurred.');
      setIsError(true);
    }
	};

  const handleBlur = (field) => {
    const credentials = { email: email };
    const requiredFields = ['email'];
    const errors = validateForm(credentials, requiredFields);
    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
    } else {
      setFormValidated(true);
      setFormFieldErrors();
      // console.log("error: "+ errors, "validated: "+formValidated);
    }
  }




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
            {/* <View style={styles.header}>
              <Image
                source={require('../../../../assets/logo-icon-text.png')}
                style={styles.imageIcon}
              />
            </View> */}
            
            <View style={styles.formBody}>
              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                onDismiss={() => setIsError(false)}
                messageType={messageType}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter account email address"
                style={styles.input}
                onBlur={() => handleBlur('email')}
              />

              <Text style={styles.inputFieldErrorText}>{formFieldErrors?.email ? formFieldErrors.email : ""}</Text>
                {/* {formFieldErrors?.email &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.email || ""}
                    </Text>
                  )
                } */}
            </View>
            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Recover password</Text>
              <LottieView
                source={require('../../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
                speed={4}
              />
              <Pressable
                onPress={handleRecoverPassword}
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

export default RecoverPasswordScreen