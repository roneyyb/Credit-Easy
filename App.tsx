/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Dimensions, Pressable, StatusBar, Text } from 'react-native';
import React, { useState } from 'react';
// import CobrowseIO, { CobrowseView } from 'cobrowse-sdk-react-native';
import { Button } from 'react-native';

import { captureRef } from 'react-native-view-shot';
import ViewShot from "react-native-view-shot";
import ScreenShare from './CapturedView';
import { WebView } from 'react-native-webview';
// "cobrowse-sdk-react-native": "^2.18.1",
// CobrowseAccessibilityService.showSetup('')
import { NativeModules } from 'react-native';

const { TouchSimulator } = NativeModules;

const { height, width } = Dimensions.get("window");

const App = () => {

    const [currentCaptured, setCurrentCaptured] = useState("");

    const [touch, setTouch] = React.useState({});

    const interval = React.useRef(null);

    const captureScreen = async () => {

        // interval.current = setInterval(() => {

        setTimeout(() => {
            (async () => {
                const uri = await captureRef(touchableViewRef, { format: 'png', quality: 1 });

                console.log("urii length", uri.length)
                // const base64 = await RNFS.readFile(uri, 'base64');
                // setShowScreen(false)

                setCurrentCaptured(uri)
                setShowScreen(true)



            })();
        }, 500)
        // }, 200)
        // webSocketServerRef.current.clients.forEach((client) => {
        //     client.send(JSON.stringify({ type: 'update_screen', base64 }));
        // });
    };

    const touchableViewRef = React.useRef(null);

    const simulateTap = (x, y) => {

        // const element = document.elementFromPoint(x, y);
        // console.log(element, "element")
        // if (element.type === 'text') {
        //     element.focus();
        // } else {
        //     const event = new MouseEvent('click', {
        //         bubbles: true,
        //         cancelable: true,
        //         clientX: x,
        //         clientY: y
        //     });
        //     element.focus();
        //     element.dispatchEvent(event);
        // }
        // let script = `
        //     function simulateTap(x, y) {
        //         console.log('sdff')
        //     var elements = document.querySelectorAll('input[type="text"]');
        //     var closestElement = null;
        //     var minDistance = Number.MAX_SAFE_INTEGER;

        //     elements.forEach(function (element) {
        //         var rect = element.getBoundingClientRect();
        //         var elementX = rect.left + (rect.right - rect.left) / 2;
        //         var elementY = rect.top + (rect.bottom - rect.top) / 2;
        //         var distance = Math.sqrt(Math.pow(x - elementX, 2) + Math.pow(y - elementY, 2));

        //         if (distance < minDistance) {
        //             closestElement = element;
        //             minDistance = distance;
        //         }
        //     });

        //     if (closestElement) {
        //         console.log('Found closest element:', closestElement);
        //         closestElement.focus();
        //     } else {
        //         console.log('No element found at coordinates:', x, y);
        //     }
        // }
        // simulateTap(${x}, ${y});
        //   `;

        //     const script = `
        //   var elements = document.querySelectorAll('input[type="text"]');
        //   var closestElement = null;
        //   var minDistance = Number.MAX_SAFE_INTEGER;

        //   elements.forEach(function(element) {
        //     var rect = element.getBoundingClientRect();
        //     var elementX = rect.left + (rect.right - rect.left) / 2;
        //     var elementY = rect.top + (rect.bottom - rect.top) / 2;
        //     var distance = Math.sqrt(Math.pow(${x} - elementX, 2) + Math.pow(${y} - elementY, 2));

        //     if (distance < minDistance) {
        //       closestElement = element;
        //       minDistance = distance;
        //     }
        //   });

        //   if (closestElement) {
        //     closestElement.focus();
        //   }
        // `;


        //         const script = `
        //   var element = document.querySelector('input[type="text"]');
        //   console.log(element,"element)
        //   if (element) {
        //     element.focus();
        //   }
        // `;

        // console.log(script, "sc")
        // let script = `var input = document.querySelector('input[type=text]');
        // if (input) {
        //   var rect = input.getBoundingClientRect();
        //   var x = rect.left + (rect.right - rect.left) / 2;
        //   var y = rect.top + (rect.bottom - rect.top) / 2;
        //   var element = document.elementFromPoint(x, y);
        //   if (element) {
        //     element.focus();
        //   }
        // }`

        const script = `
          var element = document.elementFromPoint(${x}, ${y});
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
                      clientX:${x},
                      clientY:  ${y}
                    });
                    element.dispatchEvent(event);
          }

        `;

        //     const script = `
        //   console.log('Starting selection process at coordinates:', ${x}, ${y});

        //  var elements = document.querySelector('input[type="text"]');
        //   console.log('Found', elements.length, 'text input elements');

        //   var closestElement = null;
        //   var minDistance = Number.MAX_SAFE_INTEGER;

        //    window.ReactNativeWebView.postMessage(JSON.stringify({
        //     type: 'log',
        //     message: elements
        //   }));




        //   // Send console log messages back to React Native
        //   window.ReactNativeWebView.postMessage(JSON.stringify({
        //     type: 'log',
        //     message: 'Selection process completed'
        //   }));
        // `;
        console.log("siii", y, ((y * (height - 40)) + 40), lastIndx, "asldtt")

        //  console.log(x, ((y * viewHeight) + 40), ((y * viewHeight) + 40) / height)
        TouchSimulator.simulateTouch(x, ((y * (height - 40)) + 40) / height);
        // viewRef.current.injectJavaScript(script);
        // captureScreen()
    };

    const simulateScroll = (deltaY) => {
        const script = `
    window.scrollBy(0, ${deltaY});
    
  `;

        console.log(script)

        viewRef.current.injectJavaScript(script);
        // captureScreen()
    };


    React.useEffect(() => {

        return () => {
            //  clearInterval(interval.current)
        }
    }, [])
    React.useEffect(() => {
        if (touch.X)
            simulateTap(touch.X, touch.Y)
    }, [touch])

    const [scroll, setScroll] = React.useState();

    React.useEffect(() => {
        console.log(scroll)
        if (scroll)
            simulateScroll(scroll)
    }, [scroll]);

    const viewRef = React.useRef(null);
    const [showScreen, setShowScreen] = React.useState(false);


    React.useEffect(() => {
        // console.log(currentCaptured?.length, "cuuuleen")
    }, [currentCaptured])

    // console.log("shoort scree", showScreen)

    const handleMessage = event => {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'log') {
            console.log('Message from WebView:', message.message);
        }
    };


    const handleTouchStart = (event) => {

        //This is not counting y from top of a touched view else
        // it is counting y from starting of the view 
        // like for parent 1 whose height is 40 then if you click in that parent1 view then y will be from 0 to 40 but
        // for a next parent it will not add that 40 into y
        const { locationX, locationY } = event.nativeEvent;
        // touchStart.current = { x: locationX, y: locationY }
        // console.log(locationX, locationY, "onTOuch start")
        //props.setTouch({ X: locationX, Y: locationY })

        setLastIndx({ x: locationX, y: locationY })
        console.log(locationX, locationX / 384, locationY, locationY / viewHeight, "stasrt touch")
        // const ws = new WebSocket('ws://user_a_device_ip:port');
        // ws.send(JSON.stringify({ type: 'tap', x: locationX, y: locationY }));
    };

    // React.useEffect(() => {


    // }, [])

    const [viewHeight, setViewHeight] = React.useState(0);
    const [lastIndx, setLastIndx] = React.useState({ x: 0, y: 0 });

    const handleTouchStartButton = (event) => {

        //This is not counting y from top of a touched view else
        // it is counting y from starting of the view 
        // like for parent 1 whose height is 40 then if you click in that parent1 view then y will be from 0 to 40 but
        // for a next parent it will not add that 40 into y
        const { locationX, locationY } = event.nativeEvent;

        console.log(locationX, locationY, "button touch")
        // const ws = new WebSocket('ws://user_a_device_ip:port');
        // ws.send(JSON.stringify({ type: 'tap', x: locationX, y: locationY }));
    };


    return (
        <View onTouchStart={handleTouchStart} style={{ flex: 1 }}>
            <Pressable
                onLayout={({ nativeEvent: { layout: { y, x, height, width } } }) => {
                    // setViewHeight(height)
                    console.log(height, width, x, y, "height button")
                }}
                style={{ height: 40, width: "100%", backgroundColor: "red" }}
                //title={showScreen ? "SHowing captured screen in webview" : "Capture Screen"}
                onPress={() => {
                    //   console.log("asdjfsaldjf", StatusBar.currentHeight, Dimensions.get("screen"), Dimensions.get("window"))
                    setShowScreen(true)
                    //simulateTap(190 / width, (290) / (height - 40))

                }}

            />

            <ViewShot onLayout={({ nativeEvent: { layout: { y, x, height, width } } }) => {
                setViewHeight(height)
                console.log(height, width, x, y, "height width")
            }} onCapture={(uri) => {
                setCurrentCaptured(uri);
                //  setShowScreen(true);
            }}
                captureMode="continuous"
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
                    // https://cobrowse.io/session/eh7v2qg5AKMj-bQbc980Vg
                    source={{
                        // uri: 'https://cobrowse.io/session/NnciZsPTnRb-qMEFbnEkDA?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IlZpZXdlciIsInBvbGljeSI6eyJ2ZXJzaW9uIjoyLCJzZXNzaW9ucyI6eyJpZCI6Ik5uY2lac1BUblJiLXFNRUZibkVrREEifX0sImlhdCI6MTcwMjcwNjI3MCwiZXhwIjoxNzAyNzkyNjcwLCJhdWQiOiJodHRwczovL2NvYnJvd3NlLmlvIiwiaXNzIjoiTk82V0dNc2F6VGVGbWciLCJzdWIiOiJ2aWV3ZXJAZXhhbXBsZS5jb20ifQ.Mc1CbkbJyym9tM42F-yuGqtJw6E4A7NdjZxPv4BMeNQ&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none',
                        uri: "https://www.google.com/"
                    }}
                    style={{ flex: 1 }}
                />


            </ViewShot>
            {showScreen && <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, backgroundColor: "green" }}>
                {/* <Button title={showScreen ? "SHowing captured screen in webview" : "Capture Screen"} onPress={() => {
            //                     setShowScreen(false)
            //                     // if (showScreen) {

            //                     // } else {
            //                     //     captureScreen();
            //                     // }
            //                 }} /> */}
                <Pressable
                    style={{ height: 40, width: "100%", backgroundColor: "red" }}
                    //title={showScreen ? "SHowing captured screen in webview" : "Capture Screen"}
                    onPress={() => {
                        setShowScreen(false)
                    }}

                >
                    <Text>   {showScreen ? "SHowing captured screen in webview" : "Capture Screen"}</Text>
                </Pressable>
                <ScreenShare action={currentCaptured} setTouch={setTouch} setScroll={setScroll} />
            </View>}
            <View onTouchStart={handleTouchStartButton} style={{ position: "absolute", top: 40 + 290, left: 0, padding: 4, backgroundColor: "green", zIndex: 100000 }} />

            {/* </ViewShot> */}


        </View >
    );
};

export default App;




