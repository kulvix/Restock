import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions, } from 'react-native';
import { COLORS } from '../../constants';



export default function Paginator ({ data, scrollX }) {
	const { width } = useWindowDimensions();
	return (
		<View style={styles.container}>

			{data.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: 'clamp',
				});
				
				return <Animated.View style={[styles.dot, { width: dotWidth, opacity, }]} key={i.toString()} />;
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
	},
	dot: {
		height: 7,
		borderRadius: 5,
		backgroundColor: COLORS.primary,
		marginHorizontal: 4,
	}
});