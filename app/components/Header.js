import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
//import React, { useState, useEffect } from 'react-native';



const Header = ({ titleText }) => {

    
    return (
      <Appbar.Header style={styles.headerContainer}>
        <View style={styles.container}>
          <Title style={styles.title}>{titleText}</Title>
        </View>
      </Appbar.Header>
    )
  }
  
  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#2E2E2E'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: '#D8D8D8'
    }
  })
  
  export default Header
