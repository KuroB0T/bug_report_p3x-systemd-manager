const Watchdog = require('p3x-systemd-manager').watchdog;
const settings = require('./settings.json');
const watchdog = Watchdog(settings);
watchdog.run();
