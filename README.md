# lego-word-3d-modeller
Create a 3D printable Lego style model from a given word or sentence

## Setup

### Create list of bricks from text
* Install [Anaconda](https://www.anaconda.com/download/#macos) so you have a full Jupyter notebook environment.
* Open 'Anaconda Navigator' and run JupyterLab.
* Open TextToBricks.ipynb in JupyterLab.
* Execute all code blocks in TextToBricks to set up necessary helper functions
* Change text of last command to the text you want rendered
```Python
GetBricksFromText("Tesla\nP100D")
```
* Execute the block with GetBricksFromText then copy the json text after it fully completes.


### Render list of bricks into 3D printable .stl
* Paste the json text block from above step immediately after the "var bricks =" in the brick_maker.js file.
* In a browser, open [Openjscad](https://openjscad.org/#).
* Drag your brick_maker.js file into the bottom file load section of openjscad.
* After your 3D model renders, click the "Generate stl" button then download the stl and print it.
