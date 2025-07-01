import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import styles from './CheckOutScreen.styles';
import { ScrollView, Pressable, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, FONT, SIZES } from '../../../constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CartFooter from '../cartFooter/CartFooter';
import { AuthContext } from '../../../components/contexts/AuthContext';
import { getBaseURL } from '../../../utils/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCart } from '../../../components/contexts/CartContext';
import { Image } from 'expo-image';
import { checkUserLocation } from '../../../utils/api';
import CustomAlert from '../../../components/common/customeAlert';
import MapPreview from '../../common/mapPreview';

const DELIVERY_LOCATIONS = [
	{
		id : 1,
		name: 'Dr. Marchus Ezema',
		address: 'No. 61 Ezeako Street, Achara Layout, Enugu',
		phone: '08103045678',
	},
	// {
	// 	id : 3,
	// 	name: 'Madam Ewe Akuudo',
	// 	address: 'No. 191 Ekwulobia Street, New Haven, Enugu',
	// 	phone: '08103045678',
	// },
	{
		id : 2,
		name: 'Sydney Eze',
		address: 'No. 65 Alo Street, Enu-ana, Enugu',
		phone: '08103045678',
	}
]

const PAYMENT_METHODS = [
  {
		id : 1,
		name : 'Debit Card',
		image: require('../../../assets/images/debitcard.png'),
		details: '**** **** **** ****',
	},	
]



const DeliveryCard = ({item, selectedDelivery, setSelectedDelivery}) => {

  const router = useRouter();
	return (
				<Pressable style={styles.card(item.id, selectedDelivery)} onPress={() => {setSelectedDelivery(item.id)}}>
					<Pressable style={styles.checkbox(item.id, selectedDelivery)} 
						onPress={() => {setSelectedDelivery(item.id)}}>
					</Pressable>
					<View style={styles.cardDetailBox}>
						<Text style={styles.cardTitleText}>{item.name}</Text>

            <View style={styles.cardSubtitleBox}>
              <Ionicons name='location' style={styles.cardSubtitleIcon} />
              <Text style={styles.cardSubtitleText}>
                {item.address_line1} {item.address_line2}, {item.city}, {item.state}
              </Text>
            </View>
            
            <View style={styles.cardSubtitleBox}>
              <Ionicons name='call' style={styles.cardSubtitleIcon} />
              <Text style={styles.cardSubtitleText}>
              {item.phone_of_contact_person}
              </Text>
            </View>
					</View>
					<Pressable
            style={styles.editBtnBox}
            onPress={() => router.push("/settings/billingInformation")}
          >
						<Ionicons name='pencil' style={styles.editBtnText} />
					</Pressable>
				</Pressable>
	)
}


const PaymentCard = ({item, selectedPayment, setSelectedPayment}) => {

	return (
		<Pressable style={styles.paymentCard(item.id, selectedPayment)} onPress={() => {setSelectedPayment(item.id)}}>
			<View style={styles.paymentCardDetailBox}>
				<Image source={item.image} style={styles.imageIcon} />
				<View>
					<Text style={styles.paymentCardTitleText}>{item.name}</Text>
				</View>
			</View>
			<Pressable style={styles.paymentCheckbox(item.id, selectedPayment)} 
				onPress={() => {setSelectedPayment(item.id)}}>
			</Pressable>
		</Pressable>
	)
}

const currencyToNumber = (currencyString) => {
	// Remove the currency symbol (e.g., "NGN ") and any commas
	const cleanedString = currencyString.replace(/NGN\s|,/g, '').trim();
	
	// Convert to number
	const numberValue = parseFloat(cleanedString);
	
	return isNaN(numberValue) ? 0 : numberValue; // Return 0 if conversion fails
};


