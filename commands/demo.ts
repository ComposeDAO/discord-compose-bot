import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("demo")
    .setDescription("A link to a demo for our Gitcoin grant"),
  async execute(interaction) {
    await interaction.reply({
      content:
        "https://www.youtube.com/watch?v=sNyfrrH0odE",
      ephemeral: true,
    });
  },
};
