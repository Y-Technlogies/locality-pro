import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Image, Stack, Text } from "native-base";
import colors from "../../../theme/colors";
import { hp, wp } from "../../../utils/screens";
import baseURL from "../../../utils/baseURL";

const MultiSelectInput = ({
  options,
  setSelectedSpecialty,
  selectedSpecialty,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  React.useEffect(() => {
    if (selectedSpecialty.length === 0) {
      setSelectedValues([]);
    }
  }, [selectedSpecialty]);

  const handleSelect = (value) => {
    if (selectedSpecialty?.includes(value)) {
      setSelectedSpecialty(
        selectedSpecialty?.filter((v) => v.label !== value.label)
      );
    } else {
      setSelectedSpecialty([
        ...selectedSpecialty,
        {
          label: value.name,
          value: value._id,
        },
      ]);
    }
  };
  const handleSelectNames = (value) => {
    console.log(
      "🚀 ~ file: MultiSelect.jsx:36 ~ handleSelectNames ~ value:",
      value
    );
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };
  const handleDone = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    console.log("🚀 ~ file: MultiSelect.jsx:59 ~ renderItem ~ item:", item)
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelect(item);
          handleSelectNames(item.name);
        }}
        style={styles.item}
      >
        <Stack direction={"row"} alignItems={"center"} space="2">
          <Image
            size={"xs"}
            alt="icons"
            source={{ uri: baseURL + "/sub_category_icons/" + item.icon }}
          />
          <Text fontSize={"lg"}>{item.name}</Text>
        </Stack>
        {selectedValues.includes(item.name) && (
          <Ionicons name="checkmark-sharp" size={24} color="green" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Box
      bg={colors.white}
      mt={1}
      h={hp("5%")}
      w={wp("90%")}
      borderRadius="lg"
      borderColor={colors.inputBorder}
      borderWidth={"1"}
    >
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text color={colors.inputText} p="2">
          {selectedValues.length > 0
            ? selectedValues
                .map(
                  (value) =>
                    options.find((option) => option.name === value).name
                )
                .join(", ")
            : "Select specialty "}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={modalVisible}>
        <Box flex="1" safeArea>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Select specialty </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
            extraData={selectedValues}
          />
          <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  placeholder: {
    color: "gray",
  },
  modal: {
    flex: 0.4,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  itemLabel: {
    fontSize: 18,
  },
  doneButton: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MultiSelectInput;
