import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CreateStoryHeader from '../../components/layout/CreateStoryHeader';
import StoryTypeCardRenderer from '../../components/Renderer/StoryTypeCardRenderer';
import StoryGalleryRenderer from '../../components/Renderer/StoryGalleryRenderer';
import { StatusBar } from 'expo-status-bar';

const MyDay = () => {
  useEffect(() => {
    alert('Facebook Story Feature implemented using react native');
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <CreateStoryHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          position: 'relative',
          flex: 1,
        }}
      >
        <StoryTypeCardRenderer />
        <StoryGalleryRenderer />
      </ScrollView>
    </>
  );
};

export default MyDay;

const styles = StyleSheet.create({});
