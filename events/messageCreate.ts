import { Permissions } from "discord.js";

export const PREFIX = process.env.PREFIX || "!";

module.exports = {
  name: "messageCreate",
  on: true,
  async execute(msg, client) {
    // if (msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
    //   console.log("This member has the ability to kick");
    // }

    // if (
    //   msg.member.permissions.has(
    //     Permissions.FLAGS.KICK_MEMBERS,
    //     Permissions.FLAGS.BAN_MEMBERS
    //   )
    // ) {
    //   console.log("This member has the ability to kick and ban");
    // }

    // if (msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS, false)) {
    //   console.log("This member can kick without allowing admin to override");
    // }

    if (!msg.content.startsWith(PREFIX)) return;

    let command = msg.content.substring(1);
    //get only the first word which is the command
    command = command.split(" ")[0];

    if (!client.commands.has(command)) return;

    try {
      await client.commands.get(command).execute(msg, client);
    } catch (error) {
      console.error();
      await msg.reply({ content: "there was an error!", ephemeral: true });
    }
  },
};
