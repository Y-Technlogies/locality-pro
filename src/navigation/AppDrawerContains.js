import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import { wp } from "../utils/screens";
import colors from "../theme/colors";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/slices/authSlice";
import DrawerModal from "./DrawerModal";
import baseURL from "../utils/baseURL";
import { useUserInfoQuery } from "../store/services/authApi";

export default function AppDrawerContains({ navigation }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [support, setSupport] = React.useState(false);
  const { isLoading, data, refetch } = useUserInfoQuery();
  const handleLogout = () => {
    setVisibleModal(false);
    dispatch(userLogout());
    navigation.navigate("Signin");
  };
  React.useEffect(() => {
    const fetch = async () => await refetch();
    fetch();
  }, [isAuthenticated]);
  return (
    <Box flex={1} safeArea>
      <DrawerModal
        handleLogout={handleLogout}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        support={support}
        setSupport={setSupport}
      />
      <Box w="100%" my="2">
        {isAuthenticated ? (
          isLoading || data === undefined ? (
            <Spinner />
          ) : (
            <Stack
              bg={colors.light}
              py="1"
              w="95%"
              borderRadius={"md"}
              direction={"row"}
              space="2"
              ml="2"
            >
              <Avatar
                bg="cyan.500"
                size="md"
                source={{
                  uri: baseURL + "/contractor_photos/" + data[0]?.photo,
                }}
              />
              <VStack w="80%">
                <Text color={colors.darkGray} bold fontSize="md">
                  {data[0].name}
                </Text>
                <Text color={colors.darkGray} fontWeight="semibold">
                  {data[0].email}
                </Text>
              </VStack>
            </Stack>
          )
        ) : (
          <Stack alignItems={"center"} space="2" ml="2">
            <Text textAlign={"center"} color={colors.darkGray} fontSize="lg">
              Welcome To Locality
            </Text>
            <Button
              variant="solid"
              bg={colors.primary}
              px="8"
              mt="3"
              _text={{
                color: colors.white,
              }}
              w="90%"
              onPress={() => navigation.navigate("Signin")}
            >
              Sign in
            </Button>
          </Stack>
        )}
      </Box>
      <VStack justifyContent={"space-between"} flex={"1"}>
        <Stack space={1}>
          {isAuthenticated && (
            <>
              <Button
                onPress={() => navigation.navigate("Chat")}
                h="12"
                justifyContent="flex-start"
                variant="unstyled"
                alignItems="center"
                w={wp("30%")}
                leftIcon={
                  <Icon
                    mr="2"
                    as={MaterialIcons}
                    name="message"
                    size="lg"
                    color={colors.darkGray}
                  />
                }
              >
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={colors.darkGray}
                >
                  My Messages
                </Text>
              </Button>

              <Button
                onPress={() => navigation.navigate("Proposal")}
                h="12"
                justifyContent="flex-start"
                variant="unstyled"
                alignItems="center"
                w={"100%"}
                leftIcon={
                  <Icon
                    mr="2"
                    as={MaterialCommunityIcons}
                    name="format-list-text"
                    size="lg"
                    color={colors.darkGray}
                  />
                }
              >
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={colors.darkGray}
                >
                  Manage my jobs
                </Text>
              </Button>
              <Button
                onPress={() => navigation.navigate("CheckBalance")}
                h="12"
                justifyContent="flex-start"
                variant="unstyled"
                alignItems="center"
                w={"100%"}
                leftIcon={
                  <Icon
                    mr="2"
                    as={MaterialIcons}
                    name="account-balance-wallet"
                    size="lg"
                    color={colors.darkGray}
                  />
                }
              >
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={colors.darkGray}
                >
                  Check My Balance
                </Text>
              </Button>
              <Button
                onPress={() => navigation.navigate("History")}
                h="12"
                justifyContent="flex-start"
                variant="unstyled"
                alignItems="center"
                w={"100%"}
                leftIcon={
                  <Icon
                    mr="2"
                    as={MaterialIcons}
                    name="history"
                    size="lg"
                    color={colors.darkGray}
                  />
                }
              >
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={colors.darkGray}
                >
                  Withdraw History
                </Text>
              </Button>
            </>
          )}
        </Stack>
        <Stack space={2} mb="3">
          <Divider />
          <Button
            onPress={() => setSupport(true)}
            h="12"
            justifyContent="flex-start"
            variant="unstyled"
            alignItems="center"
            w={wp("30%")}
            leftIcon={
              <Icon
                mr="2"
                as={FontAwesome}
                name="support"
                size="lg"
                color={colors.darkGray}
              />
            }
          >
            <Text fontSize="md" fontWeight="semibold" color={colors.darkGray}>
              Support
            </Text>
          </Button>
          {isAuthenticated && (
            <>
              <Divider />
              <Button
                onPress={() => setVisibleModal(true)}
                h="12"
                justifyContent="flex-start"
                variant="unstyled"
                alignItems="center"
                w={wp("30%")}
                leftIcon={
                  <Icon
                    mr="2"
                    as={MaterialIcons}
                    name="logout"
                    size="lg"
                    color={colors.darkGray}
                  />
                }
              >
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={colors.darkGray}
                >
                  Logout
                </Text>
              </Button>
            </>
          )}
        </Stack>
      </VStack>
    </Box>
  );
}
