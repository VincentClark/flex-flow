const defaultConfiguration: Config = {
    disableLocalStorage: false,
    available: true,
    colorTheme: {
        baseName: "BlueMediumTheme"
    },
    componentProps: {
        MessagingCanvas: {
            avatarCallback: (identity) => SessionActions.getAgentAvatar(identity),
            showTrayOnInactive: true
        },
        MessageCanvasTray: {
            onButtonClick: () => Actions.invokeAction("RestartEngagement")
        }
        PreEngagementCanvas: {
            //....
        },

        tokenServerUrl: "https://iam.twilio.com/v1/Accounts/{accountSid}/Tokens",
        flexWebChannelsUrl: "https://flex-api.twilio.com/v1/WebChannels",
        context: {
            friendlyName: "Anonymous"
        },
        startEngagementOnInit: false,
        preEngagementConfig: {
            ...
    }
    };
