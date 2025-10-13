import { useColorScheme as useDeviceColorScheme } from "react-native";

/**
 * Custom hook to get the user's preferred color scheme (light or dark).
 * It defaults to 'light' if the device setting cannot be determined.
 */
export function useColorScheme() {
  // useDeviceColorScheme is a standard React Native hook.
  // We use the nullish coalescing operator (??) to ensure a default value of 'light'.
  return useDeviceColorScheme() ?? 'light';
}