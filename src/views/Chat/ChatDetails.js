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
  useSendMessageMutation,
} from "../../store/services/appApi";

const MessagesDetails = ({ navigation, route }) => {
  const [messages, setMessages] = React.useState([]);
  const chatData = route.params.data;
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const contractor = useSelector((x) => x.auth.userInfo);
  const [showModal, setShowModal] = React.useState(false);
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
      const { text, user } = messages[0];
      const newMessage = {
        sender: contractor._id,
        content: text,
        chat: chatData?._id,
        type: "contractor",
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const { data, error } = await sendMessage(newMessage);

      socket.emit("stop typing", chatData?._id);
      socket.emit("new message", messages[0]);
    } catch (e) {
      console.log({ e });
    }
  }, []);
  const handleDelete = async () => {
    try {
      const { data, error } = await deleteChat(chatData?._id);
      console.log(
        "🚀 ~ file: ChatDetails.js:103 ~ handleDelete ~ data, error :",
        data,
        error
      );
      if (error === undefined && data?.message === "Removed Successfully") {
        setShowModal(false);
        refetch();
        navigation.goBack();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ChatDetails.js:110 ~ handleDelete ~ error:",
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
                onPress={() => navigation.goBack()}
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

export default MessagesDetails;

// import {
//   Avatar,
//   Box,
//   HStack,
//   IconButton,
//   Image,
//   Input,
//   Menu,
//   Stack,
//   VStack,
//   Text,
//   ScrollView,
// } from "native-base";
// import React, { useState, useRef } from "react";
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
// } from "react-native";
// import {
//   MaterialCommunityIcons,
//   Ionicons,
//   Entypo,
//   EvilIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { io } from "socket.io-client";
// import colors from "../../theme/colors";
// import { hp, wp } from "../../utils/screens";

// import baseURL from "../../utils/baseURL";
// import { useSelector } from "react-redux";
// import {
//   useGetMessagesQuery,
//   useMyChatRecordQuery,
//   useSendMessageMutation,
// } from "../../store/services/appApi";
// import moment from "moment";
// import ChatModals from "./ChatModals";
// const MessagesDetails = ({ navigation, route }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [showModal, setShowModal] = React.useState(false);

//   const [photo, setPhoto] = React.useState("");
//   const [photoURl, setPhotoURl] = React.useState("");
//   const [deleteConversationModal, setDeleteConversationModal] =
//     React.useState(false);
//   const [value, setValue] = React.useState("one");
//   const chatData = route.params.data;
//   console.log({ chatData });
//   const [socketConnected, setSocketConnected] = React.useState(false);
//   const [isTyping, setIsTyping] = React.useState(false);

//   const user = useSelector((x) => x.auth.userInfo);
//   console.log({ user });
//   const { data, refetch, error } = useGetMessagesQuery(chatData._id);
//   const [sendMessage] = useSendMessageMutation();
//   let socket = io("https://admin.localitycanada.com", {
//     transports: ["websocket", "polling"],
//   });

//   const userId = user._id;
//   console.log("id", userId);
//   React.useEffect(() => {
//     socket.emit("setup", userId);
//     console.log("logged");
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));
//     socket.emit("join chat", userId);
//   }, []);
//   React.useEffect(() => {
//     if (data !== undefined) {
//       setMessages(data);
//     }
//   }, [data]);

//   console.log({ socketConnected });
//   const flatListRef = useRef();
//   const [isScrolling, setIsScrolling] = React.useState(false);

//   // scroll to a specific index in the chat
//   // const scrollToIndex = (index) => {
//   //   flatListRef.current?.scrollToOffset({
//   //     animated: true,
//   //     offset: index * 100,
//   //   }); // assuming each chat message is 100px tall
//   // };

//   const handleSend = async () => {
//     try {

//       if (inputValue.trim() !== "") {
//         const newMessage = {
//           sender: userId,
//           content: inputValue,
//           chat: chatData?._id,
//           type: "contractor",
//         };
//         const { data, error } = await sendMessage(newMessage);
//         console.log("data,error", JSON.stringify(data));
//         console.log("data,error", JSON.stringify(error));
//         await refetch();
//         socket.emit("stop typing", chatData?._id);
//         socket.emit("new message", newMessage);
//         setInputValue("");
//       }
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   const RenderItem = ({ item }) => {
//     const user = useSelector((x) => x.auth.userInfo._id);
//     // console.log("message============>", item);
//     return (
//       <View
//         style={
//           item?.sender[0]?._id === user
//             ? styles.userMessageContainer
//             : styles.otherMessageContainer
//         }
//       >
//         <View
//           style={
//             item?.sender[0]?._id === user
//               ? styles.userMessageBubble
//               : styles.otherMessageBubble
//           }
//         >
//           <Text
//             color={
//               item?.sender[0]._id === user ? colors.white : colors.darkGray
//             }
//           >
//             {item.content}
//           </Text>
//         </View>
//         {item?.createdAt !== undefined && (
//           <Text style={styles.messageTime}>
//             {moment(item?.createdAt).format("h:mm A")}
//           </Text>
//         )}
//       </View>
//     );
//   };
//   // function to handle scrolling the chat manually
//   const handleManualScroll = () => {
//     setIsScrolling(true);
//   };

//   // function to handle scrolling the chat automatically
//   const handleAutoScroll = () => {
//     setIsScrolling(false);
//   };

//   const typingHandler = (e) => {
//     setInputValue(e);
//     if (!socketConnected) return;
//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit("typing", chatData?._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 2000;

//     setTimeout(() => {
//       let timeNow = new Date().getTime();
//       let timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && isTyping) {
//         socket.emit("stop typing", chatData?._id);
//         setIsTyping(false);
//       }
//     }, timerLength);
//   };
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Box flex={"1"} justifyContent={"flex-end"} safeAreaTop bg={colors.light}>
//         {/* <ChatModals
//           showModal={showModal}
//           setShowModal={setShowModal}
//           deleteConversationModal={deleteConversationModal}
//           setDeleteConversationModal={setDeleteConversationModal}
//           value={value}
//           setValue={setValue}
//         /> */}
//         <VStack>
//           <Box h={hp("8%")} justifyContent={"center"}>
//             <HStack alignItems={"center"} justifyContent="space-between">
//               <HStack justifyContent="center" alignItems={"center"}>
//                 <IconButton
//                   m="2"
//                   onPress={() => navigation.goBack()}
//                   alignItems={"center"}
//                   borderRadius={"lg"}
//                   variant="unstyled"
//                   // bg={colors.secondary}
//                   icon={
//                     <Image
//                       source={require("./../../../assets/Back.png")}
//                       size="xs"
//                       resizeMode="contain"
//                       alt="back btn"
//                     />
//                   }
//                 />

//                 <Avatar
//                   mx={"1"}
//                   bg="cyan.500"
//                   source={{
//                     uri:
//                       baseURL + "/contractor_photos/" + chatData?.users?.photo,
//                   }}
//                 />
//                 <VStack justifyContent="center" alignItems={"center"}>
//                   <Text
//                     fontSize={"md"}
//                     color={colors.darkGray}
//                     fontWeight={"semibold"}
//                   >
//                     {chatData?.users?.name}
//                   </Text>

//                   {chatData?.skills !== undefined && (
//                     <Text color={colors.darkGray}>
//                       {chatData?.skills} Expats
//                     </Text>
//                   )}
//                 </VStack>
//               </HStack>
//               <Box mr="3">
//                 <Menu
//                   w={wp("52%")}
//                   alignItems={"flex-end"}
//                   mt="8"
//                   trigger={(triggerProps) => {
//                     return (
//                       <Pressable
//                         accessibilityLabel="More options menu"
//                         {...triggerProps}
//                       >
//                         <Entypo
//                           name="dots-three-vertical"
//                           size={24}
//                           color={colors.darkGray}
//                         />
//                       </Pressable>
//                     );
//                   }}
//                 >
//                   <Box w="100%">
//                     <Menu.Item>
//                       <Pressable w="100%" onPress={() => setShowModal(true)}>
//                         <HStack>
//                           <MaterialIcons
//                             name="report"
//                             size={24}
//                             color={colors.darkGray}
//                           />
//                           <Text ml={"1"}>Report this user</Text>
//                         </HStack>
//                       </Pressable>
//                     </Menu.Item>
//                   </Box>
//                 </Menu>
//               </Box>
//             </HStack>
//           </Box>
//         </VStack>
//         <ScrollView>
//           <FlatList
//             ref={flatListRef}
//             contentContainerStyle={styles.messageContainer}
//             style={styles.messageList}
//             data={messages}
//             renderItem={({ item }) => <RenderItem item={item} />}
//             keyExtractor={(item) => item._id}
//             onScrollBeginDrag={handleManualScroll} // listen to scroll event
//             onScrollEndDrag={handleAutoScroll} // listen to end of scroll event
//             onMomentumScrollEnd={handleAutoScroll} //
//           />
//         </ScrollView>
//         {isTyping && (
//           <Box
//             alignSelf={"flex-end"}
//             p="2"
//             bg={colors.lightGray}
//             borderRadius={"full"}
//             m="1"
//           >
//             <Text color={colors.darkGray}>Typing...</Text>
//           </Box>
//         )}
//         <View style={styles.inputContainer}>
//           <Stack mb={Platform.OS === "ios" ? "6" : "0"}>
//             <Box borderRadius={"lg"} shadow="0.2">
//               <Stack
//                 bg={colors.white}
//                 direction={"row"}
//                 alignItems={"center"}
//                 space="1"
//                 py="2"
//               >
//                 <IconButton
//                   variant={"ghost"}
//                   size={"lg"}
//                   _icon={{
//                     as: EvilIcons,
//                     name: "image",
//                     color: colors.secondary,
//                   }}
//                 />
//                 <Input
//                   borderRadius={"full"}
//                   placeholderTextColor={colors.secondary}

//                   onChangeText={typingHandler}
//                   bg={"rgba(0, 145, 166, 0.08)"}
//                   m="2"
//                   w="72%"
//                   placeholder="Type your message"
//                   borderWidth={"0"}
//                 />

//                 <IconButton
//                   onPress={handleSend}
//                   p="0"
//                   variant={"ghost"}
//                   _icon={{
//                     as: Ionicons,
//                     name: "send-outline",
//                     color: colors.secondary,
//                   }}
//                 />
//               </Stack>
//             </Box>
//           </Stack>
//         </View>
//       </Box>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },

//   messageList: {
//     flex: 1,
//     padding: 10,
//   },

//   userMessageContainer: {
//     // flex: 1,
//     // flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "flex-end",
//     marginBottom: 10,
//   },

//   userMessageBubble: {
//     backgroundColor: "rgba(49, 131, 206, 1)",
//     padding: 10,
//     borderRadius: 10,
//     borderTopRightRadius: 0,
//     maxWidth: "80%",
//     alignItems: "flex-end",
//     justifyContent: "flex-end",
//   },

//   otherMessageContainer: {
//     // flex: 1,
//     // flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 10,
//   },

//   otherMessageBubble: {
//     backgroundColor: "rgba(241, 245, 250, 1)",
//     padding: 10,
//     borderRadius: 10,
//     borderTopLeftRadius: 0,
//     maxWidth: "80%",
//   },

//   messageText: {
//     fontSize: 16,
//     lineHeight: 20,
//     color: "#333",
//   },

//   messageTime: {
//     fontSize: 12,
//     color: "#999",
//     marginTop: 5,
//   },
//   messageContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
// });
// export default MessagesDetails;
