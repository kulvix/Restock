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
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './AddPaymentMethodsScreen.style';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { getBaseURL } from '../../../utils/apiConfig';

import ErrorMessage from '../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../components/contexts/AuthContext';
import validateForm from '../../../utils/validateForm';


const AddPaymentMethodsScreen = () => {


  const { user, logout } = useContext(AuthContext);

  const router = useRouter();
  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [cardHolderName, setCardHolderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expDate, setExpDate] = useState("")
  const [cvv, setCvv] = useState("")
  


  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const [messageType, setMessageType] = useState();


  const { addPaymentMethod } = useContext(AuthContext);

  const handleAddCard = async () => {
    
    const credentials = {
      email: email,
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
    };

    // console.log(credentials); return;

    const requiredFields = [{
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
    }];
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
      await addPaymentMethod(credentials);
      setFormMessage('Saved');
      setMessageType('success')
      setLoading(false);
      setIsError(true);
    } catch (error) {
      setMessageType('error')
      setFormMessage(error.message || 'An unexpected error occurred.');
      setIsError(true);
      setLoading(false);
    }
  };

  const handleBlur = (field) => {
    const credentials = {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
    };

    const requiredFields = [{
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv, }];
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

  const formatCardNumber = (number) => {
    if (!number || typeof number !== 'string') return '';
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (input) => {
    if (!input || typeof input !== 'string') return '';
    
    return input.replace(/^(\d{2})(\d{1,2})?$/, (_, first, second) => {
      return second ? `${first}/${second}` : first;
    });
  };
  
  // const formatWithSlash = (input) => {
  //   // Remove any existing slashes and format correctly
  //   const cleanedInput = input.replace(/\//g, '');
  //   if (cleanedInput.length <= 2) {
  //     return cleanedInput; // If input is 2 or fewer characters, no need for a slash yet
  //   }
  //   return `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(2)}`;
  // };
  

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




            <View style={styles.cardContainer}>
              <ImageBackground
                source={require('../../../assets/images/card-bg-5.jpg')}
                style={styles.cardInnerContainer}
              >
                <View style={styles.cardRow}>
                  <Text style={[styles.cardText, styles.cardHolderNameText]}>{cardHolderName}</Text>
                  <Text style={styles.cardText}>Debit card</Text>
                </View>

                <View style={styles.cardRow}>
                  <Image
                    source={require('../../../assets/images/chip-1.png')}
                    style={styles.cardChip}
                  />
                  <Text style={[styles.cardText, styles.cardNumberText]}>{formatCardNumber(cardNumber)}</Text>
                </View>

                <View style={styles.cardRow}>
                  <Text style={[styles.cardText, styles.cardCvvText]}>{formatExpiryDate(expDate)}</Text>
                  <Text style={[styles.cardText, styles.cardCvvText]}>{cvv}</Text>
                </View>
              </ImageBackground>
            </View>





            <View style={styles.formBody}>
              <ErrorMessage
                formMessage={formMessage}
                isError={isError}
                onDismiss={() => setIsError(false)}
                messageType={messageType}
              />

              <View style={styles.inputBox}>
                <TextInput
                  value={cardHolderName}
                  onChangeText={setCardHolderName}
                  placeholder="Card Holder Name"
                  keyboardType="text"
                  style={[styles.input, formFieldErrors?.cardHolderName ? styles.inputError : '']}
                  onBlur={() => handleBlur('cardHolderName')}
                />
                {formFieldErrors?.cardHolderName && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.cardHolderName || ""}
                  </Text>
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="Card number"
                  maxLength={16}
                  keyboardType='phone-pad'
                  style={[styles.input, formFieldErrors?.cardNumber ? styles.inputError : '']}
                  onBlur={() => handleBlur('cardNumber')}
                />
                {formFieldErrors?.cardNumber && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.cardNumber || ""}
                  </Text>
                )}
              </View>

              <View style={styles.flexRow}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={formatExpiryDate(expDate)}
                    onChangeText={setExpDate}
                    placeholder="Expiry Date"
                    maxLength={5}
                    keyboardType='phone-pad'
                    style={[styles.input, formFieldErrors?.expDate ? styles.inputError : '']}
                    onBlur={() => handleBlur('expDate')}
                  />
                  {formFieldErrors?.expDate && (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.expDate || ""}
                    </Text>
                  )}
                </View>

                <View style={styles.inputBox}>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="CVV"
                    maxLength={3}
                    keyboardType='phone-pad'
                    style={[styles.input, formFieldErrors?.cvv ? styles.inputError : '']}
                    onBlur={() => handleBlur('cvv')}
                  />
                  {formFieldErrors?.cvv && (
                    <Text style={styles.inputFieldErrorText}>
                      {formFieldErrors.cvv || ""}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Add Card</Text>
              <LottieView
                source={require('../../../assets/loaders/loader.json')}
                autoPlay
                loop
                style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
                speed={4}
              />
              <Pressable
                onPress={handleAddCard}
                style={({ pressed }) => [
                  styles.formBtn,
                  pressed && styles.formBtnPressed,
                ]}
              >
                <Ionicons name="arrow-forward" style={styles.formBtnIcon} />
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AddPaymentMethodsScreen