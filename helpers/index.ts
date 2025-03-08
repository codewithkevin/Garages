import { useColorScheme } from "react-native";


export const useGetThemeColor = () => {
    const colorScheme = useColorScheme();
    const isWhiteTheme = colorScheme === 'light';

    return { isWhiteTheme, colorScheme };
};

export const greetingMessage = () => {
    const date = new Date();
    const hour = date.getHours();
    let message = '';
    if (hour < 12) {
        message = 'Good morning 🌞';
    } else if (hour < 18) {
        message = 'Good afternoon 🌤️';
    } else {
        message = 'Good evening 🌜';
    }
    return message;
};