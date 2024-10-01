import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import {images} from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {getCurrentUser, signIn} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

const SignIn = () => {
    const  {setUser, setIsLoggedIn} = useGlobalContext()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password ) {
            Alert.alert("Error", "Please fill all fields")
            return
        }
        setIsSubmitting(true)
        try {
            await signIn(form.email, form.password)
            const result = await getCurrentUser()
            setUser(result)
            setIsLoggedIn(true)
            Alert.alert("Success", "User signed in successfully")
            router.replace('/home')
        } catch (e: any) {
            Alert.alert("Error", e.message)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <ScrollView>
                <View className={'w-full justify-center min-h-[85vh] px-4 my-6'}>
                    <Image source={images.logo} resizeMode={"contain"} className={"w-[115px] h-[35px]"}/>
                    <Text className={"text-2xl text-white mt-10 font-semibold"}>Log in to Aora</Text>
                    <FormField
                        title={"Email"}
                        value={form.email}
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e
                        })}
                        otherStyles={"mt-7"}
                        keyboardType={"email-address"}
                        placeholder={"Email"}
                    />
                    <FormField
                        title={"Password"}
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles={"mt-7"}
                        placeholder={"Password"}
                    />

                    <CustomButton title={"Sign in"} handlePress={submit} containerStyles={"mt-7"}
                                  isLoading={isSubmitting}/>
                    <View className={'justify-center pt-5 flex-row gap-2'}>
                        <Text className={"text-lg text-gray-100 font-pregular"}> Don't have account?</Text>
                        <Link href={"/sign-up"} className={'text-lg font-semibold text-secondary'}>Sign up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;