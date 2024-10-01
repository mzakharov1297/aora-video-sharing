import React from 'react';
import {Image, Text, View} from "react-native";
import {Tabs} from "expo-router";
import {icons} from "@/constants";

const TabIcon = ({icon, color, name, focus}: {
    icon: any;
    color: string;
    name: string;
    focus: boolean;
}) => {
    return (
        <View className={"items-center justify-center gap-2"}>
            <Image source={icon} resizeMode={"contain"} tintColor={color} className={"w-6 h-6"}/>
            <Text className={`${focus ? "font-psemibold" : "font-pregular"} text-xs`} style={{color: color}}>{name}</Text>
        </View>
    );
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84
                    }
                }}


            >
                <Tabs.Screen options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon name={"Home"} color={color} focus={focused} icon={icons.home}/>
                    )
                }}
                             name={"home"}
                />

                <Tabs.Screen options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon name={"Bookmark"} color={color} focus={focused} icon={icons.bookmark}/>
                    )
                }}
                             name={"bookmark"}
                />

                <Tabs.Screen options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon name={"Create"} color={color} focus={focused} icon={icons.plus}/>
                    )
                }}
                             name={"create"}
                />


                <Tabs.Screen options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon name={"Profile"} color={color} focus={focused} icon={icons.profile}/>
                    )
                }}
                             name={"profile"}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;