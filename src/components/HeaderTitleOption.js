import React from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  Modal,
  Pressable,
  Text,
} from "native-base";
import { wp } from "../utils/screens";
import colors from "../theme/colors";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useDeleteUserMutation } from "../store/services/appApi";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/slices/authSlice";
import Toast from "react-native-toast-message";
export default function HeaderTitleOption({ title }) {
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);
  const userInfo = useSelector((x) => x.auth.userInfo);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  console.log(
    "🚀 ~ file: HeaderTitleOption.js:30 ~ HeaderTitleOption ~ isOpenMenu:",
    isOpenMenu
  );
  const handleDelete = async () => {
    try {
      const { data } = await deleteUser(userInfo?._id);
      // console.log(
      // "🚀 ~ file: AppDrawerContains.js:38 ~ handleLogout ~ data,error:",
      // data,
      // error
      // );
      if (data?.message === "Deleted Successfully") {
        setShowModal(false);
        dispatch(userLogout());
        navigation.navigate("Auth");
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong.",
        });
      }
    } catch (error) {
      // console.log(
      // "🚀 ~ file: AppDrawerContains.js:30 ~ handleLogout ~ error:",
      // error
      // );
    }
  };
  return (
    <Box
      safeAreaTop
      w={wp("100%")}
      bg={{
        linearGradient: {
          colors: ["#0091A6", "#0F617E"],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      justifyContent={"center"}
      p="2"
    >
      <Center>
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
              Are you sure you want to delete your account? If you delete your
              account then your all information will be deleted.
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
      </Center>
      <HStack w="96%" alignItems="center" justifyContent={"space-between"}>
        <HStack alignItems="center">
          <IconButton
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            w={"10%"}
            alignItems={"center"}
            mx={1}
            borderRadius={"lg"}
            variant="unstyled"
            size={"lg"}
            icon={
              <Icon as={Ionicons} name="ios-menu-sharp" color={colors.white} />
            }
          />
          <Text bold fontSize="lg" color={colors.white}>
            {title}
          </Text>
        </HStack>
        <Box>
          <Menu
            defaultIsOpen={isOpenMenu}
            //   isOpen={isOpenMenu}
            w={wp("52%")}
            alignItems={"flex-end"}
            mt="8"
            onClose={() => setIsOpenMenu(false)}
            trigger={(triggerProps) => {
              return (
                <Pressable
                  onPress={() => setIsOpenMenu(true)}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color={colors.white}
                  />
                </Pressable>
              );
            }}
          >
            <Box w="100%">
              {/* <Menu.Item>
                <Pressable
                  w="100%"
                  onPress={() => {
                    navigation.navigate("EditProfile");
                    setIsOpenMenu(false);
                  }}
                >
                  <HStack>
                    <MaterialIcons
                      name="edit"
                      size={24}
                      color={colors.darkGray}
                    />
                    <Text ml={"1"}>Edit Profile</Text>
                  </HStack>
                </Pressable>
              </Menu.Item> */}
              <Menu.Item>
                <Pressable w="100%" onPress={() => setShowModal((p) => !p)}>
                  <HStack>
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={colors.darkGray}
                    />
                    <Text ml={"1"}>Delete Account</Text>
                  </HStack>
                </Pressable>
              </Menu.Item>
            </Box>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
}
