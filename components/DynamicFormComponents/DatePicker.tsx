import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../../styles/Colors';

const DatePickerView = ({
  open,
  onPressOpen,
  date,
  onConfirm,
  onCancel,
  setParentState,
  parentsData,
  name,
  data,
  defaultVal,
}: {
  open: boolean;
  onPressOpen: () => void;
  date: any;
  onConfirm: (date: any) => void;
  onCancel: () => void;
  setParentState: any;
  parentsData: any;
  name: any;
  data: any;
  defaultVal: any;
}) => {
  const [datePickerState, setDatePickerState] = React.useState(
    data?.value || defaultVal || new Date(),
  );
  const [isPicker, setIsPicker] = React.useState(false);

  useEffect(() => {
    setParentState?.({...parentsData, [name]: datePickerState});
  }, [datePickerState]);
  
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => setIsPicker(true)}
        style={{
          backgroundColor: Colors.white,
          width: '90%',
          borderColor: Colors.gray,
          borderWidth: moderateScale(0.5),
        }}>
        <Text>{datePickerState.toLocaleDateString('en-US')}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={isPicker}
        date={datePickerState}
        onConfirm={(date: any) => {
          setDatePickerState(date), setIsPicker(false);
        }}
        onCancel={() => setIsPicker(false)}
        androidVariant="nativeAndroid"
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default DatePickerView;
