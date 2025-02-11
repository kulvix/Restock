import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import { FlutterwaveInit, PaymentMethod } from "flutterwave-react-native";

const PaymentScreen = () => {
  const handlePayment = () => {
    FlutterwaveInit({
      tx_ref: `TX-${Date.now()}`,
      amount: 1000,
      currency: "NGN",
      payment_options: PaymentMethod.Card | PaymentMethod.BankTransfer | PaymentMethod.USSD,
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
      public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxx-X", // Replace with actual public key
      is_staging: true, // Set to false in production
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
        Alert.alert("Payment Error", "Something went wrong.");
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Pay with Flutterwave" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PaymentScreen;
