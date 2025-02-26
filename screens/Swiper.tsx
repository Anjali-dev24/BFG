import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import SwiperComponent from '../components/Swiper/SwiperComponent';
import {Strings} from '../styles/Strings';
import {swiperStyle} from '../styles/StyleSheet/swiperStyle';

const Swiper = ({navigation}: {navigation: any}) => {
  const [swiper, setSwiper] = useState<any>();
  const [swiperCurrentPage, setSwiperCurrentPage] = useState<number>();

  useEffect(() => {
  }, [swiperCurrentPage]);

  const methodToSaveRoute=()=>{
    if(swiperCurrentPage === 2){
      AsyncStorage.setItem('userAlreadySeen', 'YES')
      navigation.navigate('SignUp')
    }else{
      swiper.scrollBy(1)
    }
  }

  return (
    <SafeAreaView style={swiperStyle.container}>
      <SwiperComponent
        swiperIndex={index => setSwiperCurrentPage(index)}
        onPress={() => {
          methodToSaveRoute()
        }}
        onPressBack={() => swiper.scrollBy(-1)}
        swiperRef={swiper => {
          setSwiper(swiper);
        }}
        listingImage={require('../assets/Listing.png')}
        skipTitle={Strings.Swiper.skipTitle}
        onSkipPress={() => {
          AsyncStorage.setItem('userAlreadySeen', 'YES')
          navigation.navigate('SignUp');
        }}
        listingTitle={Strings.Swiper.listingTitle}
        swipeTitle={
          swiperCurrentPage === 2
            ? Strings.Swiper.startbuttonTtitle
            : Strings.Swiper.swipeTitle
        }
        accountingImage={require('../assets/Accounting.png')}
        taxTitle={Strings.Swiper.taxTitle}
        suggestionTitle={Strings.Swiper.suggestionTitle}
        safetyToSecureImage={require('../assets/safetyToSecure.png')}
        safetyTitle={Strings.Swiper.safetyTitle}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  return null;
};

export default connect(null, {mapStateToProps})(Swiper);
