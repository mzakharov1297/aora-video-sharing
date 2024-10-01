import React from 'react';
import {Text, TouchableOpacity} from "react-native";

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}: {
    title: string,
    handlePress: () => void,
    containerStyles?: string,
    textStyles?: string,
    isLoading?: boolean
}) => {
    return (
        <TouchableOpacity disabled={isLoading} onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[64px] items-center justify-center ${containerStyles} ${isLoading ? "opacity-50" : ''}`}>
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;