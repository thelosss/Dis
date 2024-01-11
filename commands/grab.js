const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Saves the current song to your Direct Messages",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
run: async (client, message, args, { GuildDB }) => {
  let player = await client.Manager.get(message.guild.id);
  if (!player) return client.sendTime(message.channel, "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");
  if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **เข้าห้องก่อนสิจ๊ะ!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **มาอยู่ห้องเดียวกันซี่!!**");
   message.author.send(new MessageEmbed()
   .setAuthor(`เซฟเพลง`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("RANDOM")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`⌛ เวลา: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
  .addField(`🎵 ศิลปิน: `, `\`${player.queue.current.author}\``, true)
  .addField(`▶ เล่นอยู่:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 บันทึกที่:`, `<#${message.channel.id}>`)
  .setFooter(`เปิดโดย: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: ส่งข้อความหาคุณไม่ได้เนื่องจากปิด DM**")
    })    

    client.sendTime(message.channel, "✅ | **ส่งข้อความหาคุณแล้วดูใน DM ได้เลย!**")
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
    const user = client.users.cache.get(interaction.member.user.id);
    const member = guild.members.cache.get(interaction.member.user.id);
    let player = await client.Manager.get(interaction.guild_id);
    if (!player) return client.sendTime(interaction, "❌ | **ไม่มีเพลงที่เล่นขณะนี้...**");
    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **เข้าห้องก่อนสิจ๊ะ!.**");
    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **มาอยู่ห้องเดียวกันซี่!**");
    try{
    let embed = new MessageEmbed()
      .setAuthor(`เซฟเพลง: `, client.user.displayAvatarURL())
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`**${player.queue.current.title}**`)
      .addField(`⌛ เวลา: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
      .addField(`🎵 ศิลปิน: `, `\`${player.queue.current.author}\``, true)
      .addField(`▶ เล่นอยู่:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
        }play ${player.queue.current.uri}\``)
      .addField(`🔎 บันทึกที่:`, `<#${interaction.channel_id}>`)
      .setFooter(`เปิดโดย: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      }))
      user.send(embed);
    }catch(e) {
      return client.sendTime(interaction, "**:x: ส่งข้อความหาคุณไม่ได้เนื่องจากปิด DM**")
    }

    client.sendTime(interaction, "✅ | **ส่งข้อความหาคุณแล้วดูใน DM ได้เลย!**")
  },
  },
};