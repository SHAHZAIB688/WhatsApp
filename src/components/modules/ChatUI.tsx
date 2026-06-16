import Feather from "@expo/vector-icons/Feather";
import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ChatMessage, ChatUser } from "@/src/constants/chatData";

type ChatUIProps = {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  user: ChatUser;
  placeholder?: string;
};

const WHATSAPP_GREEN = "#00A884";
const SENT_BUBBLE = "#DCF8C6";
const RECEIVED_BUBBLE = "#FFFFFF";
const CHAT_BACKGROUND = "#ECE5DD";

function formatMessageTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MessageBubble({
  item,
  isSender,
  showAvatar,
}: {
  item: ChatMessage;
  isSender: boolean;
  showAvatar: boolean;
}) {
  return (
    <View style={[styles.messageRow, isSender && styles.messageRowSender]}>
      {!isSender && showAvatar && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.user.name)}</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isSender ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{formatMessageTime(item.createdAt)}</Text>
      </View>
    </View>
  );
}

export default function ChatUI({
  messages,
  onSend,
  user,
  placeholder = "Type a message",
}: ChatUIProps) {
  const [text, setText] = useState("");
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        ref={listRef}
        data={messages}
        inverted
        keyExtractor={(item) => String(item._id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MessageBubble
            item={item}
            isSender={item.user._id === user._id}
            showAvatar={item.user._id !== user._id}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Feather name="smile" size={22} color="#8696A0" />
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            placeholderTextColor="#8696A0"
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Feather name="paperclip" size={22} color="#8696A0" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          activeOpacity={0.8}
        >
          <Feather name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKGROUND,
  },
  listContent: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: moderateScale(8),
    gap: moderateScale(6),
  },
  messageRowSender: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: WHATSAPP_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: moderateScale(11),
    fontWeight: "600",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    elevation: 1,
  },
  sentBubble: {
    backgroundColor: SENT_BUBBLE,
    borderTopRightRadius: 0,
    alignSelf: "flex-end",
  },
  receivedBubble: {
    backgroundColor: RECEIVED_BUBBLE,
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: moderateScale(15),
    color: "#111",
    lineHeight: moderateScale(20),
  },
  timeText: {
    fontSize: moderateScale(11),
    color: "#667781",
    alignSelf: "flex-end",
    marginTop: moderateScale(4),
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
    gap: moderateScale(8),
    backgroundColor: CHAT_BACKGROUND,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(24),
    paddingHorizontal: moderateScale(8),
    minHeight: moderateScale(48),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  iconButton: {
    padding: moderateScale(6),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: "#111",
    maxHeight: moderateScale(100),
    paddingVertical: moderateScale(8),
  },
  sendButton: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: WHATSAPP_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
});
