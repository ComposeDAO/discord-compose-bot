import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("approve")
    .setDescription(
      "Approve [merge_request | doc | work_item]"
    ),
  async execute(interaction) {
    await interaction.reply({
      content: "Not yet implemented!",
      ephemeral: true,
    });
  },
};
