/* eslint-disable prettier/prettier */
import { View, Text, Dimensions, Image } from 'react-native';
import io from "socket.io-client";
import React from 'react';

const ENDPOINT = 'https://www.teachandlearn.online';
const ROOMID = "temp_roomID";

var socket: any;

const Controller = () => {


    const askForScreenControl = () => {
        if (true) {
            socket = io(ENDPOINT);
            console.log("soc", ENDPOINT)
            socket.emit("joinRoom", ROOMID);
            socket.on('receivedPrivateMessage', (msg: any) => {
                console.log("messs controller", msg)
                const img = JSON.parse(msg)

                if (!img.type) {
                    setPrevImg(nextImg);
                    setNextImg(img);
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

    const touchStart = React.useRef({ x: 0, y: 0 });

    const handleTouchStart = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        touchStart.current = { x: locationX, y: locationY }

    };

    const handleTouchEnd = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        //  console.log(locationX, locationY, "onTOuch end")
        if (touchStart.current.x == locationX && touchStart.current.y == locationY) {

            sendDataBack({ type: "touch", X: locationX / Dimensions.get("window").width, Y: locationY / (Dimensions.get("window").height - 40) })
        }
        else if (touchStart.current.y != locationY) {
            // horizontal scroll
            sendDataBack({ type: "scroll", delta: touchStart.current.y - locationY })
        } else {
            //vertical scroll
            sendDataBack({ type: "scroll", delta: touchStart.current.y - locationY })
        }

    };

    const [nextImg, setNextImg] = React.useState("");

    const [prvImg, setPrevImg] = React.useState("");

    return (
        <View

            onTouchStart={handleTouchStart}

            onTouchEnd={handleTouchEnd}
            style={{ flex: 1 }}>
            {prvImg && <Image source={{ uri: prvImg }} resizeMode='contain' style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: -1, }} />}
            {nextImg && <Image source={{ uri: nextImg }} resizeMode='contain' style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: 100, }} />}
        </View>
    );
};

export default Controller;
