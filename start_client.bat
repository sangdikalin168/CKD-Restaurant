@echo off
cd /d "D:\CKD-Restaurant\client"
Title "Your needed title should be typed here without quote"
echo Starting React app...
start /min yarn dev

cd /d "D:\CKD-Restaurant\server"
Title "Your needed title should be typed here without quote"
echo Starting React app...
start /min yarn dev

