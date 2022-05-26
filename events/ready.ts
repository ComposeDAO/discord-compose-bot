module.exports = {
  name: "ready",
  on: true,
  execute(client: { user: { tag: any } }) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
