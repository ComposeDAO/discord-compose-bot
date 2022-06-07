import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Link to get verified"),
  async execute(interaction) {
    await interaction.reply({
      content: "https://www.composedao.org/discord/",
      ephemeral: true,
    });
  },
};
