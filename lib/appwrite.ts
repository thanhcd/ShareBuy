import {Account, Avatars, Client, OAuthProvider,Databases, Query } from 'react-native-appwrite'
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
    platform: 'com.thanh.sharebuy',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASES_ID,
    profileCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID,
} 

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client); 

export async function login() {
    try {
        const redirectUri = Linking.createURL('/')

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)
        console.log(response)
        if(!response) throw new Error("failed to login")
        
        const browserResult = await openAuthSessionAsync(response.toString(), redirectUri)
        if(browserResult.type !== 'success') throw new Error("failed to login")

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()
        console.log('id dnag dang nhap', userId)

        if(!secret || !userId) throw new Error("failed to login")

        const session = await account.createSession(userId, secret);
        if(!session) throw new Error("Failed to create session")
            return true;

    } catch (error) {
        console.error(Error);
        return false;        
    }
}

export async function logout() {
    try {
        await account.deleteSession('current')
        return true;
    } catch (error) {
        console.error(Error);
        return false;  
    }
}

export async function getCurrentUser(){
    try {
        const response = await account.get();
        if (response.$id){
            const userAvatar = avatar.getInitials(response.name)
            return {
                ...response,
                avatar: userAvatar.toString()
            }
        }
    } catch (error) {
        console.error(Error);
        return false; 
    }
}


export const createUserProfile = async (userId, gender, birthday, email, phone, password) => {
    try {
        if (!config.databaseId || !config.profileCollectionId) {
            throw new Error("Thiếu databaseId hoặc profileCollection trong config!");
        }

        // Tạo document mới cho user trong collection "profile"
        const response = await databases.createDocument(
            config.databaseId,
            config.profileCollectionId,
            userId,  // Dùng userId làm ID
            {
                Gender: gender || "Unspecified",
                Birthday: birthday || "2000-01-01",  // Giá trị mặc định
                Email: email || "No Email",
                Phone: phone || "No Phone",
                Password: password || "No Password",
            }
        );

        console.log("User profile created:", response);
        return response;
    } catch (error) {
        console.error("Lỗi khi tạo user profile:", error);
        return null;
    }
};
// export const createOrUpdateUserProfile = async (userId, gender, value) => {
//     try {
//         if (!config.databaseId || !config.profileCollectionId) {
//             throw new Error("Thiếu databaseId hoặc profileCollection trong config!");
//         }

//         // Kiểm tra xem user đã tồn tại chưa
//         const document = await databases.listDocuments(
//             config.databaseId,
//             config.profileCollectionId,
//             [Query.equal("$id", userId)]
//         );

//         if (document.total > 0) {
//             console.log("User đã tồn tại, cập nhật gender:", gender);

//             // Cập nhật gender cho user đã tồn tại
//             const updatedResponse = await databases.updateDocument(
//                 config.databaseId,
//                 config.profileCollectionId,
//                 userId,
//                 { gender }
//             );

//             console.log("Cập nhật gender thành công:", updatedResponse);
//             return updatedResponse;
//         }

//     } catch (error) {
//         console.error("Lỗi khi tạo hoặc cập nhật user profile:", error);
//         return null;
//     }
// };



// export const updateProfileField = async (userId, field, value) => {
//     try {
//         const response = await databases.updateDocument(
//             config.databaseId,
//             config.profileCollectionId,
//             userId,
//             { [field]: value } // Chỉ cập nhật 1 trường
//         );
//         console.log(`Cập nhật ${field} thành công:`, response);
//         return response;
//     } catch (error) {
//         console.error(`Lỗi khi cập nhật ${field}:`, error);
//         return null;
//     }
// };

