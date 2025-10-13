// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// // App.tsx
// // App.tsx
// import React from 'react';
// import 'expo-router/entry';
// import { Slot, SplashScreen } from 'expo-router'; // 👈 Import Slot here
// import { useLoadedResources } from './hooks/useLoadedResources'; 

// // CRUCIAL: Prevents the splash screen from auto-hiding before we've loaded assets.
// SplashScreen.preventAutoHideAsync();

// /**
//  * RootLayout renders the Slot component, which displays the current route component.
//  * It's essentially loading the content defined in app/_layout.tsx (and then index.tsx).
//  */
// function RootLayout() {
//   // Slot renders the matching route from the app directory (app/index.tsx in your case)
//   return <Slot />; 
// }

// export default function App() {
//   // Use the loading hook you defined
//   const isLoadingComplete = useLoadedResources(); 

//   if (!isLoadingComplete) {
//     // Return null while assets/fonts are loading
//     return null; 
//   }

//   // Once loading is complete, render the RootLayout wrapper
//   return <RootLayout />; 
// }

// App.tsx (Root Directory)
import 'expo-router/entry';

