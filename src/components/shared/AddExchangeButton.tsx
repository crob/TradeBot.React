import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewExchange, getExchangesState, ExchangeState } from '../../store/reducers/exchange.reducer';
import Select from './ui/forms/Select';
import TextInput from './ui/forms/TextInput';
import { ExchangeName, ExchangeNameText } from '../../enums/exchange-name';
import FormServerError from './ui/forms/FormServerError';

export interface AddExchangeButtonProps {
  isLoading: boolean
}

const AddExchangeButton: React.FC<AddExchangeButtonProps> = (props: AddExchangeButtonProps) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, errors, register } = useForm();

  const exchangeState: ExchangeState = useSelector(getExchangesState);


  useEffect(() => {
  }, []);

  function onSubmit(values: any) {
    dispatch(saveNewExchange(values));
  }

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        isLoading={props.isLoading}
        loadingText="syncing"
        size="md"
        type="button"
        onClick={onOpen}
      >
        Exchange
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Exchange</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} >
            <ModalBody padding="20px 20px 40px">
              <Select
                inputRef={register({ required: true })}
                id="name"
                label="Exchange"
                errors="errors"
                enums={[ExchangeName, ExchangeNameText]}
              >
                {errors.name && "Exchange is required."}
              </Select>

              <TextInput
                id="nickname"
                label="Nickname"
                errors={errors}
                inputRef={register({ required: true })}
              >
                {errors.nickname &&
                  errors.nickname.type === "required" &&
                  "Nickname is required"}
              </TextInput>
              <TextInput
                id="apiKey"
                label="API Key"
                errors={(exchangeState?.errors) ? exchangeState?.errors : errors}
                inputRef={register({ required: true })}
              >
                {errors.apiKey &&
                  errors.apiKey.type === "required" &&
                  "API Key is required"}
                {!errors.apiKey && exchangeState?.errors?.apiKey && exchangeState.errors?.apiKey[0].message}
              </TextInput>
              <TextInput
                id="apiSecret"
                label="API Secret"
                errors={errors}
                inputRef={register({ required: true })}
              >
                {errors.apiSecret &&
                  errors.apiSecret.type === "required" &&
                  "API Secret is required"}
              </TextInput>
              <TextInput
                id="apiThird"
                label="API additional param (passphrase)"
                errors={errors}
                inputRef={register()}
              >
              </TextInput>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose} aria-describedby="addExchangeError">
                Cancel
              </Button>
              <Button type="submit" variant="ghost">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
   );
}

export default AddExchangeButton;