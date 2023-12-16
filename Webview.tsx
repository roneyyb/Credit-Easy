import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const Webview = (props) => {
  return (
    <>
      <WebView
        // https://cobrowse.io/session/eh7v2qg5AKMj-bQbc980Vg
        source={{
          // uri: 'https://cobrowse.io/session/NnciZsPTnRb-qMEFbnEkDA?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IlZpZXdlciIsInBvbGljeSI6eyJ2ZXJzaW9uIjoyLCJzZXNzaW9ucyI6eyJpZCI6Ik5uY2lac1BUblJiLXFNRUZibkVrREEifX0sImlhdCI6MTcwMjcwNjI3MCwiZXhwIjoxNzAyNzkyNjcwLCJhdWQiOiJodHRwczovL2NvYnJvd3NlLmlvIiwiaXNzIjoiTk82V0dNc2F6VGVGbWciLCJzdWIiOiJ2aWV3ZXJAZXhhbXBsZS5jb20ifQ.Mc1CbkbJyym9tM42F-yuGqtJw6E4A7NdjZxPv4BMeNQ&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none',
          uri:`${props?.url}`
        }}
        style={{flex: 1}}
      />
    </>
  );
};

export default Webview;

const styles = StyleSheet.create({});
