import "dotenv/config";

module.exports = {
  name: "interactionCreate",
  on: true,
  async execute(interaction, client) {
    if (interaction.isButton()) {
      const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID;
      const CONTRIBUTOR_ROLE_ID = process.env.CONTRIBUTOR_ROLE_ID;

      const member = interaction.member;
      if (interaction.customId === "member") {
        interaction.guild.roles
          .fetch(MEMBER_ROLE_ID)
          .then((role) => {
            member.roles.add(role);
            interaction.reply(`Successfully added member role`);
          })
          .catch(console.error());
      }

      if (interaction.customId === "contributor") {
        interaction.guild.roles
          .fetch(CONTRIBUTOR_ROLE_ID)
          .then((role) => {
            member.roles.add(role);
            interaction.reply(`Successfully added contributor role`);
          })
          .catch(console.error());
      }
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
