// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Project.vendor = Project.name + "-" + Project.version;

Shell.mkdirRecursivelyIfNotExists("archive");

// Self
if (Shell.fileExists("archive/" + Project.vendor + ".7z")) {
	if (Shell.getFileSize("archive/" + Project.vendor + ".7z") > 16) {
		return;
	};
	Shell.removeFile("archive/" + Project.vendor + ".7z");
};

Console.writeLn("curl --insecure --location https://github.com/g-stefan/vendor-" + Project.name + "/releases/download/v" + Project.version + "/" + Project.vendor + ".7z --output archive/" + Project.vendor + ".7z");
exitIf(Shell.system("curl --insecure --location https://github.com/g-stefan/vendor-" + Project.name + "/releases/download/v" + Project.version + "/" + Project.vendor + ".7z --output archive/" + Project.vendor + ".7z"));
if (Shell.getFileSize("archive/" + Project.vendor + ".7z") > 16) {
	return;
};
Shell.removeFile("archive/" + Project.vendor + ".7z");

// Source
runInPath("archive", function() {
	webLink = "https://www.7-zip.org/a/lzma2107.7z";
	if (!Shell.fileExists(Project.vendor + ".7z")) {
		exitIf(Shell.system("curl --insecure --location " + webLink + " --output " + Project.vendor + ".7z"));
	};
	exitIf(Shell.system("7z x " + Project.vendor + ".7z -aoa -o" + Project.vendor));
	Shell.removeFile(Project.vendor + ".7z");
	exitIf(Shell.system("7z a -mx9 -mmt4 -r- -sse -w. -y -t7z " + Project.vendor + ".7z " + Project.vendor));
	forceRemoveDirRecursively(Project.vendor);
});
