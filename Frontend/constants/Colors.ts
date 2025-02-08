const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const greenPrimary = '#2E7D32';
const greenLight = '#81c784';
const greenBackground = '#F1F8E9';
const greenText = '#1B5E20';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    // Profile specific colors
    profileHeroBg: greenPrimary,
    profileHeroText: '#FFFFFF',
    profileBackground: greenBackground,
    profileText: greenText,
    profileIcon: greenPrimary,
    profileBorder: '#C8E6C9',
    profileSwitchTrackOff: '#767577',
    profileSwitchTrackOn: greenLight,
    profileSwitchThumbOff: '#f4f3f4',
    profileSwitchThumbOn: greenPrimary
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // Profile specific colors
    profileHeroBg: greenPrimary,
    profileHeroText: '#FFFFFF',
    profileBackground: '#1A1A1A',
    profileText: greenLight,
    profileIcon: greenLight,
    profileBorder: '#2C2C2C',
    profileSwitchTrackOff: '#767577',
    profileSwitchTrackOn: greenPrimary,
    profileSwitchThumbOff: '#f4f3f4',
    profileSwitchThumbOn: greenLight
  },
};
