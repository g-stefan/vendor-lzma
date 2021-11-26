@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

set ACTION=%1
if "%1" == "" set ACTION=make

echo - %BUILD_PROJECT% ^> %1

goto cmdXDefined
:cmdX
%*
if errorlevel 1 goto cmdXError
goto :eof
:cmdXError
echo "Error: %ACTION%"
exit 1
:cmdXDefined

if not "%ACTION%" == "make" goto :eof

call :cmdX xyo-cc --mode=%ACTION% --source-has-archive lzma

if not exist output\ mkdir output
if not exist output\bin\ mkdir output\bin
if not exist temp\ mkdir temp

set INCLUDE=%XYO_PATH_REPOSITORY%\include;%INCLUDE%
set LIB=%XYO_PATH_REPOSITORY%\lib;%LIB%
set WORKSPACE_PATH=%CD%
set WORKSPACE_PATH_BUILD=%WORKSPACE_PATH%\temp

if exist %WORKSPACE_PATH_BUILD%\build.done.flag goto :eof

pushd "source\CPP\7zip\Bundles\Alone7z"
nmake
if errorlevel 1 goto makeError
if "%XYO_PLATFORM%" == "win64-msvc-2022" goto win64
if "%XYO_PLATFORM%" == "win32-msvc-2022" goto win32

if "%XYO_PLATFORM%" == "win64-msvc-2019" goto win64
if "%XYO_PLATFORM%" == "win32-msvc-2019" goto win32

if "%XYO_PLATFORM%" == "win64-msvc-2017" goto win64
if "%XYO_PLATFORM%" == "win32-msvc-2017" goto win32
goto :eof

:win32
copy /Y /B "x86\7zr.exe" "%WORKSPACE_PATH%\output\bin\7zr.exe"
goto buildDone

:win64
copy /Y /B "x64\7zr.exe" "%WORKSPACE_PATH%\output\bin\7zr.exe"
goto buildDone

:buildDone
popd
echo done > %WORKSPACE_PATH_BUILD%\build.done.flag
goto :eof

:makeError
popd
echo "Error: make"
exit 1
