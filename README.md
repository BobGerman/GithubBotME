# GithubBotME - Sample Message Extension for accessing Github data

**NOTE THIS IS A PUBLIC REPO** - I am "working in the open". The final sample will be hosted elsewhere (TBD).

**THERE SHOULD BE NO CONFIDENTIAL INFORMATION HERE PLEASE** even in the issues, wiki, etc. If you need to share Microsoft internal details, please contact me in Teams and I'll add you to our v-team chat. If you'd like to contribute, please reach out to me to discuss.

This is a message extension intended to showcase the ability to use a bot-based Teams Search Message Extension with Microsoft 365 Copilot. Note that there is no special code, preview libaries etc. here - anybody can build one of these! Indeed that's the beauty of Microsoft 365 Copilot, it can consume information from Message Extensions without requiring updates or code changes!

At any given time the `main` branch should work. Enhancements are in development in other branches and/or forks.

Thanks, Bob

## Current state of the sample

This is the quick "first cut" at a Github Search ME which searches for Github issues and pull requests and displays them in an adaptive card.
It is currently hard-coded to work with the Teams community samples repo ([https://github.com/pnp/teams-dev-samples](https://github.com/pnp/teams-dev-samples)); a future version will allow configuring the repo using a setup page.

## Quick Install of Hosted Version

I am (temporarily) hosting a working version of the app in my Azure tenant, so you don't need to build or host the sample in order to try it. Actually it should work as a ME in any tenant. This hosted version reflects the code in the `main` branch.

To run it,  follow the general Copilot ME testing steps available internally to Microsoft dogfood testers.

Then download the [app package](https://microsoft-my.sharepoint.com/:f:/r/personal/rogerman_microsoft_com/Documents/Documents/Projects/Github%20ME/Shared/InstallationPackage?csf=1&web=1&e=NbIqae) and [upload to Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/platform/toolkit/publish#upload-app-package).

Watch this space for updates - the manifest may change without notice but I will note any need to update in the "Current state of the sample" section above.

Prompts that are known to work:

1. "Find github info relating to manifest"

## Building and developing the sample

This sample is based on the Teams Toolkit "Search Message Extension" template. 
No special build steps are required at this time so if you know your way around Teams Toolkit, just load it up and hit F5.

Here are build details from the Teams Toolkit project template.

### Prerequisites

- [Node.js](https://nodejs.org/), supported versions: 16, 18
- An M365 account. If you do not have M365 account, apply one from [M365 developer program](https://developer.microsoft.com/microsoft-365/dev-program)
- [Set up your dev environment for extending Teams apps across Microsoft 365](https://aka.ms/teamsfx-m365-apps-prerequisites)
> Please note that after you enrolled your developer tenant in Office 365 Target Release, it may take couple days for the enrollment to take effect.
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teamsfx-cli)

### Getting Started

Follow below instructions to get started with this application template for local debugging.

#### Test your application with Visual Studio Code

1. Press `F5` or use the `Run and Debug Activity Panel` in Visual Studio Code.
1. Select a target Microsoft application where the message extension runs: `Debug in Teams`, `Debug in Outlook` and click the `Run and Debug` green arrow button.

#### Test your application with TeamsFx CLI
1. Install [ngrok](https://ngrok.com/download) and start your local tunnel service by running the command `ngrok http 3978`.
1. In the `env/.env.local` file, fill in the values for `BOT_DOMAIN` and `BOT_ENDPOINT` with your ngrok URL.
   ```
   BOT_DOMAIN=sample-id.ngrok.io
   BOT_ENDPOINT=https://sample-id.ngrok.io
   ```
1. Executing the command `teamsfx provision --env local` in your project directory.
1. Executing the command `teamsfx deploy --env local` in your project directory.
1. Executing the command `teamsfx preview --env local --m365-host <m365-host>` in your project directory, where options for `m365-host` are `teams` or `outlook`.

### Use this message extension app

This template provides a simple functionality to search for `npm` packages and render the result in [Adaptive Card](https://docs.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/design-effective-cards?tabs=design).

#### Use this app in Teams

- `@mention` Your message extension from the `search box area`.

    ![AtBotFromSearch](https://user-images.githubusercontent.com/11220663/167869365-3828ef85-64f7-43bf-9f75-99d882370154.png)

- `@mention` your message extension from the `compose message area`.

    ![AtBotFromMessage](https://user-images.githubusercontent.com/11220663/167869475-528736fa-d0f1-4bf8-9c23-fdffae984802.png)

- Click the `...` under compose message area, find your message extension.

    ![ComposeArea](https://user-images.githubusercontent.com/11220663/167869578-ce33b2ef-f5f2-4be7-a7a0-57e53b6f7c36.png)

#### Use this app in Outlook

- Click the "More apps" icon under compose email area, find your message extension.

    ![InOutlook](https://user-images.githubusercontent.com/11220663/167869656-20225f14-f982-4e47-8dd0-050285d56853.png)

### References

* [Extend a Teams message extension across Microsoft 365](https://docs.microsoft.com/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension?tabs=manifest-teams-toolkit)
* [Bot Framework Documentation](https://docs.botframework.com/)
* [Teams Toolkit Documentations](https://docs.microsoft.com/microsoftteams/platform/toolkit/teams-toolkit-fundamentals)
* [Teams Toolkit CLI](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-cli)
* [TeamsFx SDK](https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-sdk)
* [Teams Toolkit Samples](https://github.com/OfficeDev/TeamsFx-Samples)
Thanks!