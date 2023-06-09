import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import colors from "../theme/colors";
import baseURL from "../utils/baseURL";

const ImageSlider = ({ duration = 5000, photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % photos.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        {photos.map((image, index) => (
          <Image
            key={index}
            source={{ uri: baseURL + "/job_photos/" + image }}
            style={[styles.image, { opacity: index === activeIndex ? 1 : 0 }]}
          />
        ))}
      </View>
      <View style={styles.dots}>
        {photos.map((_, index) => (
          <Pressable key={index} onPress={() => setActiveIndex(index)}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex ? colors.white : colors.gray,
                },
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    height: 200,
    width: "100%",
    flexDirection: "row",

    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    height: 200,
    width: "95%",
    position: "absolute",
    borderRadius: 12,
  },
  dots: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default ImageSlider;
