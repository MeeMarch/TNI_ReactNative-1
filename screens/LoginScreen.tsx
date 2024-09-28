import { View } from "react-native";
import React from "react";
import { Text, Card, Input, Button } from "@rneui/base";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { login } from "../services/auth-servise";
import { AxiosError } from "../services/http-service";
import Toast from "react-native-toast-message";

const LoginScreen = (): React.JSX.Element => {
  //1.defind validate with Yub schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please input email")
      .email("Email format is invalid."),
    password: yup
      .string()
      .required("Please input password")
      .min(3, "Password must be at least 3 characters."),
  });
  //2.Apply with React Hook form
  const {
    control,
    handleSubmit, //ฟังก์ชันที่ใช้เพื่อจัดการเมื่อฟอร์มถูกส่ง​
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all", //ตรวจสอบความถูกต้องทุกครั้งที่มีการเปลี่ยนแปลงข้อมูล​
  });

  const onLogin = async (data: any) => {
    try {
      const response = await login(data.email, data.password);
      if (response.status === 200) {
        Toast.show({ type: "success", text1: "Login Success" });
        //console.log("login success");
      }
    } catch (error: any) {
      let err: AxiosError<any> = error; //แปลงความผิดพลาดเป็น AxiosError
      if (err.response?.status === 401) {
        Toast.show({ type: "error", text1: err.response.data.message });
        //console.log(err.response.data.message);
      } else {
        Toast.show({
          type: "error",
          text1: "เกิดข้อผิดพลาด ไม่สามารถติดต่อ Server ได้",
        });
        //console.log("เกิดข้อผิดพลาด ไม่สามารถติดต่อ Server ได้");
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text h2>Apsorn</Text>
      <Card containerStyle={{ padding: 10, width: "90%" }}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              placeholder="Email"
              leftIcon={{ name: "email" }}
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              placeholder="Password"
              leftIcon={{ name: "key" }}
              keyboardType="number-pad"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button
          title="Log In"
          size="lg"
          onPress={handleSubmit(onLogin)}
          loading={isSubmitting}
          disabled={!isValid}
        />
      </Card>
    </View>
  );
};
export default LoginScreen;