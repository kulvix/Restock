import React, { useState, useContext } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import ErrorMessage from '../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../components/contexts/AuthContext';
import validateForm from '../../../utils/validateForm';
import { COLORS, SIZES, FONT } from '../../../constants';

const PersonalInformationScreen = () => {
  const { user, updatePersonalInfo, updateUser } = useContext(AuthContext);
  const router = useRouter();

  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [messageType, setMessageType] = useState();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstName] = useState(user.first_name);
  const [lastname, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob || '');

  const [formFieldErrors, setFormFieldErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      setDob(isoString);
    }
  };

  const handleUpdateInfomation = async () => {
    const credentials = {
      email,
      firstName: firstname,
      lastName: lastname,
      phone,
      gender,
      dob,
    };

    const requiredFields = ['firstName', 'lastName', 'phone', 'dob'];
    const errors = validateForm(credentials, requiredFields);

    if (Object.keys(errors).length > 0) {
      setFormFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await updatePersonalInfo(credentials);
      updateUser({
        first_name: firstname,
        last_name: lastname,
        phone,
        gender,
        dob,
      });

      setFormMessage('Saved');
      setMessageType('success');
      setIsError(true);
    } catch (error) {
      setFormMessage(error.message || 'An unexpected error occurred.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
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
                messageType={messageType}
              />

              {/* Email (disabled) */}
              <View style={styles.inputBox}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  style={[styles.input, formFieldErrors?.email ? styles.inputError : null]}
                  editable={false}
                />
              </View>

              {/* First Name */}
              <View style={styles.inputBox}>
                <TextInput
                  value={firstname}
                  onChangeText={setFirstName}
                  placeholder="First name"
                  style={[styles.input, formFieldErrors?.firstName ? styles.inputError : null]}
                />
                {formFieldErrors?.firstName && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.firstName}
                  </Text>
                )}
              </View>

              {/* Last Name */}
              <View style={styles.inputBox}>
                <TextInput
                  value={lastname}
                  onChangeText={setLastName}
                  placeholder="Last name"
                  style={[styles.input, formFieldErrors?.lastName ? styles.inputError : null]}
                />
                {formFieldErrors?.lastName && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.lastName}
                  </Text>
                )}
              </View>

              {/* Phone */}
              <View style={styles.inputBox}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  style={[styles.input, formFieldErrors?.phone ? styles.inputError : null]}
                />
                {formFieldErrors?.phone && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.phone}
                  </Text>
                )}
              </View>

              {/* Gender */}
              <View style={[styles.inputBox, {
                backgroundColor: '#ffffff',
                height: SIZES.xLarge * 2,
                overflow: 'hidden',
                borderWidth: 0.2,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.small,
                borderColor: COLORS.gray,
                fontFamily: FONT.regular,
                fontSize: SIZES.medium,
                marginBottom: SIZES.medium
              }
              ]}>
                <RNPickerSelect
                  onValueChange={(value) => setGender(value)}
                  value={gender}
                  placeholder={{ label: 'Select gender', value: null }}
                  items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                  ]}
                  style={{
                    inputIOS: styles.input,
                    inputAndroid: styles.input,
                  }}
                />
                {formFieldErrors?.gender && (
                  <Text style={styles.inputFieldErrorText}>{formFieldErrors.gender}</Text>
                )}
              </View>

              {/* Date of Birth */}
              <View style={styles.inputBox}>
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <TextInput
                    value={dob}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    editable={false}
                    style={[styles.input, formFieldErrors?.dob ? styles.inputError : null]}
                  />
                </Pressable>
                {formFieldErrors?.dob && (
                  <Text style={styles.inputFieldErrorText}>
                    {formFieldErrors.dob}
                  </Text>
                )}
              </View>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={dob ? new Date(dob) : new Date('2000-01-01')}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Save details</Text>
              {loading && (
                <LottieView
                  source={require('../../../assets/loaders/loader.json')}
                  autoPlay
                  loop
                  style={styles.loaderIcon}
                  speed={4}
                />
              )}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInformationScreen;
