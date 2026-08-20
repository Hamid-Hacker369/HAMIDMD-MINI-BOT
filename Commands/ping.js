const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: '𝗖𝗥𝗘𝗔𝗧𝗘 𝗛𝗞𝗧𝗘𝗖𝗛𝗚𝗢𝗗!' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        const botInfo = `
┏━━〔 🤖 𝐇𝐊𝐓𝐄𝐂𝐇𝐆𝐎𝐃 𝐌𝐃 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⚡💎 〕━━┓
┃                                           ┃
┃   🚀 𝐏𝐢𝐧𝐠        : ${ping} ms  ▰▰▰▰▰▰▰▰▰▰
┃   📡 𝐍𝐞𝐭𝐰𝐨𝐫𝐤     : ${networkSpeed} Mbps
┃   💾 𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞  : ${ramUsage} MB / ${totalRAM} MB
┃   ⏱️  𝐔𝐩𝐭𝐢𝐦𝐞     : ${uptimeFormatted}
┃   🔖 𝐕𝐞𝐫𝐬𝐢𝐨𝐧    : v${settings.version}
┃   👑 𝐏𝐥𝐚𝐧       : 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗨𝗡𝗟𝗜𝗠𝗜𝗧𝗘𝗗
┃   🛡️ 𝐒𝐭𝐚𝐭𝐮𝐬     : 🟢 𝐀𝐥𝐥 𝐒𝐲𝐬𝐭𝐞𝐦𝐬 𝐎𝐧𝐥𝐢𝐧𝐞
┃                                           ┃
┃   ✨ 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬 𝐀𝐜𝐭𝐢𝐯𝐞 ✨
┃   • 𝐍𝐨 𝐋𝐢𝐦𝐢𝐭𝐬  • 𝐏𝐫𝐢𝐨𝐫𝐢𝐭𝐲 𝐀𝐜𝐜𝐞𝐬𝐬
┃   • 𝟗𝟗.𝟗% 𝐔𝐩𝐭𝐢𝐦𝐞 • 𝟐𝟒/𝟕 𝐒𝐮𝐩𝐩𝐨𝐫𝐭
┃                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.trim();

        // Reply to the original message with the bot info
        await sock.sendMessage(chatId, { text: botInfo},{ quoted: message });

    } catch (error) {
        console.error('Error in ping command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get bot status.' });
    }
}

module.exports = pingCommand;
