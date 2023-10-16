import {
  TeamsActivityHandler,
  TurnContext,
  MessagingExtensionQuery,
  MessagingExtensionResponse,
} from "botbuilder";
import issuesME from "./messageExtensions/issuesME";
import pullRequestME from "./messageExtensions/pullRequestME";

export interface DataInterface {
  likeCount: number;
}

export class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }

  public async handleTeamsMessagingExtensionQuery(
    context: TurnContext,
    query: MessagingExtensionQuery
  ): Promise<MessagingExtensionResponse> {

    console.log (`handleTeamsMessagingExtensionQuery: ${query.parameters[0].name} for ${query.parameters[0].value} from user ${context.activity.from.name}`);
    switch (query.parameters[0].name) {
      case issuesME.ME_NAME:
        return await issuesME.handleTeamsMessagingExtensionQuery(context, query);
      case pullRequestME.ME_NAME:
        return await pullRequestME.handleTeamsMessagingExtensionQuery(context, query);
      default:
        return null;
    }
  }

}
