import { default as axios } from "axios";
import * as ACData from "adaptivecards-templating";
import { 
    CardFactory,
    TurnContext,
    MessagingExtensionQuery,
    MessagingExtensionResponse
} from "botbuilder";
import GithubIssue from "../model/githubIssue";

class IssuesME {

    public readonly ME_NAME = "issuesQuery";

    // Get suppliers given a query
    async handleTeamsMessagingExtensionQuery (
        context: TurnContext,
        query: MessagingExtensionQuery
        ): Promise<MessagingExtensionResponse> {

        try {
            const response = await axios.get(
                `https://api.github.com/repos/pnp/teams-dev-samples/issues`
            );

            const attachments = [];
            const results = response.data.filter(i => i.title.toLowerCase().includes(query.parameters[0].value.toLowerCase()));
            results.forEach((issue: GithubIssue) => {

                // Clean up the value for presentation
                issue.created_at = new Date(issue.created_at).toLocaleDateString();
                issue.updated_at = issue.updated_at ? new Date(issue.updated_at).toLocaleDateString() : "n/a";
                issue.closed_at = issue.closed_at ? new Date(issue.closed_at).toLocaleDateString() : "n/a";
                issue.body = issue.body.length > 100 ? issue.body.substring(0, 100) + "..." : issue.body;
                issue.dialog_url =
                    `https://teams.microsoft.com/l/task/${process.env.TEAMS_APP_ID}?url=${process.env.BOT_ENDPOINT}/issueDialog.html&height=400&width=600&title=Issue&completionBotId=${process.env.BOT_ID}`;
//                    `https://teams.microsoft.com/l/task/${process.env.TEAMS_APP_ID}?url=${issue.html_url}&height=400&width=600&title=Issue&completionBotId=${process.env.BOT_ID}`;

                const templateJson = issue.pull_request ?
                    require('./IssuesWithPR.json') :
                    require('./issuesCard.json');
                const template = new ACData.Template(templateJson);
                const resultCard = template.expand({
                    $root: issue
                });

                const itemAttachment = CardFactory.adaptiveCard(resultCard);
                let previewAttachment = CardFactory.thumbnailCard(issue.title, [issue.user.avatar_url]);

                const attachment = { ...itemAttachment, preview: previewAttachment };
                attachments.push(attachment);
            });

            return {
                composeExtension: {
                    type: "result",
                    attachmentLayout: "list",
                    attachments: attachments,
                }
            };

        } catch (error) {
            console.log(error);
        }
    };

}

export default new IssuesME();