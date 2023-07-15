import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async(m, { conn, usedPrefix, participants, isPrems }) => {
let pp = 'https://i.imgur.com/WHjtUae.jpg'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `El usuario que está mencionando no está registrado en mi base de datos`
try {
pp = await conn.profilePictureUrl(who)
} catch (e) {
} finally {
let { name, limit, lastclaim, registered, regTime, age, premiumTime } = global.db.data.users[who]
let username = conn.getName(who)
let prem = global.prems.includes(who.split `@` [0])
let sn = createHash('md5').update(who).digest('hex')
let str = `┏━━°❀❬ *PERFIL* ❭❀°━━┓
┃
┃• *🔥Nombre🔥 :* ${username} ${registered ? '(' + name + ') ': ''}
┃• *✨Numero✨ :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃• *💢Link💢 :* wa.me/${who.split`@`[0]}${registered ? '\n*🫵Edad🫵:* ' + age + ' años' : ''}
┃• *💎Limite💎 :* ${limit} 𝚄𝚂𝙾𝚂
┃• *®️Registrado®️ :* ${registered ? 'Si': 'No'}
┃• *🤑Premiun💸 :* ${prem ? 'Si' : 'No'}
┃• *#️⃣Numero de Serie#️⃣ :*
┃•${sn}
┗━━━━━━━━━━━━━━`
conn.sendMessage(m.chat, { image: { url: pp }, caption: str }, { quoted: m })
//conn.sendButton(m.chat, str, author, pp, [['𝙼𝙴𝙽𝚄 𝙿𝚁𝙸𝙽𝙲𝙸𝙿𝙰𝙻', '/menu']], m)
}}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
