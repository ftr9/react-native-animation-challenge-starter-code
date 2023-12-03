import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import StoryTypeCard from '../Card/StoryTypeCard';

interface IStoryTypes {
  name: string;
  icon: React.JSX.Element;
  colors: string[];
}

const storyTypes: IStoryTypes[] = [
  {
    name: 'Music',
    icon: <Ionicons name="musical-notes-outline" size={24} />,
    colors: ['#38d9a9', '#0c8599'],
  },
  {
    name: 'Text',
    icon: <Ionicons name="text-outline" size={24} />,
    colors: ['#9c36b5', '#c2255c'],
  },

  {
    name: 'Boomerang',
    icon: <Ionicons name="infinite-outline" size={24} />,
    colors: ['#7950f2', '#3b5bdb'],
  },
];

const StoryTypeCardRenderer = () => {
  return (
    <View>
      <FlatList
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 8 }}></View>}
        ListHeaderComponent={() => <View style={{ width: 8 }}></View>}
        ListFooterComponent={() => <View style={{ width: 8 }}></View>}
        data={storyTypes}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          return <StoryTypeCard {...item} />;
        }}
      />
    </View>
  );
};

export default StoryTypeCardRenderer;

const styles = StyleSheet.create({});
