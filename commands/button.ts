import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Replies with buttons"),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Primary")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("secondary")
        .setLabel("Secondary")
        .setStyle("SECONDARY")
    );

    await interaction.reply({
      content: "You ran the button command!",
      components: [row],
    });
  },
};
