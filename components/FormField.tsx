import { View, Text, TextInput, Image } from "react-native";
import React, {useState} from "react";
import { TouchableOpacity } from "react-native";

const FormFields = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  icons,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-3 ${otherStyles}`}>
      <View className="w-full bg-white focus:border-secondary items-center flex-row">
        <Image source={icons}/>
        <TextInput
          className="flex-1 text-base font-poppins-regular p-2"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        
      </View>
    </View>
  );
};

export default FormFields;