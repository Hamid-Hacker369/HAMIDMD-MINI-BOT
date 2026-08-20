const settings = require("../settings");
async function aliveCommand(sock, chatId, message) {
    try {
        const message1 = `*🤖 𝗛𝗞𝗧𝗘𝗖𝗛𝗚𝗢𝗗⚡🦠💫 𝐈𝐬 *\n\n` +`
╔══════════════════════╗
║♨️ 𝗛𝗞𝗧𝗘𝗖𝗛𝗚𝗢𝗗♨️ ║
║  Multi-Device Bot        ║
║   CAETOR : 𝐇𝐊𝐓𝐄𝐂𝐇𝐆𝐎𝐃🥵   ║
╚══════════════════════╝*`;

        await sock.sendMessage(chatId, {
            text: message1,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426521603889@newsletter',
                    newsletterName: ' 𝗛𝗞𝗧𝗘𝗖𝗛𝗚𝗢𝗗',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'Bot is alive and running!' }, { quoted: message });
    }
}

module.exports = aliveCommand;