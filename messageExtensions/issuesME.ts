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

    // Get issues for this query
    async handleTeamsMessagingExtensionQuery (
        context: TurnContext,
        query: MessagingExtensionQuery
        ): Promise<MessagingExtensionResponse> {

        const REPO = "https://github.com/pnp/teams-dev-samples";

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

                const templateJson = require('./issuesCard.json');
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