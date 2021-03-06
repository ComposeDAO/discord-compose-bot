import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("A link to our documentation"),
  async execute(interaction) {
    await interaction.reply({
      content: "https://gitlab.com/Crypteriat/Compose_DAO",
      ephemeral: true,
    });
  },
};
