import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("react")
    .setDescription("Reacts with emoji"),
  async execute(msg) {
    msg
      .react("😀")
      .then(() => msg.react("👍"))
      .then(() => msg.react("🤔"))
      .catch((error) =>
        console.error("One of the emojis failed to react:", error)
      );
  },
};
