# moonshot-bingo
GitHub Game Off 2020 Game Jam Contribution - Moonshot Theme - Moonshot Bingo Game

# screenshots
<details>
  <summary>game screenshots</summary>
  <img src="https://github.com/koreyhinton/moonshot-bingo/blob/audio/docs/Capture_Home.PNG?raw=true" name="capture-astronaut">
  <img src="https://github.com/koreyhinton/moonshot-bingo/blob/audio/docs/Capture_Astronaut.PNG?raw=true" name="capture-astronaut">
  <img src="https://github.com/koreyhinton/moonshot-bingo/blob/audio/docs/Capture_Rocket.PNG?raw=true" name="capture-rocket">
  <img src="https://github.com/koreyhinton/moonshot-bingo/blob/audio/docs/Capture_Spaceship.PNG?raw=true" name="capture-spaceship">
  <img src="https://github.com/koreyhinton/moonshot-bingo/blob/audio/docs/Capture_UFO.PNG?raw=true" name="capture-ufo">
  </details>

# git workflows

The 2 long-running branches are main and audio. Merging these branches is required to create the full game.

The main branch has all the code and text assets while audio has non-text assets.

## merging branches together

To get the full game merge the main branch on top of audio, and override any change conflicts in audio with main's changes:

```
git clone https://github.com/koreyhinton/moonshot-bingo moonshot-bingo__full
cd moonshot-bingo__full
git fetch origin
git checkout audio
git merge -X theirs main
```

## Example: merge\* a text/code asset from the audio branch into the main branch (where it belongs)

```
# bring down repo if needed
git clone https://github.com/koreyhinton/moonshot-bingo
cd moonshot-bingo

# when changes are ready in audio bring them locally
git checkout audio
git pull origin audio

# checkout main and stage the file changes from audio
git checkout main
git pull origin main
git checkout audio -- cards/audio/README.md cards/bingo.js  # https://stackoverflow.com/a/1355990
git diff --staged
git commit -m "audio file merge message"
```

\* this isn't a true git merge, however it does a manual file merge



## Example: checkout just the code for viewing (main branch only)

```
git clone -b main --single-branch https://github.com/koreyhinton/moonshot-bingo
```

## Example: compose the full game in a temp branch

```
# bring down repo if needed
git clone https://github.com/koreyhinton/moonshot-bingo

# pull latest if needed
git checkout main
git pull origin main

git checkout audio
git pull origin audio

git checkout -b temp # branching off of audio
git merge main  # merging in audio
```

