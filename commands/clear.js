const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clears the server queue",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **เข้าห้องก่อนสิจ๊ะ!**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **มาอยู่ห้องเดียวกันซี่!**");
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **เคลียการเล่นแล้ว!**");
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
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | เข้าห้องก่อนสิจ๊ะ!");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **มาอยู่ห้องเดียวกันซี่!**");
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(interaction, "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");
      player.queue.clear();
      await client.sendTime(interaction, "✅ | **เคลียการเล่นแล้ว!**");
    },
  },
};
