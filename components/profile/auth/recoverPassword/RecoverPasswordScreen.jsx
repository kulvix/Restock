import React, { useState, useEffect } from 'react';
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
import styles from './RecoverPasswordScreen.style';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';


const RecoverPasswordScreen = () => {

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");



  // const BASE_URL = 'http://192.168.127.87:3001/api';
  const BASE_URL = 'http://192.168.147.87:3001/auth';

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      setLoadingCategories(false);
    }
  };

	const handleLogin = async () => {
		console.log('Recover password clicked');
    router.push("profile/auth/resetPassword");
		// try {
		//     await signUp({ name, email, password, phone });
		// } catch (err) {
		//     console.error(err);
		// }
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
            {/* <View style={styles.header}>
              <Image
                source={require('../../../../assets/logo-icon-text.png')}
                style={styles.imageIcon}
              />
            </View> */}

            <View style={styles.formBody}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter account email address"
                style={styles.input}
              />
            </View>
            <View style={styles.formBtnSection}>
              <Text style={styles.formTitle}>Recover password</Text>
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
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RecoverPasswordScreen