import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
    title: { fontSize: 32, fontWeight: 'bold', fontFamily:'EagleLake' },
    subtitle: { fontSize: 20, fontWeight: '600', opacity: 0.6, fontFamily: 'Macondo'},
    body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Macondo' },
    number: { fontSize: 48, fontWeight: 'bold', fontFamily: 'Macondo' },
};