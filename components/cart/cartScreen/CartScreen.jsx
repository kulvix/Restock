import { React, useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CartScreen.style';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../../constants';
import CartFooter from './../cartFooter/CartFooter';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../../../components/contexts/CartContext';
import CartTabs from '../cartTabs/CartTabs';
import CartEmpty from '../cartEmpty/CartEmpty';
import CartListItem from '../cartListItem/CartListItem';
import CartBundleItem from '../cartBundleItem/CartBundleItem';
import LottieView from 'lottie-react-native';
import { getBaseURL } from '../../../utils/apiConfig';

import { AuthContext } from '../../../components/contexts/AuthContext';
import axios from 'axios';

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

// Group items by type_name and aggregate their quantities
const groupCartItems = (cart) => {
  const groupedItems = {};
  Object.values(cart).forEach((item) => {
    // Ensure that item.price and item.quantity are numbers
    if (groupedItems[item.type_name]) {
      groupedItems[item.type_name].quantity += item.quantity;
    } else {
      groupedItems[item.type_name] = { ...item };
    }
  });
  return Object.values(groupedItems);
};


const formatCurrency = (amount) => {
  return `\u20A6${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};






const CartScreen = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { targetTab } = useLocalSearchParams();
  // const [selectedTab, setSelectedTab] = useState(targetTab ? targetTab : 1);
  const [selectedTab, setSelectedTab] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const { cart, updateCart } = useCart();
  const [isEmpty, setIsEmpty] = useState(true);
  const groupedItems = groupCartItems(cart);
  
  const subtotal = groupedItems.reduce((total, item) => {
    const itemTotal = parseFloat(item.price) * (item.quantity || 0); 
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);
  // const shippingFee = 1500 + (0.25 * subtotal);
  // const vat = subtotal * 0.075; // 7.5% VAT
  // const totalAmount = subtotal + shippingFee + vat;

  
  







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



  // const cartArray = Object.values(cart);
  // Update cart items with discounted prices
  const cartArray = Object.values(cart).map(item => ({
    ...item,
    discountedPrice: calculateDiscountedPrice(
      parseFloat(item.price) || 0,
      parseFloat(item.discount) || 0
    )
  }));
  
  // console.log("Cart Array: ", cartArray);




  // const discountedPriceObject = calculateDiscountedPrice(parseFloat(item.price) || 0, parseFloat(item.discount) || 0);
  // console.log(discountedPriceObject); return;




  const calculateCartTotals = (cartArray) => {
    let subtotalWithoutDiscount = 0;
    let subtotalWithDiscount = 0;
    let totalWithoutDiscount = 0;
    let totalWithDiscount = 0;
  
    cartArray.forEach(item => {
      const originalPrice = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 1;
      const finalPrice = item.discountedPrice?.finalPrice || originalPrice;
  
      // Calculate subtotals (excluding quantity)
      subtotalWithoutDiscount += originalPrice;
      subtotalWithDiscount += finalPrice;
  
      // Calculate totals (including quantity)
      totalWithoutDiscount += originalPrice * quantity;
      totalWithDiscount += finalPrice * quantity;
    });
  
    // VAT (7.5%) calculations
    const vatWithoutDiscount = totalWithoutDiscount * 0.075;
    const vatWithDiscount = totalWithDiscount * 0.075;
  
    // Shipping Fee
    const percentageShippingFee = totalWithoutDiscount * 0.01;
    const transactionFee = totalWithoutDiscount * 0.02;
    const vatOnFee = transactionFee * 0.075;
    const flutterwaveTotalFee = transactionFee + vatOnFee;

    const shippingFee = 1000 + percentageShippingFee + flutterwaveTotalFee;
  
    // Final Total with VAT & Shipping
    // const grandTotalWithoutDiscount = totalWithoutDiscount + vatWithoutDiscount + shippingFee;
    // const grandTotalWithDiscount = totalWithDiscount + vatWithDiscount + shippingFee;
    const grandTotalWithoutDiscount = totalWithoutDiscount + shippingFee;
    const grandTotalWithDiscount = totalWithDiscount + shippingFee;
  
    return {
      subtotalWithoutDiscount,
      subtotalWithDiscount,
      totalWithoutDiscount,
      totalWithDiscount,
      vatWithoutDiscount,
      vatWithDiscount,
      shippingFee,
      grandTotalWithoutDiscount,
      grandTotalWithDiscount
    };
  };
  
  // Calculate totals
  const cartTotals = calculateCartTotals(cartArray);













  const getUserOrders = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/orders/${userId}`);
      // console.log('User Orders:', response.data);
      setCurrentOrders(response.data.orders);
    } catch (error) {
      // console.error('Error fetching user orders:', error.response?.data || error.message);
      console.log('Error fetching user orders:', error.response?.data || error.message);
    }
  }

  const filterOrders = (orders, setActiveOrders, setOrderHistory) => {
    const activeStatuses = ["processing", "pending", "shipped"];
    const activeOrders = orders.filter(order => activeStatuses.includes(order.status));
    const orderHistory = orders.filter(order => !activeStatuses.includes(order.status));
  
    setActiveOrders(activeOrders);
    setOrderHistory(orderHistory);
  };

  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        await getUserOrders(user.id);
      };
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (currentOrders?.length) {
      filterOrders(currentOrders, setActiveOrders, setOrderHistory);
    }
  }, [currentOrders]);

  useEffect(() => {
    if (targetTab) {
      setSelectedTab(Number(targetTab));
    }
  }, [targetTab]);

  // console.log("Active Orders: ", activeOrders);

  const OrderCard = ({ order }) => {
    return (
      <Pressable style={styles.card}
        onPress={() => {
          router.push({
            pathname: '(tabs)/cart/orderStatus',
            params: { order: JSON.stringify(order)}, 
          })
        }}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order ID: #{order.order_id}</Text>
          <View style={styles.trackOrderBtn}>
            <Text style={styles.trackOrderBtnText}>Track order</Text>
          </View>
        </View>
        <View style={styles.orderDetailBox}>
          <Text style={styles.text}>Grand total: {formatCurrency(Number(order.grand_total))}</Text>
          <Text style={styles.text}>Total: {formatCurrency(Number(order.total))}</Text>
          <Text style={styles.text}>Subtotal: {formatCurrency(Number(order.subtotal))}</Text>
          <Text style={styles.text}>VAT: {formatCurrency(Number(order.vat))}</Text>
          <Text style={styles.text}>Delivery Fee: {formatCurrency(Number(order.delivery_fee))}</Text>
        </View>
        <View style={styles.orderDetailFooter}>
          <Text style={[styles.status, order.status === 'pending' ? styles.pending : styles.completed]}>
            Status: {order.status}
          </Text>
          <Text style={[styles.paymentStatus, order.payment_status === 'paid' ? styles.paid : styles.unpaid]}>
            Payment: {order.payment_status}
          </Text>
        </View>
        <Text style={styles.date}>Ordered on: {new Date(order.created_at).toDateString()}</Text>
      </Pressable>
    );
  };

  // console.log("Grouped Items: ",groupedItems);
  // console.log('cartTotals: ',cartTotals)
  return (
    <>
      <View style={{padding: SIZES.medium, paddingTop: 0}}>
        <CartTabs 
          selectedTab = {selectedTab} 
          setSelectedTab = {setSelectedTab}
        />
      </View>
      {
      selectedTab === 1 ? (
        // CART
        cartArray.length === 0 ? (
          <CartEmpty />
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
              {
                cartArray.map((item) => {
                  if (item.isBundle) {
                    return <CartBundleItem key={item.cart_item_id} item={item} updateCart={updateCart} />
                  } else {
                    return <CartListItem key={item.cart_item_id} item={item} updateCart={updateCart} />
                  }
                })
              }
            </ScrollView>
            <CartFooter 
              cartTotals={cartTotals}
              btnText={'Proceed to checkout'} btnRoute={'/(tabs)/cart/checkOut'}
              screen="cart"
            />
          </View>
        )
      ) : selectedTab === 2 ? (
        // CURRENT ORDERS
        user ? (
          activeOrders.length === 0 ? (
            <View style={styles.noOrdersContainer}>
              <View style={styles.innerContainer}>
                <LottieView 
                  source={require('../../../assets/animations/waiting-for-order.json')}
                  autoPlay
                  loop
                  style={[styles.emptyImage, { width: 250, height: 250, alignSelf: 'center' }]}
                />
                <Text style={styles.noOrdersTitleText}>No order in progress...</Text>
                <Text style={styles.noOrdersDesc}>Looks like you have not placed any orders yet.</Text>
                <Pressable style={styles.btn} onPress={() => router.replace("(tabs)/home")}>
                  <Text style={styles.btnText}>Explore Products</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
                {
                  activeOrders.map((order) => (
                    <OrderCard key={order.order_id} order={order} />
                  ))
                }
              </ScrollView>
            </View>
          )
        ) : (
          <View style={styles.noOrdersContainer}>
            <View style={styles.innerContainer}>
              <LottieView 
                source={require('../../../assets/animations/login.json')}
                autoPlay
                loop
                style={[styles.emptyImage, { width: 250, height: 250, alignSelf: 'center' }]}
              />
              <Text style={styles.noOrdersTitleText}>Login to view current orders</Text>
              <Pressable style={styles.btn} onPress={() => router.replace("(tabs)/profile/auth/login")}>
                <Text style={styles.btnText}>Click here to login</Text>
              </Pressable>
            </View>
          </View>
        )
      ) : (
        // ORDER HISTORY
        user ? (
          orderHistory.length === 0 ? (
            <View style={styles.noOrdersContainer}>
              <View style={styles.innerContainer}>
                <LottieView 
                  source={require('../../../assets/animations/waiting-for-order.json')}
                  autoPlay
                  loop
                  style={[styles.emptyImage, { width: 250, height: 250, alignSelf: 'center' }]}
                />
                <Text style={styles.noOrdersTitleText}>No order history</Text>
                <Text style={styles.noOrdersDesc}>All your order history will appear here.</Text>
                <Pressable style={styles.btn} onPress={() => router.replace("(tabs)/home")}>
                  <Text style={styles.btnText}>Explore Products</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
                {
                  orderHistory.map((order) => (
                    <OrderCard key={order.order_id} order={order} />
                  ))
                }
              </ScrollView>
            </View>
          )
        ) : (
          <View style={styles.noOrdersContainer}>
            <View style={styles.innerContainer}>
              <LottieView 
                source={require('../../../assets/animations/login.json')}
                autoPlay
                loop
                style={[styles.emptyImage, { width: 250, height: 250, alignSelf: 'center' }]}
              />
              <Text style={styles.noOrdersTitleText}>Login to view order history</Text>
              <Pressable style={styles.btn} onPress={() => router.replace("(tabs)/profile/auth/login")}>
                <Text style={styles.btnText}>Click here to login</Text>
              </Pressable>
            </View>
          </View>
        )
      )
      }
    </>
  );
};

export default CartScreen;
