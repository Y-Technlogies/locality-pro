import {
  Box,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  TextArea,
} from "native-base";
import React from "react";
import SimpleHeader from "../../components/SimpleHeader";
import colors from "../../theme/colors";
import BtnContainer from "../../components/BtnContainer";
import { wp } from "../../utils/screens";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useGetSubmittedProposalQuery, useSendProposalMutation } from "../../store/services/appApi";
export default function SendProposal({ route, navigation }) {
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { _id } = route?.params?.item;
  const userInfo = useSelector((x) => x?.auth?.userInfo);
  const [sendProposal, { isLoading }] = useSendProposalMutation();
  const { refetch } = useGetSubmittedProposalQuery();
  const handleNavigation = () => {
    navigation.navigate("PostDetails", {
      item: route?.params?.item,
    });
  };

  const handleSubmit = async () => {
    if (price === "" || description === "") {
      Toast.show({
        type: "success",
        text1: "Enter All input field.",
      });
    } else {
      try {
        const payload = {
          job: _id,
          contractor: userInfo?._id,
          price: price,
          description: description,
        };
        const { data, error } = await sendProposal(JSON.stringify(payload));
        if (data?.message) {
          Toast.show({
            type: "success",
            text1: data?.message,
          });
          setPrice("");
          setDescription("");
          // navigation.navigate("ProposalSendSuccess")
      await    refetch();
        } else {
          Toast.show({
            type: "error",
            text1: error?.message,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error?.message,
        });
      }
    }
  };
  return (
    <Box safeArea bg={colors.light} flex="1">
      <SimpleHeader navigation={handleNavigation} title={"Send Proposal"} />
      <ScrollView>
        <Text
          pt="3"
          pl="3"
          fontSize={"lg"}
          fontWeight={"semibold"}
          color={colors.secondary}
        >
          Send your proposal
        </Text>
        <Text pl="3" color={colors.gray} fontSize={"sm"}>
          Note: You can send only one proposal for this job.
        </Text>
        <Stack space="3" p="3" alignItems={"center"}>
          <Input
            keyboardType="numeric"
            value={price}
            onChangeText={(e) => setPrice(e)}
            placeholder="Enter your price"
            bg={colors.white}
            keyboardAppearance="c"
          />
          <TextArea
            value={description}
            onChangeText={(e) => setDescription(e)}
            placeholder="Enter your description"
            bg={colors.white}
            h="40"
          />
          <Pressable pl="2" onPress={handleSubmit}>
            <BtnContainer
              isLoading={isLoading}
              title="Send"
              width={wp("92%")}
            />
          </Pressable>
        </Stack>
      </ScrollView>
    </Box>
  );
}
