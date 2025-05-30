import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, I18nManager } from 'react-native';
import { ThemeContext } from "../themeProvider/themeProvider.js";

export const Sidebar = ({ isTracking, isOpen, toggleSidebar, firstName, lastName, mobileNumber, navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(isOpen ? 0 : -250)).current;
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const colors = useMemo(
    () => ({
      background: isDarkMode ? '#1C242F' : '#fff',
      text: isDarkMode ? '#f8f8f8' : '#000000',
      border: isDarkMode ? '#f8f8f8' : '#ddd',
    }),
    [isDarkMode]
  );

  const textStyle = useMemo(
    () => [styles.name, { color: colors.text }],
    [colors.text]
  );

  const menuItemsGroup1 = [
     { title: 'ماموریت ها', 
        icon: isDarkMode ? require('../../assets/mission-dark.png') : require('../../assets/mission.png'), 
        screen: 'missionScreen' 
      },
      { title: 'عملیات',
        icon: isDarkMode ? require('../../assets/operation-dark.png') : require('../../assets/operation.png'), 
        screen: 'operationScreen' 
      },
      { title: 'موقعیت', 
        icon: isDarkMode ? require('../../assets/location-dark.png') : require('../../assets/location.png'), 
        screen: 'cartableScreen' 
      },
  ];

  const menuItemsGroup2 = [
      { title: 'کارتابل', 
        icon: isDarkMode ? require('../../assets/cartable-dark.png') : require('../../assets/cartable.png'), 
        screen: 'cartableScreen' 
      },
      { title: 'مرکز تماس', 
        icon: isDarkMode ? require('../../assets/contact-dark.png') : require('../../assets/contact.png'), 
        screen: 'contactScreen' 
      },
      { title: 'پیام ها', 
        icon: isDarkMode ? require('../../assets/message-dark.png') : require('../../assets/message.png'), 
        screen: 'contactScreen' 
      },
      { title: 'تنظیمات', 
        icon: isDarkMode ? require('../../assets/setting-dark.png') : require('../../assets/setting.png'), 
        screen: 'settingsScreen' 
      },
  ];

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View
      style={[
        styles.sidebar,
        { transform: [{ translateX: slideAnim }], backgroundColor: colors.background },
      ]}
    >
      {/* هدر سایدبار */}
      <View style={[styles.header, {backgroundColor: isDarkMode ? '#233040' : '#f8f8f8'}]}>
        <View style={styles.sectionTwo}>
          <View>
             <TouchableOpacity style={styles.darkmode} onPress={toggleTheme}>
                <Image
                   source={require('../../assets/sun.png')}
                   style={[styles.darkmodeButton, { display: isDarkMode ? 'flex' : 'none' }]}
                />
                <Image
                    source={require('../../assets/moon.png')}
                    style={[styles.closeIcon, { display: isDarkMode ? 'none' : 'flex' }]}
                />
             </TouchableOpacity>
          </View>
          <View style={{marginTop: 60}}>
             <TouchableOpacity onPress={toggleSidebar}>
                <Image
                   source={require('../../assets/close-dark.png')}
                   style={[styles.closeIcon, { display: isDarkMode ? 'flex' : 'none' }]}
                />
                <Image
                   source={require('../../assets/close.png')}
                   style={[styles.closeIcon, { display: isDarkMode ? 'none' : 'flex' }]}
                />
             </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionOne}>
          <TouchableOpacity
            style={isTracking ? styles.profileContainer : styles.profile}
            accessible
            accessibilityLabel="تصویر پروفایل کاربر"
          >
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.profileImage}
              defaultSource={{ uri: 'https://via.placeholder.com/60' }}
            />
          </TouchableOpacity>
          <View style={styles.nameNumber}>
            <View style={styles.fullName}>
              {firstName ? (
                   <Text
                     style={[textStyle, {fontSize: 14, fontWeight: 500}]}
                     accessible
                     accessibilityLabel="نام کاربر"
                   >
                     {firstName || 'نامشخص'}
                   </Text>
              ) : null}
              {lastName ? (
                   <Text
                     style={[textStyle, {fontSize: 14, fontWeight: 500}]}
                     accessible
                     accessibilityLabel="نام خانوادگی کاربر"
                   >
                      {lastName || 'نامشخص'}
                   </Text>
              ) : null}
            </View>
            <View style={styles.number}>
              {mobileNumber ? (
                  <Text
                     style={[textStyle, {fontWeight: 400, fontSize: 12}]}
                     accessible
                     accessibilityLabel="شماره موبایل کاربر"
                  >
                     {mobileNumber || 'نامشخص'}
                  </Text>
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <View style={{height: 25}} />
      {/* محتوای سایدبار */}
      {menuItemsGroup1.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.screen)}
          >
            <Image source={item.icon} style={styles.customIcon} />
            <Text style={[styles.menuText, {color: isDarkMode ? '#f8f8f8' : '#000000'}]}>{item.title}</Text>
          </TouchableOpacity>
      ))}

      <View style={[styles.divider, {backgroundColor: isDarkMode ? '#0C0F14' : '#adb5bd'}]} />

      {menuItemsGroup2.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.screen)}
              >
                <Image source={item.icon} style={[styles.customIcon]} />
                <Text style={[styles.menuText, {color: isDarkMode ? '#f8f8f8' : '#000000'}]}>{item.title}</Text>
              </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    width: 250,
    height: '100%',
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25,
    marginTop: 5,
  },
  sectionOne: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTwo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeIcon: {
    marginRight: 10,
    marginTop: 5,
  },
  profileContainer: {
    borderWidth: 2,
    borderColor: '#43CE68',
    borderRadius: 31,
  },
  profile: {
    borderWidth: 2,
    borderColor: '#c1121f',
    borderRadius: 31,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  fullName: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    gap: 4,
    marginTop: 10,
  },
  sidebarItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
  },
  number: {
     alignItems: 'center',
     marginTop: 5,
  },
  menuItem: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      paddingVertical: 15,
      gap: 30,
      paddingHorizontal: 20,
  },
  menuText: {
      fontSize: 15,
  },
  customIcon: {
      width: 21,
      height: 26,
  },
  divider: {
      height: 1,
      marginVertical: 10,
      marginRight: 50,
  },
});