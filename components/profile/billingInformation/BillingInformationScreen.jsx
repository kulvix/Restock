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
import styles from './BillingInformationScreen.style';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { getBaseURL } from '../../../utils/apiConfig';

import ErrorMessage from '../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../components/contexts/AuthContext';
import validateForm from '../../../utils/validateForm';



const BillingInformationScreen = () => {
 
  const { user, userBillingInfo, logout } = useContext(AuthContext);
  console.log(userBillingInfo);

  const router = useRouter();
  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { email } = useLocalSearchParams();

  const [email, setEmail] = useState(user.email);

  const [addressLine1, setAddressLine1] = useState(userBillingInfo ? userBillingInfo.address_line1 : "");
  const [fullName, setFullName] = useState(userBillingInfo ? userBillingInfo.name : "");
  const [addressLine2, setAddressLine2] = useState(userBillingInfo ? userBillingInfo.address_line2 : "");
  const [city, setCity] = useState(userBillingInfo ? userBillingInfo.city : "");
  const [state, setState] = useState(userBillingInfo ? userBillingInfo.state : "");
  const [phone, setPhone] = useState(userBillingInfo ? userBillingInfo.phone_of_contact_person : "");
  const [zip, setZip] = useState(userBillingInfo ? userBillingInfo.zip : "");
  const [country, setCountry] = useState(userBillingInfo ? userBillingInfo.country : "");

  
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const [messageType, setMessageType] = useState();

  const { updateBillingInfo, editBillingInfo } = useContext(AuthContext);

  const handleUpdateInfomation = async () => {
    
    const credentials = {
      name: fullName,
      email: email,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city: city,
      state: state,
      phone_of_contact_person: phone,
      zip: zip,
      country: country,
    };


    const requiredFields = [credentials];
    const errors = validateForm(credentials, requiredFields);

    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
      // setFormValidated(false);
      return;
    }

    setLoading(true); 
    // return;
    try {
      const response  = await updateBillingInfo(credentials);

      editBillingInfo({
        name: fullName,
        email: email,
        address_line1: addressLine1,
        address_line2: addressLine2,
        city: city,
        state: state,
        phone: phone,
        zip: zip,
        country: country,
      });

      setFormMessage(response.message || 'Saved');
      setMessageType('success');
      setLoading(false);
      setIsError(true);
    } catch (error) {
      setFormMessage(error.message || 'An unexpected error occurred.');
      setMessageType('error');
      setIsError(true);
      setLoading(false);
    }
  };

  const handleBlur = (field) => {
    const credentials = {
      name: fullName,
      address_line1: addressLine1,
      address_line2: addressLine2,
      city: city,
      state: state,
      phone: phone,
      zip: zip,
      country: country,
    };

    console.log(credentials);

    const requiredFields = [{ name: fullName, address_line1: addressLine1, city: city, state: state, phone: phone }];
    const errors = validateForm(credentials, requiredFields);

    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
      setFormValidated(false);
    } else {
      setFormValidated(true);
      setFormFieldErrors({});
    }
    console.log("Errors: ", errors, "Form Validated: ", formValidated);
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
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder={userBillingInfo ? userBillingInfo.name || "Address owner name" : "Address owner name" }
                  style={[styles.input, formFieldErrors?.name ? styles.inputError : '']}
                  onBlur={() => handleBlur('fullName')}
                />
                {formFieldErrors?.name &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.name || ""}
                    </Text>
                  )
                }
              </View>
              
              <View style={styles.inputBox}>
                <TextInput
                  value={addressLine1}
                  onChangeText={setAddressLine1}
                  placeholder={userBillingInfo ? userBillingInfo.addressLine1 || "Address line 1" : "Address line 1" }
                  style={[styles.input, formFieldErrors?.address_line1 ? styles.inputError : '']}
                  onBlur={() => handleBlur('addressLine1')}
                />
                {formFieldErrors?.address_line1 &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.address_line1 || ""}
                    </Text>
                  )
                }
              </View>
              
              <View style={styles.inputBox}>
                <TextInput
                  value={addressLine2}
                  onChangeText={setAddressLine2}
                  placeholder={userBillingInfo ? userBillingInfo.addressLine2 || "Address line 2" : "Address line 2" }
                  style={[styles.input, formFieldErrors?.addressLine2 ? styles.inputError : '']}
                  onBlur={() => handleBlur('addressLine2')}
                />
                {formFieldErrors?.addressLine2 &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.addressLine2 || ""}
                    </Text>
                  )
                }
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder={userBillingInfo ? userBillingInfo.city || "City" : "City" }
                  style={[styles.input, formFieldErrors?.city ? styles.inputError : '']}
                  onBlur={() => handleBlur('city')}
                />
                {formFieldErrors?.city &&
                  (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.city || ""}
                    </Text>
                  )
                }
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={state}
                  onChangeText={setState}
                  placeholder={userBillingInfo ? userBillingInfo.state || "State" : "State"}
                  style={[styles.input, formFieldErrors?.state ? styles.inputError : '']}
                  onBlur={() => handleBlur('state')}
                />
                {formFieldErrors?.state && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.state || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder={userBillingInfo ? userBillingInfo.phone_of_contact_person || "Phone number of Contact person" : "Phone number of Contact person"}
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
                  value={zip}
                  onChangeText={setZip}
                  placeholder={userBillingInfo ? userBillingInfo.zip || "Zip code" : "Zip code"}
                  keyboardType="phone-pad"
                  style={[styles.input, formFieldErrors?.zip ? styles.inputError : '']}
                  onBlur={() => handleBlur('zip')}
                />
                {formFieldErrors?.zip && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.zip || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={country}
                  onChangeText={setCountry}
                  placeholder={userBillingInfo ? userBillingInfo.country || "Country" : "Country"}
                  style={[styles.input, formFieldErrors?.country ? styles.inputError : '']}
                  onBlur={() => handleBlur('country')}
                />
                {formFieldErrors?.country && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.country || ""}
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
                speed={4}
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

export default BillingInformationScreen