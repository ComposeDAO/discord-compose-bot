import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Current poll for [proposal] (Not yet implemented!)"),
  async execute(interaction) {
    await interaction.reply({
      content: "Not yet implemented!",
      ephemeral: true,
    });
  },
};
