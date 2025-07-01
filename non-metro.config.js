const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to handle the module resolution
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

// Add this to handle the expo-router entry point
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'expo-router/entry') {
    return {
      filePath: require.resolve('expo-router/entry'),
      type: 'sourceFile',
    };
  }
  // Handle LoadingView resolution
  if (moduleName === 'react-native/Libraries/Utilities/LoadingView') {
    return {
      filePath: require.resolve('react-native/Libraries/Components/LoadingView'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Add extraNodeModules to help with resolution
config.resolver.extraNodeModules = {
  'react-native': require.resolve('react-native'),
  '@expo/metro-runtime': require.resolve('@expo/metro-runtime'),
  '@react-navigation/native': require.resolve('@react-navigation/native'),
  '@react-navigation/bottom-tabs': require.resolve('@react-navigation/bottom-tabs'),
  '@react-navigation/native-stack': require.resolve('@react-navigation/native-stack'),
};

// Add this to handle the cache
config.cacheVersion = '1.0';
config.resetCache = true;

// Add this to handle the max workers
config.maxWorkers = 4;

module.exports = config; 