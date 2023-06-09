import React from "react";
import { Button, Modal, Text } from "native-base";
import colors from "../theme/colors";
import { hp, wp } from "../utils/screens";

export default function DrawerModal({
  handleLogout,
  visibleModal,
  setVisibleModal,
  support,
  setSupport,
}) {
  return (
    <>
      <Modal
        isOpen={support}
        onClose={() => setSupport(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Support</Modal.Header>
          <Modal.Body>
            <Text>
              For any further queries, please contact
              <Text color={colors.primary}> support@localitytech.ca</Text>.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                bg={colors.delete}
                variant="ghost"
                w="100%"
                colorScheme="blueGray"
                onPress={() => {
                  setSupport(false);
                }}
                _text={{
                  color: colors.white,
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={visibleModal}
        onClose={() => setVisibleModal(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Alert</Modal.Header>
          <Modal.Body>
            Are you sure you want to logout from this account?
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setVisibleModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="unstyled"
                bg={colors.delete}
                _text={{ color: colors.white }}
                alignSelf="center"
                onPress={handleLogout}
                w={"50%"}
              >
                Logout
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
