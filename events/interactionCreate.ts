export const PREFIX = process.env.PREFIX || "!";

module.exports = {
  name: "interactionCreate",
  on: true,
  async execute(interaction, client) {
    if (interaction.isButton()) {
      interaction.reply("you clicked " + interaction.customId);
      console.log(interaction);
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error();
      await interaction.reply({
        content: "There was an error while executing this command!!",
        ephemeral: true,
      });
    }
  },
};
