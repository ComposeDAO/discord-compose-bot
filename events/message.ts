const PREFIX = process.env.PREFIX || "!";

module.exports = {
  name: "message",
  on: true,
  async execute(msg, client) {
    if (!msg.content.startsWith(PREFIX)) return;

    const command = msg.content.substring(1);

    if (!client.commands.has(command)) return;

    try {
      await client.commands.get(command).execute(msg);
    } catch (error) {
      console.error();
      await msg.reply({ content: "there was an error!" });
    }
  },
};
