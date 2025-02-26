
import * as ImagePicker from 'react-native-image-picker'
import { Alert, Linking } from 'react-native'
import { ImagePickerResponse } from 'react-native-image-picker'


export const handleGallerySelection = (): Promise<string | undefined> => {
  return new Promise(((resolve, reject) => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', maxWidth: 500, maxHeight: 500, quality: 0.5 }, (result: ImagePickerResponse) => {
      if (result.errorMessage) {
        Alert.alert(
          "One or more of the required permissions was denied",
          "BFG needs access to a denied permission",
          [
            {
              text: "cancel",
              onPress: () => console.log(''),
              style: 'cancel'
            },
            {
              text: 'header',
              onPress: () => Linking.openURL('app-settings:')
            }
          ],
          { cancelable: false }
        )
      } else if (result.didCancel) {
        reject("User cancelled image picker")
      } else {
        return resolve(result && result.assets && result.assets[0].uri);
      }
    })

  }))

}

export const getWords = (str: string | undefined) => {
  return str?.split(/\s+/).slice(0, 10).join(" ");
}

//if Line count ration is less greater then 12%, send text as invalid
export const isScannedTextValid = (scannedData: string) => {
  let lineCount = scannedData.split(/\r\n|\r|\n/).length;
  if (lineCount / scannedData.length > 0.12) {
    return false;
  }

  return true;
}



