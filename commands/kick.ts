import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the member specified in command"),
  async execute(msg) {
    //determine whether sender is authorized
    //get the permissions that the user has in this channel
    var senderHasPermission = msg.member.roles.cache.some(
      (role) => role.name === "administrator"
    );
    const memberToKick = msg.mentions.members.first();

    //if they do not have the permission to do this, send a message and quit
    if (!senderHasPermission) {
      msg.reply("You do not have permission to kick other members");
      return;
    } else {
      //if the member to kick has a role too high, the command is invalid
      senderHasPermission = !memberToKick.roles.cache.some(
        (role) => role.name === "administrator" || role.name === "adminbots"
      );
      if (!senderHasPermission) {
        msg.reply("You cannot kick an administrator");
        return;
      }
      msg.reply(
        `Successfully kicked: ${memberToKick.user.username}#${memberToKick.user.discriminator}`
      );
    }

    //kick the member
    memberToKick.kick("They deserve it");
  },
};
