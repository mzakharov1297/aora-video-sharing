import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import useAppwrite from "@/hooks/useAppwrite";
import {searchPosts} from "@/lib/appwrite";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";

const Search = () => {

    const {query} = useLocalSearchParams()
    const {data: posts, refetch} = useAppwrite(() => searchPosts(query as string))


    useEffect(() => {
        refetch()
    }, [query]);
    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <FlatList
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                data={posts}
                keyExtractor={(item: any) => item.$id}
                ListHeaderComponent={() => (
                    <View className={"my-6 px-4"}>
                        <Text className={"font-pmedium text-sm text-gray-100"}>
                            Search Results
                        </Text>
                        <Text className={"text-2xl font-psemibold text-white"}>
                            {query}
                        </Text>
                        <View className={"mt-6 mb-8"}>
                            <SearchInput initialQuery={(query) as string}/>
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

export default Search;