import ChatUI from "@/src/components/modules/ChatUI";
import {
  ChatMessage,
  CURRENT_USER,
  getContactById,
  getInitialMessages,
} from "@/src/constants/chatData";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const WHATSAPP_GREEN = "#00A884";
const CHAT_BACKGROUND = "#ECE5DD";

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const contact = getContactById(id ?? "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (id) {
      setMessages(getInitialMessages(id));
    }
  }, [id]);

  const onSendMessage = (text: string) => {
    setMessages((prevMessages) => [
      {
        _id: prevMessages.length + 1,
        text,
        createdAt: new Date(),
        user: CURRENT_USER,
      },
      ...prevMessages,
    ]);
  };

  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Chat not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor={WHATSAPP_GREEN} barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {contact.name}
        </Text>
        <View style={styles.headerActions}>
          <Feather name="video" size={22} color="white" />
          <Feather name="phone" size={22} color="white" />
          <Entypo name="dots-three-vertical" size={20} color="white" />
        </View>
      </View>

      <ChatUI
        messages={messages}
        onSend={onSendMessage}
        user={CURRENT_USER}
        placeholder="Type a message"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHATSAPP_GREEN,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    gap: moderateScale(12),
  },
  backButton: {
    padding: moderateScale(4),
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(18),
  },
  errorText: {
    textAlign: "center",
    marginTop: moderateScale(40),
    fontSize: moderateScale(16),
    color: "#666",
  },
});
