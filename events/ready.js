const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        setTimeout(() => {
            console.log('\x1b[32m%s\x1b[0m', `| 🎯 Activity successfully set!`);
            client.user.setPresence({
                activities: [{ name: `@yaozuke`, type: ActivityType.Streaming }],
                status: 'idle',
            });
        }, 2000);

        console.log('\x1b[31m[ CORE ]\x1b[0m \x1b[32m%s\x1b[0m', 'Bot Activity Set Successful ✅');
    },
};
