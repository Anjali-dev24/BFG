import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinkedInModal from 'react-native-linkedin';
import {moderateScale} from 'react-native-size-matters';
import FacebookIcon from '../assets/icons/facebook.svg';
import GoogleIcon from '../assets/icons/google.svg';
import LinkedinIcon from '../assets/icons/linkedin.svg';
import {Strings} from '../styles/Strings';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import ButtonComponent from './ButtonComponent';

const LoginMethods = ({
  onPressFacebook,
  onPressGoogle,
  onPressLinkedin,
  onSuccess,
}: {
  onPressFacebook: () => void;
  onPressGoogle: () => void;
  onPressLinkedin?: () => void;
  onSuccess?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={signUpStyle.optionContainer}>
        <View style={signUpStyle.otherOpions} />
        <Text style={signUpStyle.optionsStyle}>
          {Strings.Input.signInOptions}
        </Text>
        <View style={signUpStyle.otherOpions} />
      </View>

      <View style={signUpStyle.otherOptionContainer}>
        <ButtonComponent
          isTitle={false}
          buttonStyle={signUpStyle.FacebookButton}
          isGradient={false}
          onPress={onPressFacebook}
          iconElement={
            <FacebookIcon
              width={moderateScale(36)}
              height={moderateScale(36)}
            />
          }
        />
        <ButtonComponent
          isTitle={false}
          buttonStyle={signUpStyle.FacebookButton}
          isGradient={false}
          onPress={onPressGoogle}
          iconElement={
            <GoogleIcon
              style={signUpStyle.googleIcon}
              width={moderateScale(36)}
              height={moderateScale(36)}
            />
          }
        />
        <ButtonComponent
          isTitle={false}
          buttonStyle={signUpStyle.FacebookButton}
          isGradient={false}
          onPress={onPressLinkedin}
          iconElement={<LinkedinIcon />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginMethods;
