import React from 'react';
import {View} from 'react-native';
import AddressIcon from '../assets/icons/address.svg';
import UserIcon from '../assets/icons/user.svg';
import UserAddressIcon from '../assets/icons/userAddress.svg';
import Colors from '../styles/Colors';
import ProgressStyle from '../styles/StyleSheet/progressStyles';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import ButtonComponent from './ButtonComponent';

const ProgressComponent = ({isSecond}: {isSecond: boolean}) => {
  return (
    <View style={signUpStyle.progressContainer}>
      <View style={signUpStyle.borderStyle} />
      <View style={ProgressStyle.borderStyles}>
        <ButtonComponent
        // disabled={true}
          isTitle={false}
          buttonStyle={[
            signUpStyle.indicatorStyle,
            {
              backgroundColor: Colors.greenGradient[1],
              borderColor: Colors.greenGradient[1],
            },
          ]}
          isGradient={true}
          iconElement={<UserIcon />}
        />
      </View>
      <View
        style={[
          ProgressStyle.secondProgressIcon,
          {borderColor: isSecond ? Colors.greenGradient[1] : Colors.gray},
        ]}>
        <ButtonComponent
        //  disabled={true}
          isTitle={false}
          buttonStyle={[
            signUpStyle.indicatorStyle,
            {
              backgroundColor: isSecond
                ? Colors.greenGradient[1]
                : Colors.white,
              borderColor: isSecond ? Colors.greenGradient[1] : Colors.gray,
            },
          ]}
          isGradient={isSecond ? true : false}
          iconElement={isSecond ? <AddressIcon /> : <UserAddressIcon />}
        />
      </View>
    </View>
  );
};

export default ProgressComponent;
