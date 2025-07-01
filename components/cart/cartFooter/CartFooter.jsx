import React, { useState, useContext } from 'react';
import { View, Text, Image, useWindowDimensions, Button, Alert } from 'react-native';
import styles from './CartFooter.style';
import { PaymentScreen } from '../../../components';
import { ScrollView, FlatList, Pressable } from 'react-native-gesture-handler';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { FlutterwaveButton, FlutterwaveInit, PayWithFlutterwave } from 'flutterwave-react-native';

import { AuthContext } from '../../../components/contexts/AuthContext';
import { useCart } from '../../../components/contexts/CartContext';
import { getBaseURL } from '../../../utils/apiConfig';
import axios from 'axios';
import { useNotifications } from '../../../components/contexts/NotificationContext';
import LottieView from 'lottie-react-native';


const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

const currencyToNumber = (currencyString) => {
	// Remove the currency symbol (e.g., "NGN ") and any commas
	const cleanedString = currencyString.replace(/NGN\s|,/g, '').trim();
	// Convert to number
	const numberValue = parseFloat(cleanedString);
	return isNaN(numberValue) ? 0 : numberValue; // Return 0 if conversion fails
};



const createOrder = async (userId, orderData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/create-order`, {
      user_id: userId,
      ...orderData,
    });

    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

const formatCurrency = (amount) => {
  return `\u20A6${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const calculateDiscountedPrice = (price, discountPercentage) => {
  // Validate inputs
  if (isNaN(price) || isNaN(discountPercentage)) {
    throw new Error("Invalid input: Both price and discountPercentage should be numbers.");
  }

  if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid values: Price should be positive and discount should be between 0 and 100.");
  }

  // Calculate the discounted price
  const discountAmount = (price * discountPercentage) / 100;
  const finalPrice = price - discountAmount;

  return {
    originalPrice: price,
    discountPercentage,
    discountAmount,
    finalPrice
  };
};



const CartFooter = ({ cartTotals, btnText, btnRoute, screen, selectedDelivery}) => {
  // console.log('cartTotals:', cartTotals);
  const [paymentRedirectLoading, setPaymentRedirectLoading] = useState(false);
  const [showFlutterwave, setShowFlutterwave] = useState(false);
  const { sendPushNotification } = useNotifications();
  const router = useRouter();  
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useCart();
  // const amountPayable = currencyToNumber(totalAmount);
  const amountPayable = cartTotals?.grandTotalWithDiscount ?? 0;
  const orderItems = Object.values(cart).map(item => ({
    type_id: item?.type_id || null,
    bundle_id: item?.bundle_id || null,
    quantity: item.quantity,
    // price: item.discount == null ? item.price : item?.discount * item.quantity,
    price: calculateDiscountedPrice(
      parseFloat(item.price) || 0,
      parseFloat(item.discount) || 0
    ).finalPrice
  }));
  const { width, height } = useWindowDimensions();
  
  // console.log("cart: ", cart);

  const handlePayment = () => {
    
    setShowFlutterwave(true);
  };
  
  const handleOnRedirect = async (data) => {
    // console.log("Payment Response:", data);
    // return;
    // console.log('cartTotals:', cartTotals);
    setShowFlutterwave(false);
    if (data.status === "successful") {
      setPaymentRedirectLoading(true);

      const orderData = {
        items: orderItems,
        subtotal: cartTotals?.subtotalWithDiscount,
        total: cartTotals?.totalWithDiscount,
        vat: cartTotals?.vatWithDiscount,
        // DELIVERY_FEE: 1500 + (0.25 * amountPayable), 
        DELIVERY_FEE: cartTotals?.shippingFee, 
        grand_total: amountPayable,
        payment_method: 'card',
        payment_status: 'paid',
      };

      const userId = user.id;
      await createOrder(userId, orderData);

      // Alert.alert(
        //   "Payment Successful",
        //   `Transaction ID: ${data.transaction_id}`
        // );
      sendPushNotification("Order created","Your order has been created successfully");
      await clearCart();
      setPaymentRedirectLoading(false);
      router.replace('(tabs)/cart/transactionSuccessful');
    } else if (data.status === "failed") {
      Alert.alert(
        "Payment Failed",
        "Your payment was not completed. Please try again."
      );
    } else if (data.status === "cancelled") {
      Alert.alert(
        "Payment Cancelled",
        "You have cancelled the payment."
      );
    } else {
      Alert.alert(
        "Payment Error",
        "An unknown error occurred. Please contact support."
      );
    }
  };
  
 
  const generateRef = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TX-${Date.now()}-${result}`; // Adds timestamp for uniqueness
  };

  if(screen == "cart") {
    return (
      <View style={styles.container(width)}>
        <View style={styles.innerContainer}>
          {/* <View style={styles.row}>
            <Text style={styles.rowText}>Subtotal</Text>
            <View style={styles.doubleCol}>
              <Text style={styles.rowTextPrice}>{formatCurrency(cartTotals.subtotalWithDiscount)}</Text>
            </View>
          </View> */}
          <View style={styles.row}>
            <Text style={styles.rowText}>Subtotal</Text>
            {/* <Text style={styles.rowTextPrice}>{subtotal}</Text> */}
            <View style={styles.doubleCol}>
              {/* <Text style={styles.rowTextPrice}>{cartTotals.subtotalWithoutDiscount}</Text> */}
              <Text style={styles.rowTextPrice}>{formatCurrency(cartTotals.totalWithDiscount)}</Text>
            </View>
          </View>
  
          <View style={styles.row}>
            <Text style={styles.rowText}>Shipping fee</Text>
            <Text style={styles.rowTextPrice}>{formatCurrency(cartTotals.shippingFee)}</Text>
          </View>
  
          {/* <View style={styles.row}>
            <View style={styles.vatBox}>
              <Text style={styles.rowText}>VAT (7.5%)</Text>
              <Text style={[styles.rowText, styles.disclaimerText ]}>Please note that this is not charged by Restock.</Text>
            </View>
            
            <View style={styles.doubleCol}>
              <Text style={styles.rowTextPrice}>{formatCurrency(cartTotals.vatWithDiscount)}</Text>
            </View>
          </View> */}
  
          <View style={styles.line}></View>
          
          <View style={styles.row}>
            <Text style={styles.totalRowText}>Total</Text>
            <View style={styles.doubleCol}>
              {cartTotals.grandTotalWithoutDiscount !== cartTotals.grandTotalWithDiscount && <Text style={styles.footerDiscountedText}>
                {formatCurrency(cartTotals.grandTotalWithoutDiscount)}
              </Text>}
              <Text style={styles.totalRowText}>{formatCurrency(cartTotals.grandTotalWithDiscount)}</Text>
            </View>
          </View>

          <View style={styles.btnBox}>
            {cartTotals.grandTotalWithoutDiscount - cartTotals.grandTotalWithDiscount != 0 &&
            <Text style={styles.btnBadge}>
              You are saving {formatCurrency(cartTotals.grandTotalWithoutDiscount - cartTotals.grandTotalWithDiscount)}
            </Text>}
            <Pressable 
              style={styles.btn}
              onPress={() =>
                router.push({
                  pathname: btnRoute,
                  params: { item: JSON.stringify(cartTotals)},
                })
              }>
                <Text style={styles.btntext}>{btnText}</Text>
              
              
              {/* <PaymentScreen /> */}
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  if (user && screen == "checkout" && selectedDelivery) {
    return (
      <View style={styles.container(width)}>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Text style={styles.totalRowText}>You will pay:</Text>
            <Text style={styles.totalRowText}>{formatCurrency(cartTotals.grandTotalWithDiscount)}</Text>
            {/* <Text style={styles.totalRowText}>{amountPayable}</Text> */}
          </View>
  
          <View style={styles.btnBox}>
            {paymentRedirectLoading && ( 
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
              }}>
                <LottieView
                  source={require('../../../assets/loaders/loader.json')}
                  autoPlay
                  loop
                  style={[styles.loaderIcon, {alignSelf: 'center'} ]}
                  speed={4}
                />
              </View>
            )}
            
            {/* <Pressable 
              style={styles.btn}
              onPress={() =>
                router.push({
                  pathname: btnRoute,
                  params: { item: JSON.stringify(amountPayable)},
                })
              }
            >
              <Text style={styles.btntext}>{btnText}</Text>
            </Pressable> */}
            {/* {console.log('user:', user)} */}
            <PayWithFlutterwave
              onRedirect={handleOnRedirect}
              options={{
                // tx_ref: generateRef(4),
                tx_ref: `TX-${Date.now()}`,
                // authorization: 'FLWPUBK_TEST-251e243d301d21212980ea20152607c6-X', // Test
                authorization: 'FLWPUBK-9b72b1aecabcdd0ddff01eba8dde811d-X', // LIVE
                customer: {
                  email: user.email,
                  phonenumber: user.phone,
                  name: `${user.first_name} ${user.last_name}`,
                },
                amount: amountPayable,
                // amount: 50,
                currency: 'NGN',
                payment_options: 'card',
                customizations: {
                  title: 'Payment for Groceries',
                  description: 'Secure checkout for your order',
                  logo: 'https://fsudw1ykpj644kyo.public.blob.vercel-storage.com/Logo-IRndkUeWIb0nScNT6CJdK47kaF7sVF.png',
                },
                }}
              />

            {/* <FlutterwaveButton
              onRedirect={handleOnRedirect}
              options={{
                tx_ref: `TX-${Date.now()}`,
                authorization: 'FLWPUBK_TEST-251e243d301d21212980ea20152607c6-X',
                customer: {
                  email: 'user@example.com',
                },
                amount: 50,
                currency: 'NGN',
                payment_options: 'card,banktransfer,ussd',
                customizations: {
                  title: 'Payment for Groceries',
                  description: 'Secure checkout for your order',
                },
              }}
              customButton={(props) => (
                <Button title="Pay with Flutterwave" onPress={props.onPress} />
              )}
            /> */}
          </View>
        </View>
      </View>
    )
  }

}

export default CartFooter