@echo off
REM Serve the Intellect LE static site
set PORT=%APP_PORT%
if "%PORT%"=="" set PORT=3000
echo Serving Intellect LE on port %PORT%
python -m http.server %PORT%
