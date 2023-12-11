/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, TextInput, View} from 'react-native';
import React from 'react';
import CobrowseIO from 'cobrowse-sdk-react-native';
import {Button} from 'react-native';
import {CobrowseAccessibilityService} from 'cobrowse-sdk-react-native';

// CobrowseAccessibilityService.showSetup('')

const App = () => {
  CobrowseIO.license = 'NO6WGMsazTeFmg';
  CobrowseAccessibilityService.showSetup();
  // const session = useSession();

  const [inc, setInc] = React.useState(0);
  const [codee, setCodee] = React.useState('');
  const [joinUsers, setJoinUsers] = React.useState('');

  const start = () => {
    CobrowseIO.start();
  };

  const createSession = async () => {
    const session: any = await CobrowseIO.createSession();
    console.log('starting to get session code', session, session.code);
    setCodee(session.code);
  };

  const stop = () => {
    CobrowseIO.stop();
  };

  const endSession = async () => {
    const session = await CobrowseIO.currentSession();
    if (session) {
      await session.end();
      setCodee('');
    }
  };

  const makeRemote = async () => {
    CobrowseIO.handleRemoteControlRequest = session => {
      Alert.alert(
        'Remote Control Request',
        'A support agent would like to take remote control of this app. Do you accept?',
        [
          {
            text: 'Reject',
            onPress: () => session.setRemoteControl('rejected'),
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => session.setRemoteControl('on'),
          },
        ],
        {cancelable: false},
      );
    };
  };

  const joinSession = async () => {
    if (joinUsers.length === 6) {
      const getS = await CobrowseIO.getSession(joinUsers);
      console.log(getS);
      setJoinUsers('');
      return getS;
    } else {
      Alert.alert('enter full code');
    }
  };
  return (
    <>
      <View>
        {/* <SessionControl  /> */}
        <Text style={{textAlign: 'center', fontSize: 18}}>{inc}</Text>
        <Button title="stop" onPress={() => stop()} />
        <Button title="start" onPress={() => start()} />
        <Button title="count" onPress={() => setInc(prev => prev + 1)} />
        <View style={{marginTop: 30}}>
          <Text style={{color: '#fff'}}>{codee}</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Button title="Create session" onPress={() => createSession()} />
          <Button title="end session" onPress={() => endSession()} />
          <Button title="join session" onPress={() => joinSession()} />
          {/* for making remote-control */}
          <Button title="remote" onPress={() => makeRemote()} />
        </View>
        <TextInput
          style={{
            marginTop: 20,
            borderColor: 'green',
            height: '40',
            borderWidth: 1,
          }}
          value={joinUsers}
          onChangeText={e => setJoinUsers(e)}
          placeholder="write code"
        />
      </View>
    </>
  );
};

export default App;
