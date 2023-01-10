// Created by Grigore Stefan <g_stefan@yahoo.com>
// Public domain (Unlicense) <http://unlicense.org>
// SPDX-FileCopyrightText: 2022-2023 Grigore Stefan <g_stefan@yahoo.com>
// SPDX-License-Identifier: Unlicense

Fabricare.include("vendor");

messageAction("make");

if (Shell.fileExists("temp/build.done.flag")) {
	return;
};

if (!Shell.directoryExists("source")) {
	exitIf(Shell.system("7z x -aoa archive/" + Project.vendor + ".7z"));
	Shell.rename(Project.vendor, "source");
};

Shell.mkdirRecursivelyIfNotExists("output");
Shell.mkdirRecursivelyIfNotExists("output/bin");
Shell.mkdirRecursivelyIfNotExists("output/include");
Shell.mkdirRecursivelyIfNotExists("output/lib");
Shell.mkdirRecursivelyIfNotExists("temp");

var outputPath=Shell.getcwd()+"/output";

runInPath("source/CPP/7zip/Bundles/Alone7z", function() {
	exitIf(Shell.system("nmake"));
	if (Platform.name.indexOf("win64") >= 0) {
		Shell.copyFile("x64/7zr.exe", outputPath+"/bin/7zr.exe");
	} else {
		Shell.copyFile("x86/7zr.exe", outputPath+"/bin/7zr.exe");
	};
	Shell.filePutContents("temp/build.done.flag", "done");
});
