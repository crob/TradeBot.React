import { useToast } from '@chakra-ui/react';
import React, { useEffect } from "react";
// import { ToastState, getToastState, toastShown } from "../../store/toast";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

// import { logLastAction } from "../../store/lastAction";

export interface ToastMessagingProps {}

const ToastMessaging: React.FunctionComponent<ToastMessagingProps> = (props) => {
  const toast = useToast();
  const dispatch = useDispatch();

  // const toastState: ToastState = useSelector(getToastState);

  // useEffect(() => {
  //   if (toastState.title) {
  //     toast({
  //       position: toastState.position,
  //       title: toastState.title,
  //       description: toastState.description,
  //       status: toastState.status,
  //       duration: toastState.duration,
  //       isClosable: toastState.isClosable,
  //     });
  //     dispatch(logLastAction({ type: toastShown.type }));
  //   }
  // });

  return (
    <>
      {/* {toastState.redirect && (
        <Redirect to={`${toastState.redirect}?t=${toastState.shown}`} />
      )} */}
    </>
  );
};

export default ToastMessaging;
