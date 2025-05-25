import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../themeProvider/themeProvider.js";

export const Sidebar = ({ isTracking, isOpen, toggleSidebar, firstName, lastName, mobileNumber, navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(isOpen ? 0 : -250)).current;
  const { isDarkMode } = useContext(ThemeContext);

  const colors = useMemo(
    () => ({
      background: isDarkMode ? '#1a2a44' : '#fff',
      text: isDarkMode ? '#f8f8f8' : '#000000',
      border: isDarkMode ? '#f8f8f8' : '#ddd',
    }),
    [isDarkMode]
  );

  const textStyle = useMemo(
    () => [styles.name, { color: colors.text }],
    [colors.text]
  );

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
      <View style={styles.header}>
        <View style={styles.sectionTwo}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Icon
              name="close"
              size={30}
              color={colors.text}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
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
          <View style={styles.fullName}>
            {firstName ? (
              <Text
                style={textStyle}
                accessible
                accessibilityLabel="نام کاربر"
              >
               {firstName || 'نامشخص'}
              </Text>
            ) : null}
            {lastName ? (
              <Text
                style={textStyle}
                accessible
                accessibilityLabel="نام خانوادگی کاربر"
              >
                {lastName || 'نامشخص'}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* محتوای سایدبار (نمونه) */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.sidebarItem, { color: colors.text }]}>خانه</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={[styles.sidebarItem, { color: colors.text }]}>پروفایل</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.sidebarItem, { color: colors.text }]}>برگشت به صفحه قبلی</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionOne: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTwo: {
    alignItems: 'center',
  },
  closeIcon: {
    marginRight: 10,
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
    gap: 10,
    marginTop: 10,
  },
  sidebarItem: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
  },
});