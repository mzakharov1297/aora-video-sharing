import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';
import {ImageGravity} from "react-native-appwrite/src/enums/image-gravity";
import {Alert} from "react-native";


export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
    platform: process.env.EXPO_PUBLIC_PLATFORM,
    projectId: process.env.EXPO_PUBLIC_PROJECTID,
    databaseId: process.env.EXPO_PUBLIC_DATABASEID,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
    videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID,
    storageId: process.env.EXPO_PUBLIC_STORAGE_ID
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform!);

const account = new Account(client);
const avatars = new Avatars(client)
const db = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)
        if (!newAccount) {
             new Error("Account not created")
        }

        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)

        return await db.createDocument(appwriteConfig.databaseId!, appwriteConfig.userCollectionId!, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        })
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}

export async function signIn(email: string, password: string) {
    try {

        return await account.createEmailPasswordSession(email, password)
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) {
             new Error("User not found")
        }

        const currentUser = await db.listDocuments(appwriteConfig.databaseId!, appwriteConfig.userCollectionId!, [Query.equal("accountId", currentAccount.$id)])
        if (!currentUser) {
             new Error("User not found")
        }

        return currentUser.documents[0]
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }

}

export async function getAllPosts() {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId!, appwriteConfig.videoCollectionId!)
        return posts.documents
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getLatestPosts() {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId!, appwriteConfig.videoCollectionId!, [Query.orderDesc("$createdAt"), Query.limit(3)])
        return posts.documents
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function searchPosts(query: string) {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId!, appwriteConfig.videoCollectionId!, [Query.search("title", query)])
        return posts.documents
    } catch (e: any) {
        throw new Error(e)
    }
}


export async function getUerPosts(userId: number) {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId!, appwriteConfig.videoCollectionId!, [Query.equal("creator", userId)])
        return posts.documents
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function signOut() {
    try {
        return await account.deleteSession("current")
    } catch (e: any) {
        throw new Error(e)
    }
}

export const getFilePreview = async (fileId: any, type: any) => {
    let fileUrl
    try {
        if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId!,
                fileId,
                2000,
                2000,
                ImageGravity.Top,
                100
            );
        } else if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId!, fileId);
        } else {
             new Error("Invalid file type")
        }

        if (!fileUrl) new Error
        console.log(fileUrl)
        return fileUrl
    } catch (e: any) {
        throw new Error(e)
    }
}

export const uploadFile = async (file: any, type: any) => {
    if (!file) {
        return
    }

    const asset = {
        size: file.fileSize,
        uri: file.uri,
        type: file.mimeType,
        name: file.fileName || type === "video" ?  "default_name.mov": "default_name.jpg"
    }
    try {
        const uploadFile = await storage.createFile(
            appwriteConfig.storageId!,
            ID.unique(),
            asset
        )
        console.log(uploadFile)

        return await getFilePreview(uploadFile.$id, type)
    } catch (e: any) {
        Alert.alert("Error", `${e.message} - upload`)
        throw new Error(e)
    }
}

export const createVideo = async (form: any) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all(
            [
                uploadFile(form.thumbnail, "image"),
                uploadFile(form.video, "video"),
            ]
        )

        return await db.createDocument(appwriteConfig.databaseId!, appwriteConfig.videoCollectionId!, ID.unique(), {
            title: form.title,
            prompt: form.prompt,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            creator: form.userId
        })
    } catch (e: any) {
        throw new Error(e)
    }
}