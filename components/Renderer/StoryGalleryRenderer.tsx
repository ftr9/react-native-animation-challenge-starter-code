import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import useMyDayImageStore from '../features/myDay/Image/store/useMyDayImage.store';
import { useRouter } from 'expo-router';

const galleryImages: string[] = [
  'https://images.pexels.com/photos/9056223/pexels-photo-9056223.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19049906/pexels-photo-19049906/free-photo-of-view-of-a-snowcapped-mountain-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/17137769/pexels-photo-17137769/free-photo-of-boats-moored-in-the-marina.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/18932314/pexels-photo-18932314/free-photo-of-colosseum-in-rome.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19189615/pexels-photo-19189615/free-photo-of-a-person-s-feet-and-legs-are-on-a-white-table-with-fruit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/9056223/pexels-photo-9056223.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19049906/pexels-photo-19049906/free-photo-of-view-of-a-snowcapped-mountain-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/17137769/pexels-photo-17137769/free-photo-of-boats-moored-in-the-marina.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/18932314/pexels-photo-18932314/free-photo-of-colosseum-in-rome.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19189615/pexels-photo-19189615/free-photo-of-a-person-s-feet-and-legs-are-on-a-white-table-with-fruit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19189615/pexels-photo-19189615/free-photo-of-a-person-s-feet-and-legs-are-on-a-white-table-with-fruit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/9056223/pexels-photo-9056223.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19049906/pexels-photo-19049906/free-photo-of-view-of-a-snowcapped-mountain-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/17137769/pexels-photo-17137769/free-photo-of-boats-moored-in-the-marina.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/18932314/pexels-photo-18932314/free-photo-of-colosseum-in-rome.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://images.pexels.com/photos/19189615/pexels-photo-19189615/free-photo-of-a-person-s-feet-and-legs-are-on-a-white-table-with-fruit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  'https://media4.giphy.com/media/3oEjHI8WJv4x6UPDB6/200.webp?cid=ecf05e47ive3o4i6ddsh68sg7gbsu6rmh9k1sj10s9iwrtae&ep=v1_gifs_search&rid=200.webp&ct=g',
];

const GalleryImg = ({ src, onClick }: { src: string; onClick: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        height: Dimensions.get('screen').height / 5,
        width: '33.15%',
        overflow: 'hidden',
      }}
    >
      <Image
        source={{
          uri: src,
        }}
        style={{
          height: '100%',
          width: '100%',
          margin: 0.2,
        }}
      />
    </TouchableOpacity>
  );
};

const StoryGalleryRenderer = () => {
  const setActiveSelectedImage = useMyDayImageStore(
    store => store.setActiveSelectedImage
  );
  const router = useRouter();

  const galleryImgClick = (imageUrl: string) => {
    return () => {
      setActiveSelectedImage(imageUrl);
      router.push('/myday/Image');
    };
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            marginRight: 8,
          }}
        >
          Gallery
        </Text>
        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {galleryImages.map((img, index) => {
          return (
            <GalleryImg onClick={galleryImgClick(img)} src={img} key={index} />
          );
        })}
      </View>
    </>
  );
};

export default StoryGalleryRenderer;

const styles = StyleSheet.create({});
