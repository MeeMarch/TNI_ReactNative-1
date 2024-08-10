import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { stylesLogin } from "../styles/styles";

const Login = (): React.JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (!name) {
      Alert.alert("Please Enter Name");
    }
    if (!email) {
      Alert.alert("Please Enter Email");
    }
    if (name && email) {
      Alert.alert("Success");
    }
  };

  return (
    <View style={stylesLogin.container}>
      <TextInput
        style={stylesLogin.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="SUBMIT" onPress={handleSubmit} />
    </View>
  );
};

export default Login;