# Line Exif

Simple command line tool to extract date from [file].jpg.json and overwrite the original image file meta data using exiftool

## Dependencies

This tool assumes you have [exiftool](https://exiftool.org/) installed in you system and with `exiftool` in you PATH.

### Install on linux
```
sudo apt install libimage-exiftool-perl
```

## Usage

Pass the name of the file as command line argument between quotes if is a path with spaces:
```
node exif.js "/absolute/path to a/file.jpg"
```

You can also create an alias to execute the script from the directory the file is in:
```
// .bashrc
alias e="node ~/pathto/line-exif/exif.js"

// img dir
e example.jpg
```

Or copy the script and execute it form the same folder the image is.

## Cmd gist

Currently the script is executing the following exif command:
```
exiftool "-AllDates=YYYY:MM:DD HH:MM:SS AM" -TimeZone="UTC" -overwrite_original example.jpg" 
```
You can addapt the command accoriding to your needs referecing [exiftool documentation](https://exiftool.org/)

### Issues with WSL
There is a problem using WSL, the file will be written but the metadata won't be updated on the UI if the file is inside WSL mount.
You can pass an absolute path from outside WSL and the script will work as expected.