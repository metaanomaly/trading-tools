#!/usr/bin/env node

const child_process = require("child_process");
const util = require("util");
const exec = util.promisify(child_process.exec);

const yargs = require("yargs");
const replaceInFiles = require("replace-in-files");
const { green } = require("./__colors");

const argv = yargs
    .usage("Usage\n\n  trading-tools <name>")
    .epilog("Copyright @ 2019").argv;

const name = argv._[0];
const package =
    "https://github.com/piecioshka/trading-tools/archive/master.zip";

if (!name) {
    yargs.showHelp();
    process.exit(1);
}

const options = {
    files: [
        `${name}/README.md`,
        `${name}/package.json`,
        `${name}/package-lock.json`,
        `${name}/bin/cli.js`,
    ],
    from: /trading-tools/g,
    to: name,
};

async function isFileExist(name) {
    try {
        await exec(`stat ${name}`);
        return true;
    } catch (ignore) {
        // console.log(ignore);
        return false;
    }
}

const log = (text) => console.info("[+] " + text);
const fail = (text) => console.error("[-] " + text);

function task(command) {
    log("Command: " + command);
    return exec(command);
}

(async () => {
    log(`Creating: ${name}`);
    try {
        const isDirectoryExist = await isFileExist(name);
        if (isDirectoryExist) {
            throw new Error(`Directory exist - ${name}`);
        }
        // Fetch github.com/piecioshka/trading-tools
        await task(`wget ${package} -O trading-tools.zip`);
        await task(`unzip trading-tools.zip`);
        await task(`mv trading-tools-master ${name}`);
        await task(`rm -rf trading-tools.zip`);
        // Replace all "trading-tools" by "NAME"
        await replaceInFiles(options);
        // Git setup & commit
        await task(
            `cd ${name} && git init && git add . && git commit -am "Generate project"`
        );
        log(green("Project created successfully!"));
    } catch (reason) {
        fail(`Project does not created properly: ${reason.message}`);
    }
})();
