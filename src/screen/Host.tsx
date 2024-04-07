/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
// import CobrowseIO, { CobrowseView } from 'cobrowse-sdk-react-native';

import ViewShot from "react-native-view-shot";
import { WebView } from 'react-native-webview';
// "cobrowse-sdk-react-native": "^2.18.1",
// CobrowseAccessibilityService.showSetup('')
import { NativeModules } from 'react-native';
import io from "socket.io-client";
const { TouchSimulator } = NativeModules;

const { height, width } = Dimensions.get("window");

const ENDPOINT = 'https://www.teachandlearn.online';

const ROOMID = "temp_roomID";
var socket: any;

const Host = ({ disconnect }) => {

    const [currentCaptured, setCurrentCaptured] = useState("");

    const [touch, setTouch] = React.useState({});




    const simulateTap = (x, y) => {



        const script = `var element = document.elementFromPoint(${x * width}, ${(y * (height - 40))});
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'log',
                message: element
            }));

            if (element && element.tagName === 'INPUT') {

                element.focus();
            } else {

                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    clientX: ${x * width},
                    clientY: ${(y * (height - 40))}
                        }); 
            element.dispatchEvent(event);
        }
            `;

        viewRef.current.injectJavaScript(script)

        // TouchSimulator.simulateTouch(x, ((y * (height - 40)) + 40) / height);

    };

    const simulateScroll = (deltaY) => {
        const script = `
    window.scrollBy(0, ${deltaY});
    
  `;

        console.log(script)

        viewRef.current.injectJavaScript(script);
        // captureScreen()
    };




    const askForScreenControl = () => {
        if (true) {
            socket = io(ENDPOINT);

            socket.emit("joinRoom", ROOMID);
            socket.on('receivedPrivateMessage', (msg: any) => {
                console.log("messs prri", msg)
                const message = JSON.parse(msg);

                if (message.type) {
                    if (message.type == "scroll") {
                        simulateScroll(message.delta)
                    } else {

                        simulateTap(message.X, message.Y)
                    }
                }
            })
        }
    }


    React.useEffect(() => {
        askForScreenControl()

        return () => {
            socket?.disconnect()
        }
    }, [])

    const sendDataBack = (message) => {

        socket.emit("sendPrivateMessage", { message: JSON.stringify(message), roomId: ROOMID });

    }





    const viewRef = React.useRef(null);





    const handleMessage = event => {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'log') {
            console.log('Message from WebView:', message.message);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <Pressable

                style={{ height: 40, width: "100%", backgroundColor: "red" }}
                onPress={() => {
                    // sendDataBack("somethitn")
                    disconnect()

                }}

            />

            <ViewShot onCapture={(uri) => {
                console.log("urii", uri)
                sendDataBack(`data:image/png;base64,${uri}`)
            }}
                options={{
                    format: "png",
                    quality: 0.1,
                    result: "base64"
                }}
                captureMode="update"
                style={{ flex: 1 }}>


                <WebView
                    injectedJavaScriptBeforeContentLoaded={`
                                    window.onerror = function(message, sourcefile, lineno, colno, error) {
                                    alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
                                    return true;
                                    };
                                    true;
                                 `}
                    ref={viewRef}
                    onMessage={handleMessage}
                    source={{
                        uri: "https://www.google.com/"
                    }}
                    style={{ flex: 1 }}
                />


            </ViewShot>
        </View >
    );
};

export default Host;




