import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {icons} from "@/constants";

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props}: {
    title: string,
    value: string,
    placeholder?: string,
    handleChangeText: (e: string) => void,
    keyboardType?: "email-address" | "default",
    otherStyles?: string
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className={'text-base text-gray-100 font-pmedium'}>{title}</Text>
            <View
                className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 border-2 focus:border-secondary items-center flex-row"}>
                <TextInput {...props} className={"flex-1 text-white font-psemibold text-base"} value={value}
                           placeholder={placeholder} placeholderTextColor={"#7b7b8b"} keyboardType={keyboardType} onChangeText={handleChangeText} secureTextEntry={title === "Password" && !showPassword}/>
                {title ==="Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image resizeMode={"contain"}  className={'w-10 h-10'} source={showPassword ? icons.eyeHide : icons.eye}/>
                    </TouchableOpacity>
                )

                }
            </View>
        </View>
    );
};

export default FormField;