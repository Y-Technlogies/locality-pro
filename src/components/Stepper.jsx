import { ScrollView } from "native-base";
import React, { useState, ReactElement } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const search = (keyName, myArray) => {
  let value = false;
  myArray.map((val) => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
    step,
    pushData,
    removeData,
  } = props;
  // const [step, setStep] = useState([0]);
  // const pushData = (val) => {
  //   setStep((prev) => [...prev, val]);
  // };

  // const removeData = () => {
  //   setStep((prev) => {
  //     prev.pop();
  //     return prev;
  //   });
  // };
  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "grey",
                    opacity: 1,
                    marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: "#1976d2",
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: search(i, step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}
              >
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      stepTextStyle,
                    ]}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      stepTextStyle,
                    ]}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>{content[active]}</ScrollView>

      {showButton && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {active !== 0 && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: "flex-start",
                  marginRight: 10,
                },
                buttonStyle,
                {
                  backgroundColor: "#a1a1a1",
                },
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>Back</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "#1976d2",
                  alignSelf: "flex-start",
                  marginRight: 10,
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>Next</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: "#1976d2",
                  alignSelf: "flex-start",
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}
            >
              <Text style={[{ color: "white" }, buttonTextStyle]}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
