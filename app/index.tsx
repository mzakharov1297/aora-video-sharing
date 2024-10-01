import {View, Text, Image, ScrollView, SafeAreaView} from "react-native";
import React from 'react';
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";

export default function App() {
    const {isLoggedIn, loading} = useGlobalContext()

    if (!loading && isLoggedIn) {
        return <Redirect href={'/home'}/>
    }
    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className={"w-full  items-center justify-center h-[85vh] px-4"}>
                    <Image resizeMode={"contain"} source={images.logo} className={'w-[130px] h-[84px]'}/>
                    <Image resizeMode={"contain"} source={images.cards} className={'max-w-[380px] w-full h-[300px]'}/>
                    <View className={"relative mt-5"}>
                        <Text className={"text-3xl text-white font-bold text-center"}>Discover Endless Possibilities
                            with <Text className={"text-secondary-200"}>Aora</Text></Text>
                        <Image resizeMode={"contain"} source={images.path}
                               className={"w-[136px] h-[15px] absolute -bottom-2 -right-8"}/>
                    </View>

                    <Text className={"text-sm font-pregular text-gray-100 mt-7 text-center"}>Where creativity meets
                        innovation:
                        embark on a journey of limitless exploration with Aora</Text>
                    <CustomButton title={"Continue with Email"} handlePress={() => {
                        router.push("/sign-in")
                    }} containerStyles={"w-full mt-7"}/>
                </View>
            </ScrollView>

            <StatusBar  backgroundColor={"#161622"} style={"light"}/>
        </SafeAreaView>
    )
}

