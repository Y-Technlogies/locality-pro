import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal } from 'native-base';

export default function ChatModals() {
  return (
    <>
       <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.400",
        }}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Alert</Modal.Header>
          <Modal.Body>
            <Text fontSize="md">
              Are you sure you want to report this user? If yes please select
              bellow option.
            </Text>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={value}
              onChange={(nextValue) => {
                setValue(nextValue);
              }}
            >
              <Radio value="one" my={1}>
                This user is harassing you.
              </Radio>
              <Radio value="two" my={1}>
                Fraud
              </Radio>
              <Radio value="three" my={1}>
                Scammers
              </Radio>
            </Radio.Group>
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
                colorScheme="secondary"
                variant={"unstyled"}
                bg={colors.delete}
                _text={{
                  color: colors.white,
                }}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Report
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={deleteConversationModal}
        onClose={() => setDeleteConversationModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.400",
        }}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Alert</Modal.Header>
          <Modal.Body>
            <Text fontSize="md">
              Are you sure you want to delete this conversation? If yes press
              Delete.
            </Text>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setDeleteConversationModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="secondary"
                variant={"unstyled"}
                bg={colors.delete}
                _text={{
                  color: colors.white,
                }}
                onPress={() => {
                  setDeleteConversationModal(false);
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}