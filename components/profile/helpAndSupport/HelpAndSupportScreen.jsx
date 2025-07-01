import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './HelpAndSupportScreen.style';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { getBaseURL } from '../../../utils/apiConfig';

import ErrorMessage from '../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../components/contexts/AuthContext';
import validateForm from '../../../utils/validateForm';
import { COLORS } from '../../../constants';


const HelpAndSupportScreen = () => {


  const { user, logout } = useContext(AuthContext);

  const router = useRouter();
  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [cardHolderName, setCardHolderName] = useState("Jude Chimaobi")
  const [cardNumber, setCardNumber] = useState("9090909090902222")
  const [expDate, setExpDate] = useState("0709")
  const [cvv, setCvv] = useState("123")
  


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


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
            <View
              onPress={() => router.push("/(tabs)/profile/addPaymentMethods")}
              style={styles.addNewCardBtn}
            >
              <View>
                <Text style={styles.btnSubText}>Any issues or complains?</Text>
                <Text style={styles.btnText}>Speak with and agent</Text>
              </View>
              <View style={styles.btnGroup}>
              <Pressable onPress={() => Linking.openURL('tel:+2348132029285')}>
                <Ionicons name="call-outline" style={styles.btnIcon} />
              </Pressable>

              <Pressable onPress={() => Linking.openURL('https://wa.me/+2348132029285')}>
                <Ionicons
                  name="logo-whatsapp"
                  style={[styles.btnIcon, { backgroundColor: COLORS.grayDark, color: "#25D366" }]}
                />
              </Pressable>
              </View>
              <Image source={require('../../../assets/images/support-image.png')} style={styles.supportImage} />
            </View>
            
            <Pressable style={styles.cardContainer}>
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
            </Pressable>

            
          </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HelpAndSupportScreen