import {
  Account,
  Avatars,
  Client,
  OAuthProvider,
  Databases,
  Query,
  ID,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.thanh.sharebuy",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASES_ID,
  profileCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID,
  addressCollectionId: process.env.EXPO_PUBLIC_APPWRITE_ADDRESS_COLLECTION_ID,
  creditcardCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CREDITCARD_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    console.log(response);
    if (!response) throw new Error("failed to login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success") throw new Error("failed to login");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    console.log("id dnag dang nhap", userId);

    if (!secret || !userId) throw new Error("failed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return true;
  } catch (error) {
    console.error(Error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(Error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(Error);
    return false;
  }
}

export const createUserProfile = async (
  userId: string,
  gender: string,
  birthday: Date,
  email: string,
  phone: string,
  password: string
) => {
  try {
    if (!config.databaseId || !config.profileCollectionId) {
      throw new Error("Thiếu databaseId hoặc profileCollection trong config!");
    }

    // Tạo document mới cho user trong collection "profile"
    const response = await databases.createDocument(
      config.databaseId,
      config.profileCollectionId,
      userId, // Dùng userId làm ID
      {
        Gender: gender || "Unspecified",
        Birthday: birthday || "2000-01-01", // Giá trị mặc định
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

export const getUserProfile = async (userId: string) => {
  try {
    // Lấy thông tin hồ sơ dựa vào userId
    const response = await databases.getDocument(
      config.databaseId || "khong tim thay databaseId",
      config.profileCollectionId || "khong tim thay profileCollectionId",
      userId // Dùng userId làm ID để truy vấn
    );

    console.log("✅ Lấy hồ sơ thành công:", response);
    return response;
  } catch (error) {
    console.error("❌ Lỗi khi lấy hồ sơ user:", error);
    return null;
  }
};

export const createOrUpdateUserProfile = async (
  userIdAuth: string,
  gender: string,
  value: string
) => {
  try {
    if (!config.databaseId || !config.profileCollectionId) {
      throw new Error("Thiếu databaseId hoặc profileCollection trong config!");
    }

    // Kiểm tra xem user đã tồn tại chưa
    const document = await databases.listDocuments(
      config.databaseId,
      config.profileCollectionId,
      [Query.equal("$id", userIdAuth)]
    );

    if (document.total > 0) {
      console.log("User đã tồn tại, cập nhật gender:", gender);

      // Cập nhật gender cho user đã tồn tại
      const updatedResponse = await databases.updateDocument(
        config.databaseId,
        config.profileCollectionId,
        userIdAuth,
        { Gender: gender } // Đảm bảo tên trường khớp với Appwrite
      );

      console.log("Cập nhật gender thành công:", updatedResponse);
      return updatedResponse;
    }
  } catch (error) {
    console.error("Lỗi khi tạo hoặc cập nhật user profile:", error);
    return null;
  }
};

export const updateProfileField = async (
  userIdAuth: string,
  field: any,
  value: string
) => {
  try {
    const response = await databases.updateDocument(
      config.databaseId || "khong tim thay databaseId",
      config.profileCollectionId || "khong tim thay profileCollectionId",
      userIdAuth,
      { [field]: value } // Chỉ cập nhật 1 trường
    );
    console.log(`Cập nhật ${field} thành công:`, response);
    return response;
  } catch (error) {
    console.error(`Lỗi khi cập nhật ${field}:`, error);
    return null;
  }
};

export const addAddressUser = async (
  userIdAuth: string,
  addressDetails: {
    house_no: string;
    street: string;
    city: string;
    district: string;
    zipcode: string;
    country: string;
  }
) => {
  try {
    const { country, house_no, street, city, district, zipcode } = addressDetails;
    if (!country || !house_no || !street || !city || !district || !zipcode) {
      throw new Error("Thiếu thông tin bắt buộc trong địa chỉ.");
    }

    const documentData = {
      house_no,
      street,
      city,
      district,
      zipcode,
      country,
      user_id: userIdAuth, // Liên kết địa chỉ với user
    };

    console.log("Dữ liệu gửi lên Appwrite:", documentData);

    const response = await databases.createDocument(
      config.databaseId  || "khong tim thay databaseId",
      config.addressCollectionId || "khong tim thay addressCollectionId",
      "unique()", // Tạo ID tự động
      documentData
    );

    console.log(`Cập nhật địa chỉ thành công:`, response);
    return response;
  } catch (error) {
    console.error(`Lỗi khi cập nhật địa chỉ:`, error);
    return null;
  }
};

export const getUserAddresses = async (userIdAuth: string) => {
  try {
    if (!config.databaseId || !config.addressCollectionId) {
      throw new Error("Thiếu databaseId hoặc addressCollectionId trong config!");
    }

    // Truy vấn danh sách các địa chỉ của người dùng
    const response = await databases.listDocuments(
      config.databaseId,
      config.addressCollectionId,
      [Query.equal("user_id", userIdAuth)] // Lọc theo userId
    );

    // console.log("✅ Lấy danh sách địa chỉ thành công:", response.documents);
    return response.documents; // Trả về danh sách các địa chỉ
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách địa chỉ:", error);
    return null;
  }
};


export const deleteUserAddress = async (documentId: string) => {
  try {
    if (!config.databaseId || !config.addressCollectionId) {
      throw new Error("Thiếu databaseId hoặc addressCollectionId trong config!");
    }

    await databases.deleteDocument(
      config.databaseId,
      config.addressCollectionId,
      documentId // ✅ Đảm bảo truyền đúng documentId
    );

    return true;
  } catch (error) {
    console.error("❌ Lỗi khi xóa địa chỉ:", error);
    return false;
  }
};


export const updateAddressUser = async (
  documentId: string,
  addressDetails: {
      house_no: string;
      street: string;
      city: string;
      district: string;
      zipcode: string;
      country?: string; // Đảm bảo country là tùy chọn
  }
) => {
  try {
      // Đảm bảo country luôn có giá trị mặc định
      const updatedDetails = {
          ...addressDetails,
          country: addressDetails.country || 'Việt Nam', // Thiết lập mặc định nếu country không tồn tại
      };

      const response = await databases.updateDocument(
          config.databaseId || "khong tim thay databaseId",
          config.addressCollectionId || "khong tim thay addressCollectionId",
          documentId,
          updatedDetails
      );

      console.log('Cập nhật địa chỉ thành công:', response);
      return response;
  } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error);
      return null;
  }
};



export const addCreditCardUser = async (
  userIdAuth: string,
  creditDetails: {
    card_number: string;
    card_name: string;
    card_expiry: string;
    card_cvc: string;
  }
) => {
  try {
    const { card_number, card_name, card_expiry, card_cvc } = creditDetails;
    if (!card_number || !card_name || !card_expiry || !card_cvc) {
      throw new Error("Thiếu thông tin bắt buộc trong địa chỉ.");
    }

    const documentData = {
      card_number,
      card_name,
      card_expiry,
      card_cvc,
      user_id: userIdAuth, // Liên kết địa chỉ với user
    };

    console.log("Dữ liệu gửi lên Appwrite:", documentData);

    const response = await databases.createDocument(
      config.databaseId  || "khong tim thay databaseId",
      config.creditcardCollectionId || "khong tim thay creditcardCollectionId",
      "unique()", // Tạo ID tự động
      documentData
    );

    console.log(`Cập nhật địa chỉ thành công:`, response);
    return response;
  } catch (error) {
    console.error(`Lỗi khi cập nhật địa chỉ:`, error);
    return null;
  }
};