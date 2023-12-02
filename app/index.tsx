import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

const MainPage = () => {
  return <Redirect href={'/myday/'} />;
};

export default MainPage;

const styles = StyleSheet.create({});
