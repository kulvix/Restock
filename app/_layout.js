import 'react-native-gesture-handler'; // Required at the top for gesture support
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";

export default function RootStack () {
    return (
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<Stack screenOptions={{ headerShown: false }} />
				</SafeAreaProvider>
			</GestureHandlerRootView>
    )
}