import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';

const customeCamera = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  RNCamera: {flex: 1},
  header: {
    position: 'absolute',
    top: 0,
    height: moderateScale(130),
    width: '100%',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  galleryContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  footer: {
    height: moderateScale(100),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.black,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    bottom: moderateScale(90),
    alignSelf: 'center',
  },
  bubbleTail: {
    transform: [{rotateX: '180deg'}, {rotateY: '180deg'}],
    alignSelf: 'center',
  },
  shutter: {
    marginBottom: moderateScale(10),
  },
  activityLoader: {
    position: 'absolute',
  },
});

export default customeCamera
