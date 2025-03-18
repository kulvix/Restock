import 'react-native-gesture-handler'; // Required at the top for gesture support
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { AuthProvider } from '../components/contexts/AuthContext';
import { ProductProvider } from "../components/contexts/ProductContext";
import { BundleProvider } from "../components/contexts/BundleContext";
import { CartProvider } from '../components/contexts/CartContext';
import { NotificationProvider } from '../components/contexts/NotificationContext';

export default function RootStack () {
    return (
			<GestureHandlerRootView style={{ flex: 1 }}>  
				<SafeAreaProvider>
          <NotificationProvider>
            <AuthProvider>
              <ProductProvider>
                <BundleProvider>
                  <CartProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                  </CartProvider>
                </BundleProvider>
              </ProductProvider>
            </AuthProvider>
          </NotificationProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
    )
}