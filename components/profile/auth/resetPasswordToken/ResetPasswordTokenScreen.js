import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './ResetPasswordTokenScreen.styles';
import LottieView from 'lottie-react-native';
import { ScrollView, Pressable, FlatList, TextInput } from 'react-native-gesture-handler';
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
  const [messageType, setMessageType] = useState('error');

  const { verifyResetPasswordToken } = useContext(AuthContext);

const handleVerifyToken = async () => {
  if (token === "") {
    setFormMessage('Token is required!');
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
    setMessageType("success");
    router.replace({
      pathname: "/profile/auth/resetPassword",
      params: { email },
    });
  } catch (error) {
    setMessageType("error");
    setLoading(false);
    // setFormMessage(error.response.data.message || error.message || 'An unexpected error occurred.');
    setIsError(true);
    // setFormMessage(error.message || 'An unexpected error occurred.');
  }
  return;
}

return (
	<View style={styles.container}>
		<View style={styles.body}>
			<Text style={styles.title}>Enter token</Text>
			<Text style={styles.subTitle}>Check your email for the token. Check your spam folder too.</Text>
      <ErrorMessage
        formMessage={formMessage}
        isError={isError}
        onDismiss={() => setIsError(false)}
        messageType={messageType}
      />
			<TextInput
        secureTextEntry={false}
        style={styles.passwordField}
        keyboardType='numeric'
        maxLength={6}
        value={token}
        onChangeText={setToken}
      />
      <LottieView
        source={require('../../../../assets/loaders/loader.json')}
        autoPlay
        loop
        style={[styles.loaderIcon, loading ? { display: 'flex' } : { display: 'none' }]}
        speed={4}
      />
			<Pressable style={styles.btn} onPress={handleVerifyToken}>
				<Text style={styles.btnText}>Authorize</Text>
			</Pressable>
		</View>
	</View>
)}
export default ResetPasswordTokenScreen