Step 1:
Copy to /editor from:
https://github.com/mrdoob/three.js/tree/dev/editor
version: 0.84.0

Step 2:
Copied threejs examples/js into threeexamples/js

Step 3:
Replace instances of ../examples to threeexamples in index.html and Menubar.File.js

Step 4:
Copied build file from 0.84.0 and placed in /editor root (using npm installed three doesn't work)

Step 5:
In index.html, replace js/Menubar.Status.js with custom/Menubar.Status.js
