import * as React from 'react';
import { useState } from 'react';

import { Text, View } from 'react-native';
import Header from './Header'
import { StyleSheet, TouchableOpacity } from 'react-native'
import io from 'socket.io-client';
import t from 'tcomb-form-native'; // 0.6.9
import Emoji from 'react-native-emoji';


//ifconfig set ip address machine hote
const socket = io('http://10.3.7.4:3000');
const Form = t.form.Form;

const User = t.struct({
  addressXtzOrKt1: t.String,
  yourEmail: t.String,
});

function Separator() {
  return <View style={styles.separator} />;
}


const Alert = () => {
  const [_form, setForm] = useState(null)
  const [activate, setActivate] = useState(false);
  
  const alertMe = () => {
    if (_form.getValue())
    {
    const value = _form.getValue(); // use that ref to get the form value
    socket.emit('sendAddress', { email: value.yourEmail, addr: value.addressXtzOrKt1 });
    setActivate(true);

    }
  }
  const deleteMe = () => {
    const value = _form.getValue(); // use that ref to get the form value
    socket.emit('deleteMe', { email: value.yourEmail, addr: value.addressXtzOrKt1 });
    setActivate(false);

  }
  return (
    <>
      <Header titleText='Alert my staking reward' />
      <View style={styles.container}>
      <View style={styles.test}>
        <Text style={styles.explication}>You notifiate email when you receive your reward staking Tezos in your wallet. You must have a deleguate baker</Text>
      </View>

      <View >
  {activate ? (
     <Text style={styles.notification}>Notification: <Emoji name="white_check_mark" style={{ fontSize: 15 }} /> (activate) </Text>
     //  <Emoji name="white_check_mark" style={{ fontSize: 15 }} />
      ) : (
        <Text style={styles.notification}>Notification: <Emoji name="red_circle" style={{ fontSize: 15 }} /> (desactivate)</Text>

      )}  

      </View>

      <Form
        type={User}
        ref={c => setForm(c)} // assign a ref
      />
      <TouchableOpacity
        onPress={alertMe}
        style={styles.button}
      >
        <Text style={styles.titleButton}>Set email notifiaction</Text>
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        onPress={deleteMe}
        style={styles.button}
      >
        <Text  style={styles.titleButton}>Delete email notification</Text>
      </TouchableOpacity>
      <Separator />
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  explication:{
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    padding: 10
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
titleButton:{
  color: '#D8D8D8',
},
notification: {
  fontSize: 16,
},

container: {
  //flex: 1,
  padding: 5,
},
test:{



  borderWidth: 4,
  borderRightWidth: 4,
  borderLeftWidth: 4,
  borderTopWidth: 4,
  borderBottomWidth: 4,
  paddingVertical: 3,
  paddingHorizontal: 3
}


})
export default Alert;
