/* eslint-disable react-native/no-inline-styles */
import { Alert, Text, TextInput, View } from 'react-native';
import React from 'react';
// import CobrowseIO, { CobrowseView } from 'cobrowse-sdk-react-native';
import { Button } from 'react-native';
// import { CobrowseAccessibilityService } from 'cobrowse-sdk-react-native';
import Webview from './Webview';

// "cobrowse-sdk-react-native": "^2.18.1",
// CobrowseAccessibilityService.showSetup('')

const App = () => {
    //   CobrowseIO.license = 'NO6WGMsazTeFmg';
    //   CobrowseAccessibilityService.showSetup();
    // const session = useSession();

    const [inc, setInc] = React.useState(0);
    const [codee, setCodee] = React.useState('');
    const [joinUsers, setJoinUsers] = React.useState('');
    const [sessionId, setSessionId] = React.useState('');
    const [agentId, setAgentId] = React.useState('');


    const createSession = async () => {
        // CobrowseIO.start();
        // const session: any = await CobrowseIO.createSession();
        // console.log('starting to get session code', session, session.code);
        // setSessionId(session.id);
        // setCodee(session.code);
    };

    const stop = () => {
        // CobrowseIO.stop();
    };

    const endSession = async () => {
        // const session = await CobrowseIO.currentSession();
        // if (session) {
        //   await session.end();
        //   setCodee('');
        // }
    };

    const makeRemote = async () => {
        // CobrowseIO.handleRemoteControlRequest = session => {
        //   Alert.alert(
        //     'Remote Control Request',
        //     'A support agent would like to take remote control of this app. Do you accept?',
        //     [
        //       {
        //         text: 'Reject',
        //         onPress: () => session.setRemoteControl('rejected'),
        //         style: 'cancel',
        //       },
        //       {
        //         text: 'Accept',
        //         onPress: () => session.setRemoteControl('on'),
        //       },
        //     ],
        //     { cancelable: false },
        //   );
        // };
    };

    const joinById = async () => {
        // try {
        //     if (sessionId.length > 5) {
        //         // const id = await CobrowseIO.getSession(sessionId);
        //         console.log('getting Session ==> ', id);
        //         setSessionId('');
        //        // return id;
        //     }
        // } catch (error) {
        //     Alert.alert(error.message);
        // }
    };

    const joinSession = async () => {
        // if (joinUsers.length === 6) {
        //   //  const getS = await CobrowseIO.getSession(joinUsers);
        //     console.log(getS);
        //     setJoinUsers('');
        //     return getS;
        // } else {
        //     Alert.alert('enter full code');
        // }
    };
    return (
        <>


        </>
    );
};

export default App;
