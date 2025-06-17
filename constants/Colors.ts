/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#0F1C47CC',
    redText: '#FF3126',
    reversedText: '#ECEDEE', // Texto para fundos escuros
    background: '#E2E7F8',
    tint: tintColorLight,
    icon: '#687076',
    brand: '#DA1984',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    buttonBackground: '#EAEAEA', // Cor de fundo dos botões no tema claro
    buttonBackgroundBlue: '#007aff',
    activeBackground: '#fff',
    lightPink: '#D034811A',
  },
  dark: {
    text: '#ECEDEE',
    redText: '#FF3126',
    reversedText: '#11181C', // Texto para fundos claros
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    brand: '#DA1984',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    buttonBackground: '#1E1E1E', // Cor de fundo dos botões no tema escuro
    buttonBackgroundBlue: '#007aff',
    activeBackground: '#2C2C2D',
    lightPink: '#D034811A',
  },
};