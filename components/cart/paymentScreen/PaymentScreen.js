import React from "react";
import { View, Pressable, Alert, StyleSheet, Text } from "react-native";
import { FlutterwaveInit, PaymentMethod } from "flutterwave-react-native";

const PaymentScreen = () => {
  const handlePayment = () => {
    console.log(FlutterwaveInit); // Debugging check
    FlutterwaveInit({
      tx_ref: `TX-${Date.now()}`,
      amount: 1000,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: "customer@example.com",
        phonenumber: "08012345678",
        name: "John Doe",
      },
      customizations: {
        title: "Payment for Order",
        description: "Grocery Order Payment",
        logo: "https://yourlogo.com/logo.png",
      },
      public_key: "FLWPUBK_TEST-251e243d301d21212980ea20152607c6-X", // Replace with actual public key
      api_version: "v3",
      is_staging: true,
    })
      .then((response) => {
        if (response.status === "successful") {
          Alert.alert("Payment Successful!", `Transaction ID: ${response.transaction_id}`);
        } else {
          Alert.alert("Payment Failed", "Please try again.");
        }
      })
      .catch((error) => {
        console.error("Payment Error:", error);
        // console.error("Payment Error:", JSON.stringify(error, null, 2));
        Alert.alert("Payment Error", "Something went wrong.");
      });
  };
  

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={handlePayment}>
        <Text>
          Pay with Flutterwave
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 20,
    backgroundColor: 'orange',
    fontWeight: 'black',

  }
});

export default PaymentScreen;
