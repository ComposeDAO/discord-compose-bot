import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Sends suggestion to the suggestion channel"),
  async execute(interaction, client) {
    const SUGGESTION_CHANNEL_ID = process.env.SUGGESTION_CHANNEL_ID;
    var suggestion, suggestionChannel;

    interaction.reply("Thanks for the suggestion!");
    suggestion = interaction.content.replace("!suggestion", "");

    suggestionChannel = client.channels.cache.get(SUGGESTION_CHANNEL_ID);

    await suggestionChannel
      .send("Suggestion: " + suggestion)
      .then(function (message) {
        message.react("✅");
        message.react("❌");
      });
  },
};
