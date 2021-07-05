@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo -^> clean vendor-lzma

if exist output\ rmdir /Q /S output
if exist temp\ rmdir /Q /S temp
if exist include\ rmdir /Q /S include

