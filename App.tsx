/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Button } from 'react-native';
import Host from './src/screen/Host';
import Controller from './src/screen/Controller';


enum userType {
    'host' = 'host',
    'controller' = 'controller'
}

const App = () => {


    const [type, setType] = React.useState<userType>("");


    const renderScreen = (type) => {
        if (!type) {
            return
        } else {
            return <View style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0, backgroundColor: "#55555533" }}>
                {type === userType.controller ? <>
                    <Pressable

                        style={{ height: 40, width: "100%", backgroundColor: "magenta" }}
                        onPress={() => {

                            setType("")
                        }}

                    /><Controller /></> : <Host disconnect={() => { setType("") }} />

                }
            </View >
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title='HOST' onPress={() => { setType(userType.host) }} />
            <Button title='CONTROLLER' onPress={() => { setType(userType.controller) }} />

            {renderScreen(type)}
        </View >
    );
};

export default App;




