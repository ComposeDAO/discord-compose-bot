import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contribute")
    .setDescription("Contribute to [work_item] (Not yet implemented!)"),
  async execute(interaction) {
    await interaction.reply({
      content: "Not yet implemented!",
      ephemeral: true,
    });
  },
};
