import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemeContext } from "../themeProvider/themeProvider.js";

export const Header = ({ isTracking, toggleSidebar }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? '#212D3B' : '#ffffff' }]}>
      {/* آیکون منو */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuIcon}>
        <View>
              <Image
                 source={require('../../assets/dark/menu-icon.png')}
                 style={[styles.whiteLogo, { display: isDarkMode ? 'flex' : 'none' }]}
              />
              <Image
                  source={require('../../assets/light/menu.png')}
                  style={[styles.logo, { display: isDarkMode ? 'none' : 'flex' }]}
              />
        </View>
      </TouchableOpacity>

      {/* لوگو */}
      <View style={styles.logoContainer}>
        <Image
           source={require('../../assets/light/horizontal-logo.png')}
           style={[styles.whiteLogo, { display: isDarkMode ? 'flex' : 'none' }]}
        />
        <Image
           source={require('../../assets/dark/horizontal-logo-dark.png')}
           style={[styles.logo, { display: isDarkMode ? 'none' : 'flex' }]}
        />
      </View>

      {/* عکس پروفایل */}
      <TouchableOpacity style={ isTracking ? styles.profileContainer : styles.profile }>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    height: 60,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 4
  },
  menuIcon: {
    padding: 5,
  },
  menuText: {
    fontSize: 24,
    color: '#333',
  },
  darkMenuText: {
    fontSize: 24,
    color: '#f8f8f8'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    borderWidth: 2,
    borderColor: '#43CE68',
    borderRadius: 22
  },
  profile: {
    borderWidth: 2,
    borderColor: '#c1121f',
    borderRadius: 22
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // دایره‌ای کردن تصویر
    borderWidth: 1,
    borderColor: '#ddd',
  },
});