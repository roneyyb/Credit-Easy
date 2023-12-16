/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, TextInput, View} from 'react-native';
import React from 'react';
import CobrowseIO, {CobrowseView} from 'cobrowse-sdk-react-native';
import {Button} from 'react-native';
import {CobrowseAccessibilityService} from 'cobrowse-sdk-react-native';
import Webview from './Webview';

// CobrowseAccessibilityService.showSetup('')

const App = () => {
  CobrowseIO.license = 'NO6WGMsazTeFmg';
  CobrowseAccessibilityService.showSetup();
  // const session = useSession();

  const [inc, setInc] = React.useState(0);
  const [codee, setCodee] = React.useState('');
  const [joinUsers, setJoinUsers] = React.useState('');
  const [sessionId, setSessionId] = React.useState('');
  const [agentId, setAgentId] = React.useState('');


  const start = () => {
    CobrowseIO.start();
  };

  const createSession = async () => {
    const session: any = await CobrowseIO.createSession();
    console.log('starting to get session code', session, session.code);
    setSessionId(session.id);
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

  const joinById = async () => {
    try {
      if (sessionId.length > 5) {
        const id = await CobrowseIO.getSession(sessionId);
        console.log('getting Session ==> ', id);
        setSessionId('');
        return id;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
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
          <Text style={{color: '#fff'}}>{sessionId}</Text>

        </View>
        <View style={{marginTop: 30}}>
          <Button title="Create session" onPress={() => createSession()} />
          <Button title="end session" onPress={() => endSession()} />
          <Button title="join session" onPress={() => joinSession()} />
          <Button title="join session by id" onPress={() => joinById()} />
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
           <TextInput
          style={{
            marginTop: 10,
            borderColor: 'green',
            height: '40',
            borderWidth: 1,
          }}
          value={sessionId}
          onChangeText={e => setSessionId(e)}
          placeholder="join by session id"
        />
        <TextInput
          style={{
            marginTop: 10,
            borderColor: 'green',
            height: '40',
            borderWidth: 1,
          }}
          value={agentId}
          onChangeText={e => setAgentId(e)}
          placeholder="agent id for co browse"
        />
      </View>
      <View style={{borderWidth: 1, borderColor: 'red', flex: 1, height: 100}}>
        <Webview url={agentId} />
        {/* <CobrowseView /> */}
      </View>
    </>
  );
};

export default App;
