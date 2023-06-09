import {
  Avatar,
  Box,
  Button,
  FormControl,
  Modal,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import colors from "../../theme/colors";
import SimpleHeader from "../../components/SimpleHeader";
import baseURL from "../../utils/baseURL";
import moment from "moment";
import { wp } from "../../utils/screens";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import timelineDataConverter from "../../utils/timelineDataConverter";
import { useSelector } from "react-redux";
import Timeline from "../../components/Timeline/Timeline";
import BtnContainer from "../../components/BtnContainer";
import { useGetOneProposalQuery } from "../../store/services/appApi";
import Toast from "react-native-toast-message";
import axios from "axios";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { StyleSheet } from "react-native";
export default function ProposalDetails({ navigation, route }) {
  const [timelineData, setTimelineData] = React.useState([]);
  const [startJobModal, setStartJobModal] = React.useState(false);
  const [completedJobModal, setCompletedJobModal] = React.useState(false);
  //  const [data, setData] = React.useState({});
  const [verificationCode, setVerificationCode] = React.useState();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 6;

  const {
    data,

    refetch,
    isLoading: loadingData,
  } = useGetOneProposalQuery(route.params.item._id);

  const auth = useSelector((x) => x.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setTimelineData(timelineDataConverter(data, auth.userInfo.name));
  }, [data]);

  const handleNavigation = () => {
    navigation.goBack();
  };
  const handleConfirmJob = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await axios.get(
        `${baseURL}/proposal/confirm_selected_job?id=${route?.params?.item?._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      );
      await refetch();

      if (data?.message === "You Have Confirmed") {
        Toast.show({
          type: "success",
          text1: "You Have Confirmed",
        });
        await refetch();
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error============+>", error);
      setIsLoading(false);
    }
  };
  const handleStartJob = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await axios.get(
        `${baseURL}/proposal/start_job?id=${route?.params?.item?._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      );
      refetch();
      if (data?.message === "Please Input Code From User") {
        Toast.show({
          type: "success",
          text1: "Please Input Code From User",
        });
        setStartJobModal(true);
        await refetch();
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",

        text1: error.message,
      });
      setIsLoading(false);
    }
  };
  const handleConfirmStartJob = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await axios.get(
        `${baseURL}/proposal/confirm_start_job?id=${route?.params?.item?._id}&typedCode=${verificationCode}`,
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      );

      await refetch();

      if (data?.message === "Job Started") {
        Toast.show({
          type: "success",
          text1: "Job Started",
        });
        setVerificationCode();
        setStartJobModal(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error?.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",

        text1: error?.message,
      });
      setIsLoading(false);
    }
  };
  const handleJobCompleted = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await axios.get(
        `${baseURL}/proposal/init_complete_job?id=${route?.params?.item?._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      );
      await refetch();

      if (
        data?.message ===
        "Please Input Code From User To Mark Complete Your Job"
      ) {
        Toast.show({
          type: "success",
          text1: "Enter Input Code From User",
        });
        setCompletedJobModal(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error.message,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",

        text1: error.message,
      });
      setIsLoading(false);
    }
  };

  const handleConfirmCompleteJob = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await axios.get(
        `${baseURL}/proposal/confirm_complete_job?id=${route?.params?.item?._id}&typedCode=${verificationCode}`,
        {
          headers: {
            Authorization: `Bearer ${auth.tokens.accessToken}`,
          },
        }
      );
      console.log(
        "🚀 ~ file: ProposalDetails.js:228 ~ handleConfirmCompleteJob ~ error:",
        error
      );
      console.log(
        "🚀 ~ file: ProposalDetails.js:235 ~ handleConfirmCompleteJob ~ data:",
        data
      );
      await refetch();

      if (data?.message === "Job Completed") {
        Toast.show({
          type: "success",
          text1: "Job Completed",
        });
        setVerificationCode();
        setCompletedJobModal(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: error?.message,
        });
      }
      setIsLoading(false);
      setVerificationCode();
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",

        text1: error?.message,
      });
      setIsLoading(false);
    }
  };
  if (loadingData) {
    return <Spinner />;
  }

  return (
    <Box safeArea bg={colors.light} flex="1">
      <Modal
        isOpen={startJobModal}
        onClose={() => setStartJobModal(false)}
        avoidKeyboard
        size="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Verify Start Job</Modal.Header>
          <Modal.Body>
            Enter OTP to verify
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={verificationCode}
              onChangeText={setVerificationCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              isLoading={isLoading}
              flex="1"
              onPress={handleConfirmStartJob}
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={completedJobModal}
        onClose={() => setCompletedJobModal(false)}
        avoidKeyboard
        size="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Verify Complete Job</Modal.Header>
          <Modal.Body>
            Enter OTP to verify
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={verificationCode}
              onChangeText={setVerificationCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              isLoading={isLoading}
              flex="1"
              onPress={handleConfirmCompleteJob}
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <SimpleHeader navigation={handleNavigation} title={"Proposal Details"} />
      <ScrollView>
        <Box p="2">
          <Box p="2" bg={colors.white} my="2" borderRadius={"md"}>
            <Text
              fontSize={"xl"}
              pb="3"
              color={colors.primary}
              fontWeight={"semibold"}
            >
              {data?.job?.title}
            </Text>
            <Stack
              pb="2"
              space="3"
              direction="row"
              justifyContent={"space-between"}
            >
              <Stack
                w="100%"
                p="1"
                borderRadius={"md"}
                bg={colors.light}
                space="1"
                direction="row"
                alignItems={"center"}
              >
                <Avatar
                  bg="cyan.500"
                  size="md"
                  source={{
                    uri:
                      baseURL +
                      "/user_photos/" +
                      route?.params?.item?.job?.by?.photo,
                  }}
                />
                <VStack pl="3">
                  <Text fontSize={"md"} bold>
                    {route?.params?.item?.job?.by?.name}
                  </Text>
                  <Stack alignItems={"center"} direction={"row"} space="2">
                    <AntDesign
                      name="clockcircleo"
                      size={16}
                      color={colors.darkGray}
                    />
                    <Text fontSize={"md"}>
                      {moment(data?.job?.createdAt).format("YYYY-MM-DD")}
                    </Text>
                  </Stack>
                </VStack>
              </Stack>
            </Stack>
            <Stack space="2">
              <Stack direction={"row"} space="3" alignItems={"center"}>
                <FontAwesome5
                  name="money-bill-wave"
                  size={13}
                  color={colors.darkGray}
                />
                <Text fontSize={"md"}>
                  Budget: ${data?.price}{" "}
                  {data?.job?.type !== undefined && `(${data?.job?.type})`}
                </Text>
              </Stack>
              <Stack direction={"row"} space="3" alignItems={"center"}>
                <FontAwesome
                  name="calendar"
                  size={16}
                  color={colors.darkGray}
                />
                <Text fontSize={"md"}>
                  Time period:{" "}
                  {moment(data?.job?.start_date).format("YYYY-MM-DD")} -{" "}
                  {moment(data?.job?.end_date).format("YYYY-MM-DD")}
                </Text>
              </Stack>
              <Stack direction={"row"} space="3" alignItems={"center"}>
                <Entypo name="time-slot" size={16} color={colors.darkGray} />

                <Text fontSize={"md"}>
                  Availability: {data?.job?.time_slot?.name}
                </Text>
              </Stack>
              <Stack space="2" pb="2">
                <Text
                  color={colors.primary}
                  fontSize={"md"}
                  fontWeight={"semibold"}
                >
                  Description
                </Text>
                <Text>{data?.job?.description}</Text>
              </Stack>
            </Stack>
          </Box>

          <Box p="2" mb="6" bg={colors.white} my="2" borderRadius={"md"}>
            <Text fontSize={"lg"} fontWeight="bold" color={colors.primary}>
              Booking Status
            </Text>
            <Box mt="3" w={wp("100%")} p="1">
              <Timeline data={timelineData} />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box bg={colors.white} py="3" borderTopRadius={"md"}>
        {(() => {
          if (!data?.isConfirmed) {
            return (
              <Pressable onPress={handleConfirmJob}>
                <BtnContainer
                  isLoading={isLoading}
                  width={wp("92%")}
                  title="Confirm Job"
                />
              </Pressable>
            );
          } else if (!data?.isStarted) {
            return (
              <Pressable onPress={handleStartJob}>
                <BtnContainer
                  isLoading={isLoading}
                  width={wp("92%")}
                  title="Start the job"
                />
              </Pressable>
            );
          } else if (!data?.isCompleted) {
            return (
              <Pressable onPress={handleJobCompleted}>
                <BtnContainer
                  isLoading={isLoading}
                  width={wp("92%")}
                  title="Job Completed"
                />
              </Pressable>
            );
          }
          return null;
        })()}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    textAlign: "center",
    justifySelf: "center",
    width: 32,
    height: 48,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 4,
    marginHorizontal: 12,
  },
  focusCell: {
    borderColor: colors.darkGray,
  },
});
