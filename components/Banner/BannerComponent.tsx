import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { ThemedText } from '../ThemedText';

export interface BannerItem {
  id: string;
  image: string;
  onPress?: () => void;
  createdTime: string;
  lastEditedTime: string;
  createdBy: string;
  lastEditedBy: string;
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  periodStart?: string;
  periodEnd?: string;
}

interface BannerComponentProps {
  banners: BannerItem[];
}

const BannerComponent: React.FC<BannerComponentProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState<BannerItem | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [imageHeights, setImageHeights] = useState<{ [key: string]: number }>({});

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / containerWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * containerWidth, animated: true });
    }
  };

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width * 0.9);
  };

  const activeBackground = useThemeColor({}, 'activeBackground');
  const brand = useThemeColor({}, 'brand');

  const handleImageLoad = (event: any, bannerId: string) => {
    const { width, height } = event.nativeEvent.source;
    const aspectRatio = width / height;
    const calculatedHeight = containerWidth / aspectRatio;
    setImageHeights((prevHeights) => ({
      ...prevHeights,
      [bannerId]: calculatedHeight,
    }));
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      position: 'relative', // Para posicionar a View absoluta corretamente
    },
    bannerWrapper: {
      height: 240,
      width: '100%',
      overflow: 'hidden',
    },
    bannerImage: {
      width: '100%',
      borderRadius: 15,
      overflow: 'hidden',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: activeBackground,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: brand,
    },
    backgroundTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%', // Metade superior
      backgroundColor: brand,
      zIndex: -1, // Coloca atrás do conteúdo
    },
  });

  return (
    <View style={styles.container}>
      {/* View absoluta para o fundo da metade superior */}
      <View style={styles.backgroundTop} />

      <View style={styles.bannerWrapper} onLayout={onLayout}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          centerContent
          snapToAlignment="center"
          onScroll={handleScroll}
          scrollEventThrottle={300}
          contentContainerStyle={{ paddingHorizontal: containerWidth * 0.05, gap: 10 }}
        >
          {banners.map((banner) => (
            <TouchableOpacity
              key={banner?.id}
              onPress={() => setSelectedBanner(banner)}
              activeOpacity={0.8}
              style={{ width: containerWidth, alignContent: 'center', justifyContent: 'center' }}
            >
              <Image
                source={{ uri: banner?.image }}
                style={[styles.bannerImage, { height: imageHeights[banner?.id] || 240 }]}
                resizeMode="contain"
                onLoad={(event) => handleImageLoad(event, banner?.id)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>

      <BottomSheet
        visible={!!selectedBanner}
        onClose={() => setSelectedBanner(null)}
        onPrimaryPress={() => {
          if (selectedBanner?.link) {
            Linking.openURL(selectedBanner.link);
          }
        }}
        primaryButtonLabel="Saiba mais"
        secondaryButtonLabel="Fechar"
      >
        {selectedBanner && (
          <View>
            <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              {selectedBanner.title}
            </ThemedText>
            <ThemedText style={{ fontSize: 16 }}>
              {selectedBanner.description}
            </ThemedText>
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

export default BannerComponent;