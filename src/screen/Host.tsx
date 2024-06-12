/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Dimensions, Keyboard, Pressable, StatusBar, View } from 'react-native';
// import CobrowseIO, { CobrowseView } from 'cobrowse-sdk-react-native';

import ViewShot, { captureRef } from "react-native-view-shot";
import { WebView } from 'react-native-webview';
// "cobrowse-sdk-react-native": "^2.18.1",
// CobrowseAccessibilityService.showSetup('')
import { NativeModules } from 'react-native';
import io from "socket.io-client";
const { TouchSimulator } = NativeModules;

const digitKeyCodeMap = {
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
};
const { height, width, scale } = Dimensions.get("window");

console.log(height, width, scale, "SDdf")

const ENDPOINT = 'https://www.teachandlearn.online';

const ROOMID = "temp_roomID";
var socket: any;

const Host = ({ disconnect }) => {

    const [currentCaptured, setCurrentCaptured] = useState("");

    const [touch, setTouch] = React.useState({});




    const simulateTap = (x, y) => {



        const script = ` var element = document.elementFromPoint(${x * width}, ${(y * (height - 40))});
var elementType = element.tagName; // Get element type (e.g., "INPUT")
var elementId = element.id; // Get element ID (if available)
// ... Use elementType and elementId to perform actions ...
window.ReactNativeWebView.postMessage(JSON.stringify({
    type: 'log',
    message: "Focused Element Details  nee Tapppp: " + JSON.stringify({
        type: elementType,
        id: elementId
    })
}));
  var iframe = document.getElementById(elementId);
  var iFrameType = iframe.tagName; // Get iFrame type (e.g., "INPUT")
var iFrameId = iframe.id; // Get iFrame ID (if available)
window.ReactNativeWebView.postMessage(JSON.stringify({
    type: 'log',
    message: "Focused Element Deta: " + JSON.stringify({
        type: iFrameType,
        id: iFrameId
    })
}));
        // Access the contentWindow property to get the window object of the iframe
        var iframeWindow = iframe.contentWindow;
        var iframeDoc = iframe.contentDocument;

        // Access the document object of the iframe
       //var iframeDocument = iframe.contentWindow.document;

        // Access and modify the content of the iframe
       //iframeDoc.body.innerHTML = '<h1>Hello from Main Page</h1>';
  const inputElement = iframe.contentWindow.document.querySelector('input, select, textarea');
      if (inputElement) {
        inputElement.value = "This is the embedded text";
      } else {
       window.ReactNativeWebView.postMessage(JSON.stringify({
    type: 'log',
    message: "Focused Element Deta: no textinput found"
}));
      }
                        `;


        console.log("Scripte", script)
        viewRef.current.injectJavaScript(script)

        // TouchSimulator.simulateTouch(x, ((y * (height - 40)) + 40) / height, StatusBar.currentHeight * scale);
        captureViewForSomeSecond()
    };


    // if (element && (element.tagName === 'TEXTAREA' || element.tagName === 'IFRAME' || element.tagName == "INPUT")) {
    //     //  element.value="someme"
    //     var input = document.querySelector('input, select, textarea');
    //     var event = new Event('focus');
    //     element.dispatchEvent(event);
    //     input.dispatchEvent(event)
    //     element.focus()
    // } else {

    //     const event = new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //         clientX: ${ x * width},
    //         clientY: ${(y * (height - 40))}
    //                                     });
    // element.dispatchEvent(event);
    //                     }

    const simulateScroll = (deltaY) => {
        const script = `
    window.scrollBy(0, ${deltaY});
    
  `;


        viewRef.current.injectJavaScript(script);
        captureViewForSomeSecond()
        // captureScreen()
    };


    function simulateTextInput(text) {

        const script = `
    var focusedElement = document.activeElement;
    if (focusedElement) {
      var elementType = focusedElement.tagName; // Get element type (e.g., "INPUT")
      var elementId = focusedElement.id; // Get element ID (if available)
       window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'log',
        message: "Focused Element Details: " + JSON.stringify({
          type: elementType,
          id: elementId
        })
      }));
      // ... Use elementType and elementId to perform actions ...
// focusedElement.value = '${text}';

//    const iframe = document.getElementById(elementId);
//    //   const inputElement = iframe.contentWindow.document.querySelector('input[type="text"]');
// //    var elementTypeN = inputElement.tagName; // Get element type (e.g., "INPUT")
// //       var elementIdN = inputElement.id; // Get element ID (if available)
//        window.ReactNativeWebView.postMessage(JSON.stringify({
//         type: 'log',
//         message: "Focused Element Details nnnnnn: " + JSON.stringify(iframe)
//       }));
// //  inputElement.value = '${text}';
//     focusedElement.blur()
     
    } else {
      console.error("No focused element");
    }
  `;

        console.log(script);
        viewRef.current.injectJavaScript(script);
        captureViewForSomeSecond()

        Keyboard.dismiss();

        // captureScreen()


    }

    const askForScreenControl = () => {
        if (true) {
            socket = io(ENDPOINT);

            socket.emit("joinRoom", ROOMID);
            socket.on('receivedPrivateMessage', (msg: any) => {
                //console.log("messs prri", msg)
                const message = JSON.parse(msg);
                console.log(message.type, "hosttt  ")
                if (message.type) {
                    if (message.type == "scroll") {
                        simulateScroll(message.delta)
                    } else if (message.type == "touch") {

                        simulateTap(message.X, message.Y)
                    } else if (message.type == "fillInput") {
                        console.log(message.value, "asdfdsaf")

                        const number = message.value + "";
                        // FRom 7 0 is starting//
                        // number.split("").forEach(item => {
                        //     console.log(item, "item")
                        //     TouchSimulator.triggerKeyEvent(+item + 7)
                        //     simulateTextInput(number)
                        // })

                        simulateTextInput(message.value);

                        console.log("value")

                    }
                }
            })
        }
    }


    React.useEffect(() => {
        askForScreenControl()
        const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () => {
            console.log("keeyy")
            sendDataBack({ type: "input" });
        });

        return () => {
            keyboardOpenListener.remove()
            socket?.disconnect()
        }
    }, [])

    const sendDataBack = (message) => {

        socket.emit("sendPrivateMessage", { message: JSON.stringify(message), roomId: ROOMID });

    }





    const viewRef = React.useRef(null);





    const handleMessage = event => {
        console.log("event", event)
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'log') {
            console.log('Message from WebView:', message.message);
        }
    };

    const capture = React.useRef(null); // To store the interval reference
    const viewShotRef = React.useRef(null);


    let timer = React.useRef(0);
    const captureView = () => {
        console.log("caputreee", timer.current)
        if (timer.current === 5000) {
            clearInterval(capture.current);
            timer.current = 0;
        } else {
            captureRef(viewShotRef.current, {
                format: "png",
                quality: 0.1,
                result: "base64"

            }).then((uri) => {
                sendDataBack({ type: "image", value: `data:image/png;base64,${uri}` })
            }).catch((error) => console.error("Capture error:", error));
        }
    }

    React.useEffect(() => { clearInterval(capture.current) }, [])

    const captureViewForSomeSecond = () => {

        // console.log("capopp main")
        // if (capture.current) {
        //     timer.current = 0;
        //     clearInterval(capture.current)
        // }

        // capture.current = setInterval(() => {
        //     timer.current += 1000;
        //     captureView()
        // }, 1000);
    }


    // React.useEffect(() => {
    //     captureInterval.current = setInterval(() => {
    //         captureRef(viewShotRef.current, {
    //             format: "png",
    //             quality: 0.1,
    //             result: "base64"

    //         }).then((uri) => {
    //             sendDataBack({ type: "image", value: `data:image/png;base64,${uri}` })
    //         }).catch((error) => console.error("Capture error:", error));
    //     }, 1000); // Capture every second (adjust interval as needed)

    //     return () => clearInterval(captureInterval.current); // Cleanup on unmount
    // }, []);

    return (
        <View style={{ flex: 1 }}>
            <Pressable

                style={{ height: 40, width: "100%", backgroundColor: "red" }}
                onPress={() => {
                    simulateTap(0.2, 0.4)
                    // sendDataBack("somethitn")
                    //  disconnect()

                }}

            />

            <ViewShot
                // onCaptureFailure={(capture) => {
                //     console.log("capture")
                // }}
                ref={viewShotRef}

                // onLayout={() => {

                // }}
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
                    onLoad={() => { captureViewForSomeSecond() }}
                    style={{ flex: 1, backgroundColor: "green" }}
                />


            </ViewShot>
        </View >
    );
};

export default Host;




