import React, {useState} from 'react';
import {FlatList, Image, ImageBackground, TouchableOpacity, Alert} from "react-native";
import * as Animatable from 'react-native-animatable';
import {icons} from "@/constants";
import {ResizeMode, Video} from "expo-av";

const zoomIn: any = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut: any = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({activeItem, item}: {
    activeItem: any,
    item: any
}) => {
    const [play, setPlay] = useState(false)

    const handleError = (error: any) => {
        console.error(error);
        Alert.alert("Error", "Failed to load video");
    };
    return (
        <Animatable.View className={"mr-5"}
                         animation={activeItem === item.$id ? zoomIn : zoomOut}
                         duration={500}
        >

            {play ? (
                <Video

                    onPlaybackStatusUpdate={(status) => {
                        if ((status as any).didJustFinish) {
                            setPlay(false)
                        }
                    }}
                    useNativeControls={true}
                    shouldPlay={true}
                    resizeMode={ResizeMode.CONTAIN}
                    className={"w-52 h-72 rounded-[35px] mt-3 bg-white/10"}
                    source={{
                        uri: item.video
                    }}
                    onError={handleError}
                />
            ) : <TouchableOpacity className={"relative justify-center items-center"} activeOpacity={0.7}
                                  onPress={() => setPlay(true)}>
                <ImageBackground resizeMode={'cover'}
                                 className={'w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'}
                                 source={{
                                     uri: item.thumbnail,
                                 }}/>
                <Image className={"absolute w-12 h-12"} resizeMode={"contain"} source={icons.play}/>
            </TouchableOpacity>}
        </Animatable.View>
    )
}

const Trending = ({posts}: { posts: any }) => {
    const [activeItem, setActiveItem] = useState(posts[0])

    const viewableItemChanged = ({viewableItems}: {
        viewableItems: any
    }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 70
            }}
            contentOffset={{x: 170, y: 0}}
            renderItem={({item}) => (
                <TrendingItem activeItem={activeItem} item={item}/>
            )}
            horizontal={true}
        />

    );
};

export default Trending;