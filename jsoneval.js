function main() {
    var fs = require('fs');
    var ARGV = process.argv;

    if (ARGV.length < 3) {
        console.error("Usage: jsoneval (<expression>|<transform.js>) [filename]");
        process.exit(1);
    }

    var transform = ARGV[2];
    if (fs.existsSync(transform)) {
        transform = fs.readFileSync(transform, "utf8");
    }
    var apply = makeApply(transform);

    var inputStream;
    if (ARGV[3]) {
        inputStream = fs.createReadStream(ARGV[3], {encoding: 'utf8'});
    } else {
        inputStream = process.stdin;
        inputStream.resume();
        inputStream.setEncoding('utf8');
    }

    var stdinJson = "";
    inputStream.on('data', function (chunk) { stdinJson += chunk; });
    inputStream.on('end', function () {
        apply(JSON.parse(stdinJson));
    });
}

// the core algorithm
function makeApply(script) {
    return function apply(input) {
        // input will be referenced by script
        console.log(JSON.stringify(eval(script)));
    };
}

// go!
main();
