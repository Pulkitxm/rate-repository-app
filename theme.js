import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        appBarBg: '#24292e',
        appBarText: '#fff',
        appBarTextWeight: '600',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: Platform.select({
        android: "Sans-serif",
        ios: "Roboto",
        default:"System"
    }),
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;
