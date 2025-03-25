import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/lib/GlobalProvider';
import icons from '@/constants/icons';
import { router } from 'expo-router';
import { account, createUserProfile, getUserProfile, logout } from '@/lib/appwrite';


interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  middleText?: string;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  middleText // Không có giá trị mặc định
}: SettingsItemProps) => {
  return (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      {/* Icon + Title */}
      <View className='flex flex-row items-center flex-1 gap-3'>
        <Image source={icon} className='size-7' tintColor={'#40BFFF'} />
        <Text className={`text-base font-poppins-bold text-primary-200 ${textStyle}`}>{title}</Text>
      </View>

      {/* Chỉ hiển thị middleText nếu có truyền vào */}
      {middleText && <Text className='text-gray-500'>{middleText}</Text>}

      {/* Arrow (nếu có) */}
      {showArrow && <Image source={icons.right} className='size-5' />}
    </TouchableOpacity>
  )
}

const profile = () => {
  const { loading, isLogged, user, refetch } = useGlobalContext();

  const userIdAuth: string = user?.$id || "";
  const userEmail = user?.email
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getUserProfile(userIdAuth);
      if (profileData) {
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, []);


  //Check đăng nhập
  // if (!loading && isLogged) console.log("dang dang nhap")
  const handleLogout = async () => {
    console.log("Handling logout...");
    const result = await logout();
    console.log("Logout result:", result);
    if (result) {
      Alert.alert("Logout Success", "U OUTTTTTT");
      refetch();
      router.push('/signIn')
    }
    else {
      Alert.alert("Error", "An Error occurred while logging out");
      // router.push('/signIn')
    }
  }


  // const handleCreateProfile = async () => {
  //   const userId = userIdAuth; // Thay bằng userId lấy từ auth
  //   const gender = "Male";
  //   const birthday: Date = new Date("1998-12-25"); // Dữ liệu lấy từ form nhập
  //   const email = userEmail || "";
  //   const phone = "0123456789";
  //   const password = "securepassword";

  //   const result = await createUserProfile(userId, gender, birthday, email, phone, password);
  //   if (result) {
  //     console.log("Tạo hồ sơ thành công!", result);
  //   } else {
  //     console.log("Tạo hồ sơ thất bại!");
  //   }
  // };


  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-poppins-bold text-primary-200'>Profile</Text>
        </View>
        <View className='flex-row flex mt-5'>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/accountDetail')}>
            <View className='flex flex-row items-center relative mt-5'>
              <Image source={{ uri: user?.avatar }} className='size-28 relative rounded-full' />
              <View className='flex flex-col ml-5'>
                <Text className='text-lg font-poppins-bold mt-2 text-primary-200'>{user?.name}</Text>
                <Text className='text-gray-200 font-poppins-regular text-lg'>
                  @{user?.email?.split('@')[0]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>


        </View>
        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.gender} title='Giới tính' middleText={profile ? profile.Gender : "Đang tải..."} onPress={() => router.push('/gender')} />
          <SettingsItem icon={icons.date} title='Sinh nhật' middleText={profile?.Birthday ? new Date(profile.Birthday).toISOString().split('T')[0] : "Đang tải..."} onPress={() => router.push('/date')} />
          <SettingsItem icon={icons.email} title='Email' middleText={user?.email} onPress={() => router.push('/email')} />
          <SettingsItem icon={icons.phone} title='Số điện thoại' middleText={profile ? profile.Phone : "Đang tải..."} onPress={() => router.push('/phone')} />
          <SettingsItem icon={icons.password} title='Thay đổi mật khẩu' middleText='************' onPress={() => router.push('/changePass')} />

        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-gray-100'>
          <SettingsItem
            icon={icons.logout}
            title='Logout'
            textStyle='text-danger'
            showArrow={false}
            onPress={handleLogout}
          />
          <SettingsItem
            icon={icons.logout}
            title='Tạo dữ liệu'
            textStyle='text-danger'
            showArrow={false}
            // onPress={handleCreateProfile}
          />
          <SettingsItem
            icon={icons.logout}
            title='Test lấy dữ liệu'
            textStyle='text-danger'
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile