const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Stop the music and leave the voice channel",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **เข้าห้องก่อนสิจ๊ะ!**");
    if (!player) return client.sendTime(message.channel,"❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");
    await client.sendTime(message.channel,":notes: | **ตัดการเชื่อมต่อ!**");
    await message.react("✅");
    player.destroy();
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **เข้าห้องก่อนสิจ๊ะ!**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **เข้าห้อง ${guild.me.voice.channel} ถึงจะใช้คำสั่งได้.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **ตัดการเชื่อมต่อ!**"
      );
    },
  },
};
