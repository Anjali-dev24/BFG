import React from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerComponent = ({
  open,
  onPressOpen,
  date,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onPressOpen: () => void;
  date: any;
  onConfirm: (date: any) => void;
  onCancel: () => void;
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={onConfirm}
        onCancel={onCancel}
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

export default DatePickerComponent;
