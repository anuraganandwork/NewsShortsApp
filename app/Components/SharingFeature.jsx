import { Share } from "react-native";

export const shareNews = async (message, url) => {
  const result = await Share.share({
    message:
      "Hey, i found this news on NewsShorts " +
      "\n" +
      message +
      "\n" +
      "Check it here: " +
      url,
  });
};
