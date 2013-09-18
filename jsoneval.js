#!/usr/bin/env node

function main() {
    var ARGV = process.argv;

    if (ARGV.length < 3) {
        console.error("Usage: jsoneval (<expression>|<transform.js>) [filename]");
        process.exit(1);
    }

    var transformFn = createTransform(ARGV[2]);

    readInput(ARGV[3], function (input) {
        var result = JSON.stringify(transformFn(input));
        if (typeof result === 'string') {
            console.log(result.replace(/%/g, "%%"));
        }
    });
}

function createTransform(argument) {
    var fs = require('fs');

    var transformScript = argument;
    if (fs.existsSync(transformScript)) {
        transformScript = fs.readFileSync(transformScript, "utf8");
    }
    return makeTransformFn(transformScript);
}

// limit variable exposure
function makeTransformFn(script) {
    return function transform(input) {
        return eval(script);
    };
}

function readInput(file, callback) {
    var fs = require('fs');

    var inputStream;
    if (file) {
        inputStream = fs.createReadStream(file, {encoding: 'utf8'});
    } else {
        inputStream = process.stdin;
        inputStream.resume();
        inputStream.setEncoding('utf8');
    }

    var json = "";
    inputStream.on('data', function (chunk) { json += chunk; });
    inputStream.on('end', function () {
        callback(JSON.parse(json));
    });
}

// go!
main();
