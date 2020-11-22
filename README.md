# Garlic-Hotel-Search  
```
                    
              ██░░██                  
              ████░░██                
                ██▓▓██                
                ██░░▓▓██              
              ██░░██░░██              
            ██░░░░████░░██            
          ██░░░░░░████░░░░██          
      ████░░░░░░██░░██░░░░░░████      
    ██░░░░░░░░▓▓██░░██▓▓░░░░░░░░██    
  ██░░░░  ░░░░██░░░░░░██░░░░    ░░██                      _ _        
██░░░░  ░░░░▓▓██░░  ░░░░██░░░░    ░░██                   | (_)        
██░░    ░░░░██░░░░  ░░░░▓▓██░░░░  ░░██    __ _  __ _ _ __| |_  ___  
██░░  ░░░░▓▓██░░    ░░░░▓▓██▓▓░░  ░░██   / _` |/ _` | '__| | |/ __|
██░░░░░░░░██░░    ░░░░░░░░▓▓██░░░░░░██  | (_| | (_| | |  | | | (__   
  ██░░░░▓▓██░░    ░░░░░░░░▓▓██▓▓░░██     \__, |\__,_|_|  |_|_|\___| 
  ██▓▓▓▓▓▓██░░░░    ░░░░░░▓▓██▓▓▓▓██      __/ |    
    ██████████░░░░░░░░░░▓▓████████       |___/    
```

## Setup
0. Install node.js and npm, make sure they're on your path.
1. Clone the project to your local machine.
2. Run `Setup.bat` in the root directory, this will install the node packages needed for the backend, the frontend, and build the frontend.
3. Obtain a copy of `databaseCredentials.json` pinned in the discord for sync-mysql or write your own in, save the file at `/source/server/databaseCredentials.json`. You also need to @ethan to request he allows your IP through the database firewall. 
4. There are 3 ways to run the application test, run `/tests/Test.bat`, run npm test from the package.json in `/source/server`, or use the vs code task `Test Server` found in `/.vscode/tasks.json` all of these are just diffrent ways of running `/tests/Test.bat`. To test with good debuging tools you need [the VS code extension for chrome debugging](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and can then use the launch debugging config provided by `/.vscode/launch.json`.


## Layout
#### Root
* **.vscode/ :** VS code tools for advanced debug launching and vs code tasks
* **trashbin/ :** Old files that we may still need to reffrence quickly
* **sandbox/ :** Sandbox for features and packages we want to test
* **source/ :** Code for the application
* **tests/ :** scripts for testing the application 
* **.gitignore :** list of files that shoun't be uploaded to github (api keys, node modules)
* **setup.bat :** batch script to set up node packages for the backend
#### Source
* **source/client/ :** frontend code
* **source/client/package.json :** frontend packages
* **source/client/build/ :** compiled frontend files, do not edit these!
* **source/client/public/ :** frontend page sources and global frontend resources.
* **source/client/src/ :** frontend page code and react components
* **source/server/ :** backend code
* **source/server/package.json :** backend packages
* **source/server/server.js :** backend entrypoint

