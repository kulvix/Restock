import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CheckOutScreen.styles';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZES } from '../../../constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CartFooter from '../cartFooter/CartFooter';
import { AuthContext } from '../../../components/contexts/AuthContext';
import { getBaseURL } from '../../../utils/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';




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
				<TouchableOpacity style={styles.card(item.id, selectedDelivery)} onPress={() => {setSelectedDelivery(item.id)}}>
					<TouchableOpacity style={styles.checkbox(item.id, selectedDelivery)} 
						onPress={() => {setSelectedDelivery(item.id)}}>
					</TouchableOpacity>
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
					<TouchableOpacity
            style={styles.editBtnBox}
            onPress={() => router.push("/(tabs)/profile/billingInformation")}
          >
						<Ionicons name='pencil' style={styles.editBtnText} />
					</TouchableOpacity>
				</TouchableOpacity>
	)
}


const PaymentCard = ({item, selectedPayment, setSelectedPayment}) => {

	return (
		<TouchableOpacity style={styles.paymentCard(item.id, selectedPayment)} onPress={() => {setSelectedPayment(item.id)}}>
			<View style={styles.paymentCardDetailBox}>
				<Image source={item.image} style={styles.imageIcon} />
				<View>
					<Text style={styles.paymentCardTitleText}>{item.name}</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.paymentCheckbox(item.id, selectedPayment)} 
				onPress={() => {setSelectedPayment(item.id)}}>
			</TouchableOpacity>
		</TouchableOpacity>
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
	const { item } = useLocalSearchParams();
  const { user, logout } = useContext(AuthContext);

  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(true);

	const formattedAmount = JSON.parse(item);
	const amount = currencyToNumber(JSON.parse(item));
	// console.log(amount);

  const BASE_URL = getBaseURL();
  const SERVER_URL = `${BASE_URL}/server`;

	const router = useRouter();
	const [selectedDelivery, setSelectedDelivery] = useState();
	const [selectedPayment, setSelectedPayment] = useState(1);

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


    
  // console.log(addresses);




	return (
		<View style={{flex: 1}}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.sectionTitle}>Deliver to</Text>
					{
            user ? (
              addresses ? (
                addresses.map((item) => (
                  <>
                    <DeliveryCard
                      key={item.id} // Unique key for performance
                      item={item}
                      selectedDelivery={selectedDelivery}
                      setSelectedDelivery={setSelectedDelivery}
                    />

                    {/* <TouchableOpacity
                      style={styles.card(1000, selectedDelivery)}
                      onPress={() => router.push("/(tabs)/profile/billingInformation")}>
                      <View style={styles.cardDetailBox}>
                        <Text style={styles.cardTitleText}>Add Delivery location</Text>
                      </View>
                      <TouchableOpacity style={styles.editBtnBox}>
                        <Ionicons name='add-outline' style={styles.editBtnText} />
                      </TouchableOpacity>
                    </TouchableOpacity> */}
                  </>
                ))
              ) : (
                <TouchableOpacity
                  style={styles.card(item.id, selectedDelivery)}
                  onPress={() => router.push("/(tabs)/profile/billingInformation")}>
                  <View style={styles.cardDetailBox}>
                    <Text style={styles.cardTitleText}>Add Delivery location</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editBtnBox}
                    onPress={() => router.push("/(tabs)/profile/billingInformation")}
                  >
                    <Ionicons name='add-outline' style={styles.editBtnText} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )              
            ) : (
              <>
                <TouchableOpacity
                  style={styles.card(item.id, selectedDelivery)}
                  onPress={() => router.push("/(tabs)/profile/auth/login")}
                >
                  <View style={styles.cardDetailBox}>
                    <Text style={styles.cardTitleText}>Login to checkout</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editBtnBox}
                    onPress={() => router.push("/(tabs)/profile/auth/login")}
                  >
                    <Ionicons name='add-outline' style={styles.editBtnText} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </>
            )
          }

					<Text style={styles.sectionTitle}>Payment method</Text>

					{PAYMENT_METHODS.map((item) => {
						return (
							<PaymentCard
								key={item.id}
								item={item}
								selectedPayment={selectedPayment}
								setSelectedPayment={setSelectedPayment}
							/>
						);
					})}

				</ScrollView>	
			
			</View>

			<CartFooter totalAmount={formattedAmount} btnText={'Pay'} btnRoute={'/(tabs)/cart/payment'} screen={"checkout"} />
		</View>
	)
}
export default CheckOutScreen