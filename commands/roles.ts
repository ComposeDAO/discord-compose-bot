import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Replies with roles that user can set."),
  async execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("member")
        .setLabel("Member")
        .setStyle("PRIMARY"),

      new MessageButton()
        .setCustomId("contributor")
        .setLabel("Contributor")
        .setStyle("PRIMARY")
    );

    await interaction.reply({
      content: "Select a button to add your role: ",
      components: [row],
    });
  },
};
