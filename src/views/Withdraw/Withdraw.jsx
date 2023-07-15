import { Box, Input, Pressable, ScrollView, Stack, Text } from "native-base";
import React from "react";
import SimpleHeader from "../../components/SimpleHeader";
import BtnContainer from "../../components/BtnContainer";
import { wp } from "../../utils/screens";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { useSendWithdrawRequestMutation } from "../../store/services/appApi";
export default function Withdraw({ navigation }) {
  const [account_name, setAccount_name] = React.useState("");
  const [account_number, setAccount_number] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [bank, setBank] = React.useState("");
  const [routing_number, setRouting_number] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [sendWithdrawRequest, { isLoading }] = useSendWithdrawRequestMutation();

  const user = useSelector((x) => x.auth.userInfo);

  const handleSubmit = async () => {
    try {
      if (
        account_name === "" ||
        account_number === "" ||
        bank === "" ||
        branch === "" ||
        routing_number === "" ||
        amount === ""
      ) {
        Toast.show({
          type: "error",
          text1: "Please enter all input field!",
        });
      }
      if (account_name === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Account Name",
        });
      }
      if (account_number === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Account Number",
        });
      }
      if (bank === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Bank Number",
        });
      }
      if (branch === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Branch",
        });
      }
      if (routing_number === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Routing Number",
        });
      }
      if (amount === "") {
        Toast.show({
          type: "error",
          text1: "Please enter Amount",
        });
      } else {
        const payload = {
          contractor: user._id,
          amount,
          account_name,
          account_number,
          branch,
          routing_number,
          bank,
        };
        const { data, error } = await sendWithdrawRequest(payload);
        setAccount_name("");
        setAccount_number("");
        setBranch("");
        setBank("");
        setRouting_number("");
        setAmount("");
        if (error) {
          Toast.show({
            type: "error",
            text1: error.message,
          });
        } else {
          Toast.show({
            type: "success",
            text1: data.message,
          });
          setAccount_name("");
          setAccount_number("");
          setBranch("");
          setBank("");
          setRouting_number("");
          setAmount("");
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: Withdraw.jsx:18 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <Box safeArea bg={"rgba(249, 250, 252, 1)"}>
      <SimpleHeader
        title="Withdraw"
        navigation={() => navigation.navigate("CheckBalance")}
      />
      <ScrollView>
        <Stack space="2" m="2">
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Bank
          </Text>
          <Input
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={bank}
            onChangeText={setBank}
            placeholder="Bank"
          />
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Account Name
          </Text>
          <Input
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={account_name}
            onChangeText={setAccount_name}
            placeholder="Account Name"
          />
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Account Number
          </Text>
          <Input
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={account_number}
            onChangeText={setAccount_number}
            placeholder="Account Number"
          />
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Branch
          </Text>
          <Input
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={branch}
            onChangeText={setBranch}
            placeholder="Brunch"
          />
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Routing Number
          </Text>
          <Input
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={routing_number}
            onChangeText={setRouting_number}
            placeholder="Routing Number"
          />
          <Text fontSize={"lg"} ml="2" fontWeight={"semibold"}>
            Amount
          </Text>
          <Input
            keyboardType="numeric"
            alignSelf={"center"}
            bg={"#fff"}
            p="3"
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
          />
          <Pressable mt="6" onPress={handleSubmit}>
            <BtnContainer
              isLoading={isLoading}
              title="Send Withdraw Request"
              width={wp("92%")}
            />
          </Pressable>
        </Stack>
      </ScrollView>
    </Box>
  );
}
