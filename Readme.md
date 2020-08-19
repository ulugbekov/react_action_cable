# ActionCable for React with Hooks

## Install

```shell
npm install --save react_action_cable
# OR
yarn add react_action_cable
```

## Usage

The public API exports two components that you'll use: `<ActionCableProvider />` and `<ActionCableConsumer />`.

### `<ActionCableProvider />`

The provider is used in an outer container and wraps all of the components that may or may not consume the context. It accepts `url`. Passing `url` will result in the provider instantiating its own `ActionCable.Consumer` with that URL.

#### With `url`

```jsx
<ActionCableProvider url="ws://test.example.com/cable">...</ActionCableProvider>
```

### `<ActionCableConsumer />`

The consumer will wrap an individual component. It accepts several props:

- `channel` [String] Name of the channel to which you want to subscribe.
- `channel` [Object] An object with a `channel` key which denotes the channel to which you want to subscribe. All other keys are passed to the channel as params.
- `onConnected` [Function] A handler function that is called when the channel connects.
- `onDisconnected` [Function] A handler function that is called when the channel disconnects.
- `onInitialized` [Function] A handler function that is called when the `ActionCable`.`Consumer` is initialized.
- `onRejected` [Function] A handler function that is called when the requested subscription is rejected.
- `onReceived` [Function] A handler function that is called when the channel transmits a message to the client.

```jsx
import React from "react";
import { ActionCableConsumer } from "@ulugbekov/react_action_cable";

function NotificationsChannel(props) {
  function onReceived(data) {}

  function onConnected() {}

  function onDisconnected() {}

  function onRejected() {}

  return (
    <ActionCableConsumer
      channel="NotificationsChannel"
      onReceived={onReceived}
      onConnected={onConnected}
      onDisconnected={onDisconnected}
      onRejected={onRejected}
    />
  );
}

export default NotificationsChannel;
```
