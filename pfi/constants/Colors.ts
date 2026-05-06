const tintColorLight = '#6E1E8C';  // foncé pour light
const tintColorDark = '#B85FD9';   // pale pour dark

export default {
  light: {
    text: '#000',
    background: '#fff',
    backdrop: '#00000080', 
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    backdrop: '#ffffff20',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
