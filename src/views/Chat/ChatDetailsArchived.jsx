import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  Modal,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { io } from "socket.io-client";
import colors from "../../theme/colors";
import { hp, wp } from "../../utils/screens";
import baseURL from "../../utils/baseURL";
import { useSelector } from "react-redux";
import {
  useDeleteChatMutation,
  useGetMessagesQuery,
  useMyArchiveChatQuery,
  useMyChatRecordQuery,
  useSendMessageMutation,
} from "../../store/services/appApi";
import axios from "axios";
import Toast from "react-native-toast-message";
const ChatDetailsArchived = ({ navigation, route }) => {
  const [messages, setMessages] = React.useState([]);
  const chatData = route.params.data;
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const contractor = useSelector((x) => x.auth.userInfo);
  const token = useSelector((x) => x.auth?.tokens?.accessToken);
  const [showModal, setShowModal] = React.useState(false);
  const { refetch: chatListRefetch } = useMyArchiveChatQuery({
    id: contractor?._id,
    search: "",
  });

  let socket = io(baseURL, {
    transports: ["websocket", "polling"],
  });
  const id = contractor._id;

  React.useEffect(() => {
    socket.emit("setup", id);

    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const { data, refetch } = useGetMessagesQuery(chatData._id);
  const [sendMessage] = useSendMessageMutation();
  const [deleteChat, { isLoading }] = useDeleteChatMutation();
  React.useEffect(() => {
    if (data !== undefined) {
      const resData = data.map((x) => {
        return {
          _id: x._id,
          text: x.content,
          createdAt: x.createdAt,
          user: {
            _id: x.sender[0]._id,
            name: x.sender[0].name,
            avatar: baseURL + "/user_photos/" + chatData?.users?.photo,
          },
          sent: true,
          received: true,
          pending: true,
        };
      });
      setMessages(resData.reverse());
    }
  }, [data]);
  React.useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      refetch();
    });
  }, [setMessages]);
  const onSend = React.useCallback(async (messages = []) => {
    try {
      const { text } = messages[0];
      const newMessage = {
        sender: contractor._id,
        content: text,
        chat: chatData?._id,
        type: "contractor",
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      await sendMessage(newMessage);

      socket.emit("stop typing", chatData?._id);
      socket.emit("new message", messages[0]);
      const res = await axios.get(
        baseURL + `/chat/unarchive_pro_chat?chat=${chatData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      chatListRefetch();
    } catch (e) {
      console.log({ e });
    }
  }, []);
  const handleDelete = async () => {
    try {
      const { data, error } = await deleteChat(chatData?._id);

      if (error === undefined && data?.message === "Removed Successfully") {
        setShowModal(false);
        refetch();
        navigation.goBack();
        chatListRefetch();
      }
    } catch (error) {}
  };
  const handleArchive = async () => {
    try {
      const res = await axios.get(
        baseURL + `/chat/unarchive_pro_chat?chat=${chatData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: res?.data?.message,
      });
      navigation.goBack();
      chatListRefetch();
      console.log(
        "🚀 ~ file: ChatDetails.js:135 ~ handleArchive ~ res:",
        JSON.stringify(res)
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: ChatDetails.js:127 ~ handleArchive ~ error:",
        error
      );
    }
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Box>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={colors.primary}
          />
        </Box>
      </Send>
    );
  };

  return (
    <Box flex={"1"} safeArea>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Account</Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the conversation? If you delete your
            conversation then your all conversation history will be deleted.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                bg={colors.delete}
                onPress={handleDelete}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack flex={"1"}>
        <Box h={hp("8%")} justifyContent={"center"}>
          <HStack alignItems={"center"} justifyContent="space-between">
            <HStack justifyContent="center" alignItems={"center"}>
              <IconButton
                m="2"
                onPress={() => navigation.navigate("ArchiveChat")}
                alignItems={"center"}
                borderRadius={"lg"}
                variant="unstyled"
                // bg={colors.secondary}
                icon={
                  <Image
                    source={require("./../../../assets/Back.png")}
                    size="xs"
                    resizeMode="contain"
                    alt="back btn"
                  />
                }
              />
              <Avatar
                mx={"1"}
                bg="cyan.500"
                source={{
                  uri: baseURL + "/user_photos/" + chatData?.users?.photo,
                }}
              />

              <VStack justifyContent="center" alignItems={"center"}>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"lg"}
                  color={colors.darkGray}
                >
                  {chatData?.users?.name}
                </Text>
              </VStack>
            </HStack>
            <Box mr="3">
              <Menu
                w={wp("52%")}
                alignItems={"flex-end"}
                mt="2"
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color={colors.darkGray}
                      />
                    </Pressable>
                  );
                }}
              >
                <Box w="100%">
                  <Menu.Item>
                    <Pressable w="100%" onPress={() => setShowModal((p) => !p)}>
                      <HStack>
                        <MaterialIcons
                          name="delete"
                          size={24}
                          color={colors.darkGray}
                        />
                        <Text ml={"1"}>Delete Chat</Text>
                      </HStack>
                    </Pressable>
                  </Menu.Item>
                  <Menu.Item>
                    <Pressable w="100%" onPress={handleArchive}>
                      <HStack>
                        <MaterialIcons
                          name="archive"
                          size={24}
                          color={colors.darkGray}
                        />
                        <Text ml={"1"}>Unarchive Chat</Text>
                      </HStack>
                    </Pressable>
                  </Menu.Item>
                </Box>
              </Menu>
            </Box>
          </HStack>
        </Box>

        <Box flex={"1"} bg={colors.white}>
          <GiftedChat
            renderLoading={() => <Spinner />}
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: contractor._id,
              name: contractor.name,
              avatar: contractor.photo,
            }}
            // renderActions={(props) => <RenderActions props={props} />}
            renderBubble={(props) => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    left: {
                      backgroundColor: "#E9EBEF",
                    },
                    right: {
                      backgroundColor: "#0695FF",
                    },
                  }}
                />
              );
            }}
            alwaysShowSend
            renderSend={renderSend}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default ChatDetailsArchived;
