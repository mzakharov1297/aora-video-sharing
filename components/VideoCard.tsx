import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from "react-native";
import {icons} from "@/constants";
import {ResizeMode, Video} from "expo-av";

const VideoCard = ({video}: {
    video: {
        title: string,
        thumbnail: string,
        video: string,
        creator: {
            username: string,
            avatar: string
        }
    }
}) => {
    const [play, setPlay] = useState(false)

    const handleError = (error: any) => {
        console.error(error);
        Alert.alert("Error", "Failed to load video");
    };
    return (
        <View className={"flex-col items-center px-4 mb-14"}>
            <View className={"flex-row gap-3 items-start"}>
                <View className={"justify-center items-center flex-row flex-1"}>
                    <View
                        className={"w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5"}>
                        <Image source={{uri: video.creator.avatar}} className={'w-full h-full rounded-lg'}
                               resizeMode={"cover"}/>
                    </View>
                    <View className={"justify-center flex-1 ml-3 gap-y-1"}>
                        <Text className={"text-white font-psemibold text-sm"} numberOfLines={1}>
                            {video.title}
                        </Text>
                        <Text numberOfLines={1} className={"text-gray-100 font-pregular text-xs"}>
                            {video.creator.username}
                        </Text>
                    </View>
                </View>

                <View className={'pt-2'}>
                    <Image source={icons.menu} className={"w-5 h-5"} resizeMode={"contain"}/>
                </View>
            </View>

            {
                play ? (
                        <Video

                            onPlaybackStatusUpdate={(status) => {
                                if ((status as any).didJustFinish) {
                                    setPlay(false)
                                }
                            }}
                            useNativeControls={true}
                            shouldPlay={true}
                            resizeMode={ResizeMode.CONTAIN}
                            className={"w-full h-60 rounded-xl mt-3"}
                            source={{
                                uri: video.video
                            }}
                            onError={handleError}
                        />
                ) :
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    className={"w-full h-60 rounded-xl mt-3 relative justify-center items-center"}
                    >
                        <Image resizeMode={"cover"} className={"w-full h-full rounded-xl mt-3"} source={{uri: video.thumbnail}}/>
                        <Image className={"absolute w-12 h-12"} resizeMode={"contain"} source={icons.play}/>
                    </TouchableOpacity>
            }
        </View>
    );
};

export default VideoCard;