const CheckOutScreen = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

	const { item } = useLocalSearchParams();
  const { cart, clearCart } = useCart();
  const { user } = useContext(AuthContext);

  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(true);
  
	const cartTotals = JSON.parse(item);
  // console.log(cartTotals);
	const amount = cartTotals.grandTotalWithDiscount;

  const BASE_URL = getBaseURL();
  const SERVER_URL = `${BASE_URL}/auth`;

	const router = useRouter();
	const [selectedDelivery, setSelectedDelivery] = useState(null);
  
	const [selectedPayment, setSelectedPayment] = useState(1);

  useEffect(() => {
    if(cart == {}) {
      router.replace('(tabs)/cart');
    }
  },[])
  useEffect(() => {
    if (user == [] || !user) return;
    const fetchBillingAddresses = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/billingaddresses/${user.id}`);
        setAddresses(response.data);
      } catch (error) {
        if (error.response) {
          setAddresses(null)
          console.log("Error:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      } finally {
        setLoading(false);
      }
      
    };
    if (user.id) fetchBillingAddresses();

  }, [user]);


  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setSelectedDelivery(addresses[0].id);
    }
  }, [addresses]);



useEffect(() => {
  const validateLocation = async () => {
    try {
      const data = await checkUserLocation();
      if (data.allowed) {
        setIsAllowed(true);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setCheckingLocation(false);
    }
  };

  validateLocation();
}, []);




	return (
    
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        checkingLocation ? (
          <ActivityIndicator size="large" />
        ) : !isAllowed ? (
          // <View style={styles.locationErrorBox}>
          //   <Text style={styles.message}>We currently don’t support checkout in your region.</Text>
          //   <Pressable onPress={() => router.back()} style={styles.btn}>
          //     <Text style={styles.btnText}>Back to cart</Text>
          //   </Pressable>
          // </View>
          <View style={styles.locationErrorBox}>
            <Text style={styles.message}>
              We currently don’t support checkout in your region.
            </Text>

            <View style={styles.btnBox}>
              <Pressable onPress={() => router.back()} style={styles.btn}>
                <Text style={styles.btnText}>Back to cart</Text>
              </Pressable>

              <Pressable onPress={() => setShowAlert(true)} style={styles.mapBtn}>
                <Text style={styles.mapBtnText}>View delivery area</Text>
              </Pressable>
            </View>
          </View>
        )  : (
          <>
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Deliver to</Text>
                {
                  user ? (
                    addresses ? (
                      addresses.map((item) => (
                        <View key={item.id}>
                          <DeliveryCard
                            item={item}
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={setSelectedDelivery}
                          />
                        </View>

                          // <Pressable
                          //   style={styles.card(1000, selectedDelivery)}
                          //   onPress={() => router.push("settings/billingInformation")}>
                          //   <View style={styles.cardDetailBox}>
                          //     <Text style={styles.cardTitleText}>Add Delivery location</Text>
                          //   </View>
                          //   <Pressable style={styles.editBtnBox}>
                          //     <Ionicons name='add-outline' style={styles.editBtnText} />
                          //   </Pressable>
                          // </Pressable>
                        
                      ))
                    ) : (
                      <Pressable
                        style={styles.card(item.id, selectedDelivery)}
                        onPress={() => router.push("/settings/billingInformation")}>
                        <View style={styles.cardDetailBox}>
                          <Text style={styles.cardTitleText}>Add Delivery location</Text>
                        </View>
                        <Pressable
                          style={styles.editBtnBox}
                          onPress={() => router.push("/settings/billingInformation")}
                        >
                          <Ionicons name='add-outline' style={styles.editBtnText} />
                        </Pressable>
                      </Pressable>
                    )              
                  ) : (
                    <>
                      <Pressable
                        style={styles.card(item.id, selectedDelivery)}
                        onPress={() => router.replace("/(tabs)/profile")}
                      >
                        <View style={styles.cardDetailBox}>
                          <Text style={styles.cardTitleText}>Login to checkout</Text>
                        </View>
                        <View
                          style={styles.editBtnBox}
                        >
                          <Ionicons name='add-outline' style={styles.editBtnText} />
                        </View>
                      </Pressable>
                    </>
                  )
                }

                {/* <Text style={styles.sectionTitle}>Payment method</Text>

                {PAYMENT_METHODS.map((item) => {
                  return (
                    <PaymentCard
                      key={item.id}
                      item={item}
                      selectedPayment={selectedPayment}
                      setSelectedPayment={setSelectedPayment}
                    />
                  );
                })} */}

              </ScrollView>
              
            </View>

            <CartFooter
              cartTotals={cartTotals}
              // totalAmount={amount}
              btnText={'Pay'}
              btnRoute={'/(tabs)/cart/payment'}
              screen={"checkout"}
              selectedDelivery={selectedDelivery}
              />
          </>
        )
      }
      <CustomAlert
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Delivery areas in Enugu"
        // message="Independence Layout, New Haven, Uwani, Ogui, Coal Camp, G.R.A, Achi Street, Amechi Road, Garriki, Achara Layout, Agbani Road, Maryland, Thinkers Corner, Holy Ghost, Trans Ekulu, Topland, New Layout, Mount Street, Ziks Avenue, Ugwuaji"
        // icon="✅"
        buttonLabel="Alright"
      >
        <MapPreview />
      </CustomAlert>
		</View>
	)
}
export default CheckOutScreen