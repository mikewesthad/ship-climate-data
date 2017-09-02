# CLIWOC Climate Data Visualization

This repository contains the code to analyze and visualize the Climatological Database for the World's Oceans ([CLIWOC](http://pendientedemigracion.ucm.es/info/cliwoc/), [wiki](https://en.wikipedia.org/wiki/CLIWOC)). This dataset contains ~300k transcribed logbooks from ships in the 1750 - 1850. The repo consists of node scripts for analyzing and building datasets and an electron app for visualizing the data.

![Bound Lines](./bound-lines.png)

## The Data

The CLIWOC dataset includes 287,114 records. Each record represents an individual log and has a number of possible associated variables - including wind direction, wind speed, air temperature, etc. They are listed in `cliwoc 2_1.htm` from [here](https://easy.dans.knaw.nl/ui/datasets/id/easy-dataset:40826/tab/2). For convenience, you can see a version hosted in this repo [here](mikewesthad.com/database-structure.html).

## Installation

Make sure you have [node](https://nodejs.org/en/) installed. Download the files, open a terminal in the repo folder and run:

```
npm install
```


## Running

All the tasks are controlled through `npm` scripts, so you can open up a terminal in the project and run:

1. `npm run start` - this will start up the data visualization electron app using the files in `public/`.
1. `npm run build-ship-paths` - this will parse the full dataset from `cliwoc21.txt` to a JSON file with just the ship's lat/lon information. This repo contains a version of that dataset already (`./data/ship-paths.json`), so you shouldn't need this script.
1. `npm run parse-database-structure` - this will parse the full dataset from `cliwoc21.txt` to a JSON file with a subset of the possible variables. See (or modify) `./lib/build-all-records.js` to manipulate which variables are selected.

Note: the full dataset is >2 gigs, so it is not included in this repository. If you want to run the latter two scripts, you'll need the full dataset. You can download that from [here](https://easy.dans.knaw.nl/ui/datasets/id/easy-dataset:40826/tab/2). You want to download `CLIWOC21.zip`, unzip it and copy `cliwoc21.txt` to the `data` folder in this repository.