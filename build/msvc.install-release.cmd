@echo off
rem Public domain
rem http://unlicense.org/
rem Created by Grigore Stefan <g_stefan@yahoo.com>

echo - %BUILD_PROJECT% ^> install-release

set INSTALL_PATH=%XYO_PATH_RELEASE%

set PROJECT=%BUILD_PROJECT%

SETLOCAL ENABLEDELAYEDEXPANSION
FOR /F "tokens=* USEBACKQ" %%F IN (`xyo-version --no-bump --get "--version-file=version.ini" %PROJECT%`) DO (
	SET VERSION=%%F
)

set INSTALL_PATH=%INSTALL_PATH%\%PROJECT%-%VERSION%-%XYO_PLATFORM%
set INSTALL_PATH_BIN=%INSTALL_PATH%

rem // ---

call build\msvc.make.cmd
call build\msvc.install.sub.cmd
