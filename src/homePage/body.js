import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';
import { ThemeContext } from '../themeProvider/themeProvider.js';

export const Body = ({ isTracking, toggleTracking }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.bodyContainer}>
      <View style={[styles.operations, {backgroundColor: isDarkMode ? '#212D3B' : '#ffffff'}]}>
        <Text style={[isDarkMode ? styles.darkOperationText : styles.operationText]}>ماموریت ها</Text>
        <Text style={[isDarkMode ? styles.darkOperationText : styles.operationText]}>5</Text>
      </View>
      <View style={styles.messages}>
        <View style={styles.message1}>
          <View style={[styles.value, {backgroundColor: isDarkMode ? '#212D3B' : '#ffffff'}]}>
            <Text style={[styles.text, {color: isDarkMode ? '#f8f8f8' : 'rgba(0, 0, 0, 0.8)'}]}>0</Text>
          </View>
          <View style={styles.operation}>
            <Text style={[styles.labelText, {color: isDarkMode ? '#f8f8f8' : 'rgba(0, 0, 0, 0.8)'}]}>عملیات ها</Text>
            <View style={{ marginTop: 12 }}>
              <Image
                source={require('../../assets/dark/operation-dark.png')}
                style={{ display: isDarkMode ? 'flex' : 'none' }}
              />
              <Image
                source={require('../../assets/light/operation.png')}
                style={{ display: isDarkMode ? 'none' : 'flex' }}
              />
            </View>
          </View>
        </View>
        <View style={styles.message2}>
          <View style={[styles.value, {backgroundColor: isDarkMode ? '#212D3B' : '#ffffff'}]}>
            <Text style={[styles.text, {color: isDarkMode ? '#f8f8f8' : 'rgba(0, 0, 0, 0.8)'}]}>1</Text>
          </View>
          <View style={styles.message}>
            <Text style={[styles.labelText, {color: isDarkMode ? '#f8f8f8' : 'rgba(0, 0, 0, 0.8)'}]}>پیام ها</Text>
            <View style={{ marginTop: 12 }}>
               <Image
                  source={require('../../assets/dark/message-dark.png')}
                  style={{ display: isDarkMode ? 'flex' : 'none' }}
               />
               <Image
                   source={require('../../assets/light/message.png')}
                   style={{ display: isDarkMode ? 'none' : 'flex' }}
               />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.location, { backgroundColor: isDarkMode ? '#212D3B' : '#ffffff' }]}>
           <Text style={[isDarkMode ? styles.darkOperationText : styles.operationText]}>موقعیت</Text>
           <Switch
             trackColor={{ false: '#767577', true: '#81b0ff' }}
             thumbColor={isTracking ? '#4CAF50' : '#f4f3f4'}
             ios_backgroundColor="#3e3e3e"
             onValueChange={toggleTracking}
             value={isTracking}
           />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    height: '79.3%',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
  },
  operations: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  operationText: {
    fontSize: 19,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  darkOperationText: {
    fontSize: 19,
    color: '#f8f8f8',
  },
  messages: {
    marginTop: 15,
    flexDirection: 'row-reverse',
    width: '96%',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  value: {
    width: 160,
    height: 120,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 27,
  },
  labelText: {
    fontSize: 19,
    marginTop: 15,
  },
  location: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 20,
  },
});