# gates
- Overview and data visualization website for the Gates project
- Config repo here: https://github.com/betterweekdays/gatespage

## local installation

To get the Gates site working locally:
1. clone the config repo
2. run git submodule update to install the hugo theme
3. run hugo server -D for a local copy

## update hosted site

The site is hosted on Github at https://betterweekdays.github.io/gates/

1. Clone this repo
2. Navigate to the config repo
3. Publish with hugo from config repo to public repo hugo -d [path from gatespage to gates]. If they are in the same directory, it would be hugo -d ../gates
