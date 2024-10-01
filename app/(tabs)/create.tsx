import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import FormField from "@/components/FormField";
import {ResizeMode, Video} from "expo-av";
import {icons} from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import {router} from "expo-router";
import {createVideo} from "@/lib/appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

const Create = () => {
    const [form, setForm] = useState<{
        title: string,
        thumbnail: any,
        video: any,
        prompt: string,
    }>({
        title: '',
        thumbnail: null,
        video: null,
        prompt: '',
    })
    const [uploading, setUploading] = useState(false)
    const {user} = useGlobalContext()

    const openPicker = async (selectType: any) => {
        let result;
        if (selectType === 'image') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
        } else if (selectType === 'video') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            });
        }


        // let result = await DocumentPicker.getDocumentAsync({
        //     type: selectType === 'image' ?
        //         ['image/jpeg', 'image/png', 'image/jpg'] : ['video/mp4', 'video/gif']
        // })
        //
        if (!result?.canceled) {
            if (selectType === "image") {
                setForm({...form, thumbnail: result?.assets[0]})
            }
            if (selectType === "video") {
                setForm({...form, video: result?.assets[0]})
            }
        }
    }


    const submit = async () => {
        if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
            return Alert.alert("Error", "All fields are required")
        }

        setUploading(true)
        try {
            await createVideo({
                ...form,
                userId: user.$id
            })

            Alert.alert("Success", "Video uploaded successfully")
            router.push('/home')
        } catch (e: any) {
            Alert.alert("Error", `${e.message} - submit`)
        } finally {
            setForm({
                title: '',
                thumbnail: null,
                video: null,
                prompt: '',
            })
            setUploading(false)

        }
    }
    return (
        <SafeAreaView className={"h-full bg-primary"}>
            <ScrollView className={'px-4 my-6'}>
                <Text className={"text-2xl text-white font-psemibold"}>Upload Video</Text>
                <FormField title={"Video Tile"} value={form.title} placeholder={"Give your video a catch title..."}
                           handleChangeText={e => setForm({...form, title: e})} otherStyles={'mt-10'}/>
                <View className={"mt-7 space-y-2"}>
                    <Text className={"text-base text-gray-100 font-pmedium"}>
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('video')}
                    >
                        {
                            form.video ? (
                                <Video
                                    className={"w-full h-64 rounded-2xl"}
                                    useNativeControls={true}
                                    resizeMode={ResizeMode.COVER}
                                    isLooping={true}
                                    source={{uri: form.video.uri}}
                                />
                            ) : (
                                <View
                                    className={"w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center"}>
                                    <View
                                        className={"w-14 h-14 border border-dashed border-secondary-100 justify-center items-center"}>
                                        <Image resizeMode={"contain"} className={'w-1/2 h-1/2'} source={icons.upload}/>
                                    </View>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
                <View className={"mt-7 space-y-2"}>
                    <Text className={"text-base text-gray-100 font-pmedium"}>
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('image')}
                    >
                        {
                            form.thumbnail ? (
                                <Image source={{uri: form.thumbnail.uri}} resizeMode={"cover"}
                                       className={'w-full h-64 rounded-2xl'}/>
                            ) : (
                                <View
                                    className={"w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2"}>

                                    <Image resizeMode={"contain"} className={'w-5 h-5'} source={icons.upload}/>
                                    <Text
                                        className={'text-sm text-gray-100 font-pmedium'}
                                    >Choose a file</Text>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
                <FormField title={"AI Prompt"} value={form.prompt}
                           placeholder={"The prompt you used to create this video..."}
                           handleChangeText={e => setForm({...form, prompt: e})} otherStyles={'mt-7'}/>

                <CustomButton containerStyles={"mt-7"} isLoading={uploading} title={"Submit & Publish"}
                              handlePress={submit}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;