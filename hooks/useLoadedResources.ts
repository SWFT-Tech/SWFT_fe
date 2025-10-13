import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// CRUCIAL: Prevents the splash screen from auto-hiding before we've loaded assets.
SplashScreen.preventAutoHideAsync();

/**
 * Custom hook to load fonts and perform any other initial resource setup.
 */
export function useLoadedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts required for the app (FontAwesome is needed for most icons)
        await Font.loadAsync({
          ...FontAwesome.font,
          'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'), // NOTE: Update this path if you don't use this font
        });
      } catch (e) {
        // Log errors but continue
        console.warn('Error loading resources:', e);
      } finally {
        setLoadingComplete(true);
        // CRUCIAL: Hide the splash screen once loading is complete
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
