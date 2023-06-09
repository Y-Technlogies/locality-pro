import {
  Box,
  FlatList,
  Input,
  Pressable,
  Stack,
  Text,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { hp, wp } from "../../../utils/screens";
import { Entypo } from "@expo/vector-icons";
const TagInput = ({ setTags, tags }) => {
  const [text, setText] = useState("");

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleAddTag = () => {
    if (text.length > 0) {
      setTags([...tags, text]);
      setText("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const renderItem = ({ item, index }) => (
    <Pressable mr="1" onPress={() => handleRemoveTag(index)}>
      <Box
        w="100%"
        position={"relative"}
        variant={"outline"}
        bg={colors.primaryLight}
        p="2"
        borderRadius={"full"}
      >
        <Box
          top="-2"
          right={"-2"}
          position={"absolute"}
          zIndex={"2"}
          bg={colors.white}
          p="0"
          borderRadius={"full"}
        >
          <Entypo name="circle-with-cross" size={16} color={colors.delete} />
        </Box>
        <Text>{item}</Text>
      </Box>
    </Pressable>
  );

  return (
    <Stack space="1" flex="1">
      <Text color={colors.secondary} fontSize={"md"} fontWeight="semibold">
        Enter your experience
      </Text>
      <Input
        borderRadius="lg"
        bg={colors.white}
        h={hp("5%")}
        w={wp("90%")}
        autoCapitalize="none"
        style={styles.input}
        value={text}
        onChangeText={handleTextChange}
        onSubmitEditing={handleAddTag}
        placeholder="Add experience"
        placeholderTextColor="#888"
        returnKeyType="done"
      />

      <FlatList
        flex="1"
        data={tags}
        renderItem={renderItem}
        horizontal
        keyExtractor={(index) => index.toString()}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 16,
    padding: 8,
    width: "100%",
  },
  input: {
    fontSize: 16,
  },
});

export default TagInput;
