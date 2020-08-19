import React, { useState, useEffect } from "react";
import ActionCable from "actioncable";

const { Provider, Consumer } = React.createContext({});

function ActionCableSubscription(props) {
  const {
    cable,
    channel,
    onReceived,
    onConnected,
    onRejected,
    onDisconnected,
  } = props;

  useEffect(() => {
    if (!cable) {
      return;
    }

    const subscription = cable.subscriptions.create(channel, {
      received: onReceived,
      connected: onConnected,
      rejected: onRejected,
      disconnected: onDisconnected,
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [cable, channel]);

  return null;
}

export function ActionCableConsumer(props) {
  return (
    <Consumer>
      {({ cable }) => <ActionCableSubscription cable={cable} {...props} />}
    </Consumer>
  );
}

export function ActionCableProvider(props) {
  const { url } = props;
  const [cable, setCable] = useState();

  useEffect(() => {
    const consumer = ActionCable.createConsumer(url);
    setCable(consumer);

    return () => {
      consumer.disconnect();
    };
  }, [url]);

  return <Provider value={{ cable }}>{props.children}</Provider>;
}
