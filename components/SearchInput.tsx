import React, {useState} from 'react';
import {Alert, Image, TextInput, TouchableOpacity, View} from "react-native";
import {icons} from "@/constants";
import {router, usePathname} from "expo-router";

const SearchInput = ({initialQuery}: {
    initialQuery?: string
}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery ||'')
    return (

        <View
            className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 border-2 focus:border-secondary items-center flex-row space-x-4"}>
            <TextInput className={"text-base mt-0.5 text-white flex-1 font-pregular"} value={query}
                       placeholder={"Search for a video topic"} placeholderTextColor={"#CDCDE0"}
                       onChangeText={(e) => setQuery(e)}/>
            <TouchableOpacity onPress={() => {
                if(!query) {
                    return Alert.alert("Missing query", "Please enter a search query")
                }
                if(pathname.startsWith('/search')) router.setParams({query})
                else router.push(`/search/${query}`)
            }}>
                <Image className={'w-5 h-5'} resizeMode={"contain"} source={icons.search}/>
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;