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
import styles from './PersonalInformationScreen.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { getBaseURL } from '../../../utils/apiConfig';

import ErrorMessage from '../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../components/contexts/AuthContext';
import validateForm from '../../../utils/validateForm';

const PersonalInformationScreen = () => {

  const { user, logout } = useContext(AuthContext);

  const router = useRouter();
  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { email } = useLocalSearchParams();

  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstName] = useState(user.first_name);
  const [lastname, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user.phone);
  const [dob, setDob] = useState(user.dob);
  const [gender, setGender] = useState(user.gender);

  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const [messageType, setMessageType] = useState();


  const { updatePersonalInfo, updateUser } = useContext(AuthContext);

  const handleUpdateInfomation = async () => {
    
    const credentials = {
      email: email,
      firstName: firstname,
      lastName: lastname,
      phone: phone,
      gender: gender,
      dob: dob,
    };

    const requiredFields = [{ firstName: firstname, lastName: lastname, phone: phone }];
    const errors = validateForm(credentials, requiredFields);

    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
      // setFormValidated(false);
      return;
    }
    // setFormValidated(true);
    // setFormFieldErrors({});

    // if (!formValidated) {
    //   setFormMessage('Please enter details correctly.');
    //   setIsError(true);
    //   return;
    // }


    setLoading(true); 
    try {
      await updatePersonalInfo(credentials);
      updateUser({
        first_name: firstname,
        last_name: lastname,
        phone: phone,
        gender: gender,
        dob: dob,
      });
      
      setFormMessage('Saved');
      setMessageType('success')
      setLoading(false);
      setIsError(true);
    } catch (error) {
      setFormMessage(error.message || 'An unexpected error occurred.');
      setIsError(true);
      setLoading(false);
    }
  };

  const handleBlur = (field) => {
    const credentials = {
      firstName: firstname,
      lastName: lastname,
      phone: phone,
      gender: gender,
      dob: dob,
    };

    const requiredFields = [{ firstName: firstname, lastName: lastname, phone: phone }];
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
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.formBody}>
              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                onDismiss={() => setIsError(false)}
                messageType={messageType}
              />

              <View style={styles.inputBox}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={user.email || "Email" }
                  style={[styles.input, formFieldErrors?.email ? styles.inputError : '']}
                  // onBlur={() => handleBlur('email')}
                  editable={false}
                />
                {formFieldErrors?.email &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.email || ""}
                    </Text>
                  )
                }
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={firstname}
                  onChangeText={setFirstName}
                  placeholder={user.first_name || "First name" }
                  style={[styles.input, formFieldErrors?.firstName ? styles.inputError : '']}
                  onBlur={() => handleBlur('firstName')}
                />
                {formFieldErrors?.firstName &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.firstName || ""}
                    </Text>
                  )
                }
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={lastname}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  style={[styles.input, formFieldErrors?.lastName ? styles.inputError : '']}
                  onBlur={() => handleBlur('lastName')}
                />
                {formFieldErrors?.lastName && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.lastName || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  style={[styles.input, formFieldErrors?.phone ? styles.inputError : '']}
                  onBlur={() => handleBlur('phone')}
                />
                {formFieldErrors?.phone && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.phone || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={gender}
                  onChangeText={setGender}
                  placeholder="Gender"
                  style={[styles.input, formFieldErrors?.gender ? styles.inputError : '']}
                  onBlur={() => handleBlur('gender')}
                />
                {formFieldErrors?.gender && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.gender || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={dob}
                  onChangeText={setDob}
                  placeholder="Date of Birth (YYYY-MM-DD)"
                  style={[styles.input, formFieldErrors?.dob ? styles.inputError : '']}
                  onBlur={() => handleBlur('dob')}
                />
                {formFieldErrors?.dob && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.dob || ""}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Save details</Text>
              <LottieView
                source={require('../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
              />
              <Pressable
                onPress={handleUpdateInfomation}
                style={({ pressed }) => [
                  styles.formBtn,
                  pressed && styles.formBtnPressed,
                ]}
              >
                <Ionicons name="arrow-forward" style={styles.formBtnIcon} />
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PersonalInformationScreen