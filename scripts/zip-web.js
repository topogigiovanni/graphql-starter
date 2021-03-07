const file_system = require("fs");
const archiver = require("archiver");

const output = file_system.createWriteStream("../dist/web.zip");
const archive = archiver("zip");

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed.",
  );
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory("../dist/web/", false);

archive.finalize();
