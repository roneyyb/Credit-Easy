/* eslint-disable prettier/prettier */
import { View, Text, Dimensions, Image, TextInput, Button } from 'react-native';
import io from "socket.io-client";
import React from 'react';

const ENDPOINT = 'https://www.teachandlearn.online';
const ROOMID = "temp_roomID";

var socket: any;

const Controller = () => {

    const [showTextInput, setShowTextInput] = React.useState(false);
    const [nextImg, setNextImg] = React.useState("");
    const prvImg = React.useRef("");
    const [value, setValue] = React.useState("")
    const [incomingImage, setIncomingImg] = React.useState("");


    React.useEffect(() => {

        prvImg.current = nextImg.length > 0 ? nextImg : incomingImage;
        setNextImg(incomingImage);
    }, [incomingImage.length, nextImg.length, nextImg, incomingImage])



    React.useEffect(() => { }, [])

    const setPrevNxtImg = React.useCallback((img) => {
        // eslint-disable-next-line no-trailing-spaces
        //  console.log(img.length, nextImg.length, "asdfdljskjlfkd", prvImg.length)
        setIncomingImg(img)
    }, [nextImg])



    const askForScreenControl = React.useCallback(() => {
        if (true) {
            socket = io(ENDPOINT);
            console.log("soc", ENDPOINT)
            socket.emit("joinRoom", ROOMID);
            socket.on('receivedPrivateMessage', (msg: any) => {
                //   console.log("messs controller", msg)
                const img = JSON.parse(msg)

                if (img.type == "image") {

                    setPrevNxtImg(img.value)

                } else if (img.type == "input") {
                    setShowTextInput(true)
                }
            })
        }
    }, [setPrevNxtImg])


    React.useEffect(() => {
        askForScreenControl()

        return () => {
            socket?.disconnect()
        }
    }, [])

    const sendDataBack = (message) => {
        console.log("sendndn", message)
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





    console.log(prvImg.current.length, nextImg.length);

    return (
        <>
            {showTextInput && <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 10, zIndex: 1000, backgroundColor: "#242424" }}>
                <Text style={{ color: "#ffffff" }}>{"TEXT INPUT"}</Text>
                <TextInput value={value} onChangeText={(text) => { setValue(text) }} />
                <Button title='CLOSE' onPress={() => {
                    console.log("value", value)
                    sendDataBack({ type: "fillInput", value: value })
                    setValue("")
                    setShowTextInput(false)
                }} />
            </View>}
            <View

                onTouchStart={handleTouchStart}

                onTouchEnd={handleTouchEnd}
                style={{ flex: 1 }}>

                {prvImg.current && <Image source={{ uri: prvImg.current }} resizeMode='contain' style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: -1, }} />}
                {nextImg && <Image source={{ uri: nextImg }} resizeMode={"contain"} style={{ height: "100%", width: "100%", position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: 100, }} />}

            </View>

        </>
    );
};

export default Controller;
