import React, {useState} from 'react';
import {FlatList, Image, RefreshControl, SafeAreaView, Text, View} from "react-native";
import {images} from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {getAllPosts, getLatestPosts} from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import {useGlobalContext} from "@/context/GlobalProvider";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false)

    const {user} = useGlobalContext()
    const {data: posts, refetch} = useAppwrite(getAllPosts)
    const {data: latestPost} = useAppwrite(getLatestPosts)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                data={posts}
                keyExtractor={(item: any) => item.$id}
                ListHeaderComponent={() => (
                    <View className={"my-6 px-4 space-y-6"}>
                        <View className={"justify-between items-start mb-6 flex-row"}>
                            <View>
                                <Text className={"font-pmedium text-sm text-gray-100"}>
                                    Welcome Back
                                </Text>
                                <Text className={"text-2xl font-psemibold text-white"}>
                                    {user?.username}
                                </Text>
                            </View>

                            <View className={"mt-1.5"}>
                                <Image
                                    resizeMode={"contain"}
                                    className={'w-9 h-10'}
                                    source={images.logoSmall}
                                />
                            </View>
                        </View>

                        <SearchInput/>

                        <View className={"w-full flex-1 pt-5 pb-8"}>
                            <Text className={"text-gray-100 text-lg font-pregular mb-3"}>
                                Latest Videos
                            </Text>
                            <Trending posts={latestPost ?? []}/>

                        </View>
                    </View>
                )}
                renderItem={({item}) => (
                    <VideoCard video={item}/>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={"No Videos Found"}
                        subtitle={"No videos created yet"}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Home;