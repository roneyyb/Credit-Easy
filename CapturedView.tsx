/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Image, View, PanResponder, Dimensions } from 'react-native';

// import { WebSocket } from 'react-native-websocket';

const ScreenShare = (props) => {

    //console.log(props.action && props.action.slice(0, 100), "action")
    // const webviewRef = useRef(null);

    // useEffect(() => {
    //     // const ws = new WebSocket('ws://user_a_device_ip:port');

    //     // ws.onmessage = (message) => {
    //     //     const action = JSON.parse(message.data);
    //     //     if (action.type === 'update_screen') {
    //     webviewRef.current.injectJavaScript(`document.body.innerHTML = ${JSON.stringify(props.action)};`);
    //     //     }
    //     // };

    //     return () => {
    //         // ws.close();
    //     };
    // }, [props.action]);


    const [lastY, setLastY] = React.useState(null);



    const touchStart = React.useRef({ x: 0, y: 0 });

    const handleTouchStart = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        touchStart.current = { x: locationX, y: locationY }
        console.log(locationX, locationY, "onTOuch start")
        //props.setTouch({ X: locationX, Y: locationY })
        // console.log(locationX, locationY)
        // const ws = new WebSocket('ws://user_a_device_ip:port');
        // ws.send(JSON.stringify({ type: 'tap', x: locationX, y: locationY }));
    };

    const handleTouchEnd = (event) => {
        const { locationX, locationY, } = event.nativeEvent;
        //  console.log(locationX, locationY, "onTOuch end")
        if (touchStart.current.x == locationX && touchStart.current.y == locationY) {
            props.setTouch({ X: locationX / Dimensions.get("window").width, Y: locationY / (Dimensions.get("window").height - 40) })
        }
        else if (touchStart.current.y != locationY) {
            // horizontal scroll
            props.setScroll(touchStart.current.y - locationY)
        } else {
            //vertical scroll
            props.setScroll(touchStart.current.x - locationX)
        }
        // props.setTouch({ X: locationX, Y: locationY })
        // console.log(locationX, locationY)
        // const ws = new WebSocket('ws://user_a_device_ip:port');
        // ws.send(JSON.stringify({ type: 'tap', x: locationX, y: locationY }));
    };

    const handleTouchMove = (event) => {
        const { locationX, locationY } = event.nativeEvent;


        // props.setScroll(touchStart.current.y - locationY);

        // touchStart.current = { x: locationX, y: locationY }
        // console.log(locationX, locationY, "onTOuch Move")
        // props.setTouch({ X: locationX, Y: locationY })
        //  console.log(locationX, locationY)
        // const ws = new WebSocket('ws://user_a_device_ip:port');
        // ws.send(JSON.stringify({ type: 'tap', x: locationX, y: locationY }));
    };


    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                console.log('Scroll velocity:', gestureState.vy);
            },
        })
    ).current;

    const [nextImg, setNextImg] = React.useState("");

    const [prvImg, setPrevImg] = React.useState("");


    React.useEffect(() => {
        //console.log(props?.action?.length, "inssii")
    }, [props.action])

    React.useEffect(() => {


        if (props.action !== nextImg) {

            //   console.log("updated", nextImg, prvImg)
            setPrevImg(nextImg)
            setNextImg(props.action);

        }
    }, [props.action, nextImg, prvImg])


    const [height, setHeight] = React.useState(0)
    //console.log(props.action, "adsd")

    return (
        <>
            {/* <WebView
                ref={webviewRef}
                onTouchStart={handleTouch}
                onTouchMove={handleTouch}
                onTouchEnd={handleTouch}
                source={{ uri: 'http://user_a_device_ip:port' }}
            /> */}
            <View
                onLayout={({ nativeEvent: { layout: { y, x, height, width } } }) => {

                    console.log("hiehght of inter", height)
                    setHeight(height)
                }}

                {...panResponder.panHandlers}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ flex: 1 }}>
                {prvImg && <Image source={{ uri: prvImg }} resizeMode='cover' style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: -1, }} />}
                {nextImg && <Image source={{ uri: nextImg }} resizeMode='cover' style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: 100, }} />}
            </View>
        </>
    );
};

export default ScreenShare;
