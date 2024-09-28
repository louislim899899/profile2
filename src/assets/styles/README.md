# SCSS STRUCTURE

This scss style structure is referring to directory structure called 7-1 pattern (7 folders 1 file) 
https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4


## FOLDER EXPLANATION

### Abstract

Hold sass tools, helpers files, variables, functions, mixins & config files
Helper only, which don't output any CSS when compiled.

### Base

Hold boilerplate for projects including standard styles such as typography which commonly
used throughout the project

### Components

Styles for button, carousels, sliders, widgets. Most compact folders

### Layout

Styles for layout, eg: header, footer, navigation & grid

### Pages

Styles that specific to individual pages

### Themes

Not likely used. Hold files that create project specific themes, eg: alternate color scheme

### Vendors

Third party code from external libraries & framework
eg: Normalize, Boostrap, jQueryUI.

*Good practice to create a new folder named vendors-extensions/ & name any files after the vendors they overwrite*

eg: vendor-extensions/_bootstrap.scss to override some style in _bootstrap.scss

(Overriding vendor files directly is not a good idea)

### Main.scss

This file should only contain your imports!