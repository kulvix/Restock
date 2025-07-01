import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './OrderStatusScreen.styles';
import { ScrollView, FlatList, Pressable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../../constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';





const OrderStatusScreen = () => {

  const { order } = useLocalSearchParams();
  const router = useRouter();

  const currentOrder = JSON.parse(order);

  const orderStatus = [
    { key: "pending", label: "Order Confirmed", subText: "We have received your order." },
    { key: "processing", label: "Processing order", subText: "We are preparing your order." },
    { key: "picked_up", label: "Rider is picking up your order", subText: "Rider is picking up your order." },
    { key: "shipped", label: "On the way", subText: "Rider is on the way." },
    { key: "arrived", label: "Rider is at your place" },
    { key: "delivered", label: "Delivered", subText: "You order has been delivered." },
  ];

  const currentStatusIndex = orderStatus.findIndex((s) => s.key === currentOrder.status);
  // console.log(currentStatusIndex)
  const createdAt = new Date(currentOrder.created_at);
  const expectedDeliveryDate = new Date(createdAt);
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 2);

  const formattedDate = expectedDeliveryDate.toLocaleDateString("en-GB");
return (
	<ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
  >
		<View style={styles.topSection}>
			<Image source={{ uri : currentOrder.image_url }} style={styles.itemImage} />
			<Text style={styles.itemTitle}>Order-#{currentOrder.order_id}</Text>
			<Text style={styles.itemDesc}>Expected Delivery Date: {formattedDate}</Text>
		</View>

    <View style={styles.box}>
  {orderStatus.map((step, index) => (
    <View key={step.key} style={styles.row}>
      <View style={styles.labelBox}>
        {index % 2 === 0 && (
          <>
            <Text style={styles.labelTextLeft}>{step.label}</Text>
            {step.subText && <Text style={styles.labelSubTextLeft}>{step.subText}</Text>}
          </>
        )}
        <Text style={styles.labelSubTextLeft}></Text>
      </View>

      <View>
        <View style={[styles.circle, { borderColor: index <= currentStatusIndex ? COLORS.primary : COLORS.gray }]}>
          {index <= currentStatusIndex && <Ionicons name="checkmark-outline" color={COLORS.primary} />}
        </View>
        {index < orderStatus.length - 1 && (
          <View style={[styles.line, { borderColor: index <= currentStatusIndex ? COLORS.primary : COLORS.gray }]} />
        )}
      </View>

      <View style={styles.labelBox}>
        {index % 2 !== 0 && (
          <>
            <Text style={styles.labelTextRight}>{step.label}</Text>
            {step.subText && <Text style={styles.labelSubTextRight}>{step.subText}</Text>}
          </>
        )}
        <Text style={styles.labelSubTextRight}></Text>
        {step.key === "shipped" && index === currentStatusIndex && (
          <Pressable style={styles.trackBtn} onPress={() => router.push({ pathname: "/(tabs)/cart/trackOrderMap" })}>
            <Text style={styles.trackBtnText}>Track on map</Text>
          </Pressable>
        )}
      </View>
    </View>
  ))}
</View>

	</ScrollView>
)}
export default OrderStatusScreen