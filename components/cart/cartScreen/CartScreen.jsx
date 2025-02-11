import { React, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CartScreen.style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../../../constants';
import CartFooter from './../cartFooter/CartFooter';
import { useRouter } from 'expo-router';
import { useCart } from '../../../components/contexts/CartContext';
import CartTabs from '../cartTabs/CartTabs';
import CartEmpty from '../cartEmpty/CartEmpty';
import CartListItem from '../cartListItem/CartListItem';
import LottieView from 'lottie-react-native';

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

const Item = ({ item, updateCart }) => {

  return (
    <CartListItem item={item} />
  );
};

const formatCurrency = (amount) => {
  return `NGN ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const CartScreen = () => {
  const router = useRouter();
  
  const [selectedTab, setSelectedTab] = useState(1);

  const { cart, updateCart } = useCart();
  const [isEmpty, setIsEmpty] = useState(true);
  const groupedItems = groupCartItems(cart);
  // Calculate subtotal, shipping fee, VAT, and total amount
  const subtotal = groupedItems.reduce((total, item) => {
    const itemTotal = parseFloat(item.price) * (item.quantity || 0); 
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);
  const shippingFee = 1500;
  const vat = subtotal * 0.075; // 7.5% VAT
  const totalAmount = subtotal + shippingFee + vat;
  // console.log("Se :",selectedTab)
  return (
    <>
      <View style={{padding: SIZES.medium, paddingTop: 0}}>
        <CartTabs 
          selectedTab = {selectedTab} 
          setSelectedTab = {setSelectedTab}
          // setSelectedTabScreen = {setSelectedTabScreen}
        />
      </View>
      {
      selectedTab === 1 ? (
        groupedItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
              {
                groupedItems.map((item) => (
                  <CartListItem key={item.type_name} item={item} updateCart={updateCart} />
                ))
              }
            </ScrollView>
            <CartFooter 
              subtotal={formatCurrency(subtotal)} 
              shippingFee={formatCurrency(shippingFee)} 
              vat={formatCurrency(vat)} 
              totalAmount={formatCurrency(totalAmount)} 
              btnText={'Proceed to checkout'} btnRoute={'/(tabs)/cart/checkOut'}
              screen="cart"
            />
          </View>
        )
      ) : (
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
            <TouchableOpacity style={styles.btn} onPress={() => router.replace("(tabs)/home")}>
              <Text style={styles.btnText}>Explore Products</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
      }
    </>
  );
};

export default CartScreen;

  // }

  // if (selectedTabScreen === 'Current Orders') {
  //   if (isEmpty) {
  //     return (
  //       <View>
  //         <Text>No order in progress...</Text>
  //         <Text>Your order in progress will appear here.</Text>
  //         <TouchableOpacity onPress={() => { setIsEmpty(false); }}><Text>Switch</Text></TouchableOpacity>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: SIZES.medium, paddingTop: 0 }}>
  //         {CURRENT_ORDERS.map((item) => (
  //           <CurrentOrders key={item.id} item={item} />
  //         ))}
  //       </ScrollView>
  //     );
  //   }
  // }

  //return; // To handle cases where selectedTabScreen is neither 'My Cart' nor 'Current Orders'
