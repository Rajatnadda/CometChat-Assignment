import ReactDOM from "react-dom/client";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import React from "react";
import App from "App";
import { setupLocalization } from "CometChat/utils/utils";
import cometChatLogo from "../src/CometChat/assets/cometchat_logo.svg";
import { CometChatProvider } from "CometChat/context/CometChatContext";
/**
 * CometChat application constants
 * @constant {Object} COMETCHAT_CONSTANTS
 * @property {string} APP_ID - CometChat application ID
 * @property {string} REGION - CometChat region
 * @property {string} AUTH_KEY - CometChat authentication key
 */
// Read credentials from environment variables when available. Falls back to
// the values that were previously present in the repo (useful for quick local runs).
export const COMETCHAT_CONSTANTS = {
  APP_ID:
    process.env.REACT_APP_COMETCHAT_APP_ID || "1672875ffb277b809",
  REGION: process.env.REACT_APP_COMETCHAT_REGION || "in",
  AUTH_KEY:
    process.env.REACT_APP_COMETCHAT_AUTH_KEY || "78e20be5602dd2c2ec5bda4f485eb208475f0168",
};

/**
 * Initialize CometChat if credentials are available, otherwise render the app directly.
 */
if (
  COMETCHAT_CONSTANTS.APP_ID &&
  COMETCHAT_CONSTANTS.REGION &&
  COMETCHAT_CONSTANTS.AUTH_KEY
) {
  const uiKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();

  /**
   * Initialize CometChat UIKit and render the application inside the CometChatProvider.
   */
  CometChatUIKit.init(uiKitSettings)?.then((response) => {
    setupLocalization();
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <CometChatProvider>
        <App />
      </CometChatProvider>
    );
  });
} else {
  /**
   * If credentials are missing, render the app without initializing CometChat.
   */
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <div className="App" style={{ gap: "20px" }}>
      <div className="cometchat-credentials__logo">
        <img src={cometChatLogo} alt="CometChat Logo" />
      </div>
      <div className="cometchat-credentials__header">
        CometChat App credentials are missing. Please add them in{" "}
        <code>index.tsx</code> to continue.
      </div>
    </div>
  );
}
