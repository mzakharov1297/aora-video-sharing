import React from 'react';
import {FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import useAppwrite from "@/hooks/useAppwrite";
import {getUerPosts, signOut} from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import {useGlobalContext} from "@/context/GlobalProvider";
import {icons} from "@/constants";
import InfoBox from "@/components/InfoBox";
import {router} from "expo-router";

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext()
    const {data: posts} = useAppwrite(() => getUerPosts(user?.$id))

    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/sign-in')
    }

    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <FlatList
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                data={posts}
                keyExtractor={(item: any) => item.$id}
                ListHeaderComponent={() => (
                    <View className={'w-full justify-center items-center mt-6 mb-12 px-4'}>
                        <TouchableOpacity
                            onPress={logout}
                            className={"w-full items-end mb-10"}
                        >
                            <Image resizeMode={"contain"} className={"w-6 h-6"} source={icons.logout}/>
                        </TouchableOpacity>

                        <View className={"w-16 h-16 border border-secondary rounded-lg items-center justify-center"}>
                            <Image className={"w-[90%] h-[90%] rounded-lg"} resizeMode={"cover"}
                                   source={{uri: user?.avatar}}/>
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles={'mt-5'}
                            titleStyles={'text-lg'}
                        />
                        <View className={'mt-5 flex-row'}>
                            <InfoBox
                                title={posts.length ?? 0}
                                subtitle={'Posts'}
                                containerStyles={'mr-10'}
                                titleStyles={'text-xl'}
                            />
                            <InfoBox
                                title={"1.2k"}
                                subtitle={'Follower'}
                                titleStyles={'text-xl'}
                            />
                        </View>
                    </View>
                )}
                renderItem={({item}) => (
                    <VideoCard video={item}/>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={"No Videos Found"}
                        subtitle={"No videos found for this search query"}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Profile;