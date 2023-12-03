import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface IStoryTypeCardProps {
  name: string;
  icon: React.JSX.Element;
  colors: string[];
}

const StoryTypeCard = ({ name, icon, colors }: IStoryTypeCardProps) => {
  const router = useRouter();
  const cardClickHandle = () => {
    //@ts-ignore
    router.push(`/myday/${name}`);
  };

  return (
    <TouchableOpacity onPress={cardClickHandle}>
      <LinearGradient
        style={{
          width: 120,
          height: 180,
          borderRadius: 5,
          justifyContent: 'center',
          alignContent: 'center',
        }}
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="cardContainer"
      >
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: 'white',
            borderRadius: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            color: 'white',
            marginTop: 5,
            textAlign: 'center',
          }}
        >
          {name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StoryTypeCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
  },
});
