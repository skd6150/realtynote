import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  error: (props): ReactNode => (
    <ErrorToast
      {...props}
      style={styles.toast}
      text1Style={styles.text}
      text2Style={styles.off}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    height: 40,
    width: '80%',
    backgroundColor: '#888888',
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  off: {
    display: 'none',
  },
});

export default () => <Toast config={toastConfig} position="bottom" />;
