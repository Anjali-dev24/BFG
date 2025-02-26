import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import SlideComponent from './SlideComponent';
import {swiperComponentStyle} from '../../styles/StyleSheet/swiperComponentStyle';
import BackIcon from '../../assets/icons/back_icon.svg';
import ButtonComponent from '../ButtonComponent';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../../styles/Colors';

export default function SwiperComponent({
  listingImage,
  skipTitle,
  onSkipPress,
  listingTitle,
  swipeTitle,
  accountingImage,
  taxTitle,
  suggestionTitle,
  safetyToSecureImage,
  safetyTitle,
  swiperRef,
  onPressBack,
  onPress,
  nextButtonStyle,
  swiperIndex,
}: {
  listingImage: ImageSourcePropType;
  skipTitle: string;
  onSkipPress: () => void;
  listingTitle: string;
  swipeTitle: string;
  accountingImage: ImageSourcePropType;
  taxTitle: string;
  suggestionTitle: string;
  safetyToSecureImage: ImageSourcePropType;
  safetyTitle: string;
  swiperRef: (swiper: any) => void;
  onPressBack?: () => void;
  onPress: () => void;
  nextButtonStyle?: ViewStyle;
  swiperIndex: (index: number) => void;
}) {
  const [swipeCurrentIndex, setSwipeIndex] = useState<number>();

  useEffect(() => {}, [swipeCurrentIndex]);
  return (
    <View style={{flex: 1, backgroundColor: Colors.extraLightBlue}}>
      <Swiper
        onIndexChanged={index => swiperIndex(index)}
        removeClippedSubviews={false}
        scrollEventThrottle={0}
        showsButtons={false}
        ref={swiperRef}
        paginationStyle={{bottom: 18}}
        dotStyle={{backgroundColor: 'orange'}}
        scrollEnabled={false}
        dot={<View style={swiperComponentStyle.disableDot} />}
        activeDot={<View style={swiperComponentStyle.activeDot} />}
        loop={false}>
        <View style={swiperComponentStyle.solutionSlide}>
          <SlideComponent
            imageElement={
              <View style={swiperComponentStyle.ListingImage}>
                <Image
                  style={swiperComponentStyle.ListingImage}
                  source={listingImage}
                />
              </View>
            }
            sliderTitle={swiperComponentStyle.sliderTitle}
            IsBottomTitlAvailable={true}
            title={listingTitle}
          />
        </View>
        <View style={swiperComponentStyle.taxesSlide}>
          <TouchableOpacity
            onPress={onPressBack}
            style={swiperComponentStyle.backIcon}>
            <BackIcon width={moderateScale(25)} height={moderateScale(25)} />
          </TouchableOpacity>
          <SlideComponent
            imageElement={
              <View style={swiperComponentStyle.imageContainer}>
                <Image
                  style={swiperComponentStyle.accountingImage}
                  source={accountingImage}
                />
              </View>
            }
            IsBottomTitlAvailable={false}
            textElement={
              <View style={swiperComponentStyle.textContainer}>
                <Text style={swiperComponentStyle.taxesTitle}>{taxTitle}</Text>
                <Text style={swiperComponentStyle.suggestion}>
                  {suggestionTitle}
                </Text>
              </View>
            }
          />
        </View>
        <View style={swiperComponentStyle.documentSlide}>
          <TouchableOpacity
            onPress={onPressBack}
            style={swiperComponentStyle.backIcon}>
            <BackIcon width={moderateScale(25)} height={moderateScale(25)} />
          </TouchableOpacity>
          <SlideComponent
            imageElement={
              <View style={swiperComponentStyle.safetyImageContainer}>
                <Image
                  style={swiperComponentStyle.safetyImage}
                  source={safetyToSecureImage}
                />
              </View>
            }
            sliderTitle={swiperComponentStyle.safetyText}
            IsBottomTitlAvailable={true}
            title={safetyTitle}
          />
        </View>
      </Swiper>
      <View style={swiperComponentStyle.bottomSwipeButtons}>
        <ButtonComponent
          isTitle={true}
          onPress={onSkipPress}
          title={skipTitle}
          buttonStyle={swiperComponentStyle.skipButtonContainer}
          textStyle={swiperComponentStyle.skipButtonText}
          isGradient={false}
        />
        <ButtonComponent
          isTitle={true}
          isGradient={true}
          onPress={onPress}
          title={swipeTitle}
          buttonStyle={nextButtonStyle}
        />
      </View>
    </View>
  );
}
