import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ResetPasswordTokenScreen.styles';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../../constants';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import ErrorMessage from '../../../../components/common/form/ErrorMessage';
import { AuthContext } from '../../../../components/contexts/AuthContext';

const ResetPasswordTokenScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [token, setToken] = useState("");
  const [formMessage, setFormMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const { verifyResetPasswordToken } = useContext(AuthContext);

const handleVerifyToken = async () => {
  if (token === "") {
    setFormMessage('Invalid token');
    setIsError(true);
    return;
  }

  setLoading(true);
  const credentials = { email: email, token: token }; 
  try {
    await verifyResetPasswordToken(credentials);
    setFormMessage('Verification successful');
    setIsError(true);
    setLoading(false);
    router.replace({
      pathname: "/profile/auth/resetPassword",
      params: { email },
    });
  } catch (error) {
    setFormMessage(error.message || 'An unexpected error occurred.');
    setIsError(true);
  }
  return;
}

return (
	<View style={styles.container}>
		<View style={styles.body}>
      <ErrorMessage
        formMessage={formMessage}
        isError={isError}
        onDismiss={() => setIsError(false)}
      />
			<Text style={styles.title}>Enter token</Text>
			<Text style={styles.subTitle}>Check your email for the token. Check your spam folder too.</Text>
			<TextInput
        secureTextEntry={false}
        style={styles.passwordField}
        keyboardType='numeric'
        maxLength={6}
        value={token}
        onChangeText={setToken}
      />
			<TouchableOpacity style={styles.btn} onPress={handleVerifyToken}>
				<Text style={styles.btnText}>Authorize</Text>
			</TouchableOpacity>
		</View>
	</View>
)}
export default ResetPasswordTokenScreen