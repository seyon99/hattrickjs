# Hattrick.js

### Library Demo
https://hattrickjs.herokuapp.com/

### Getting Started
In order to use Hattrick.js, users must create a script tag in the head of their HTML file using one of the two following methods:

If the user has the hattrick.js file containing the API saved locally:
<br>
`<script type="text/javascript" src="hattrick.js"></script>`
        
Otherwise, the following code can be used in the head:
<br>
`<script type="text/javascript" src="https://hattrickjs.herokuapp.com/hattrick.js"></script>`
        
Inside the HTML body of any file where the script above was added in the HTML head, the following code can be used within script tags to instantiate a Hattrick object so that the API methods can be called. Alternatively, users can include a reference to Hattrick.js in external javascript files.
```
const hattrick = new Hattrick();
hattrick.newBlankPlayCanvas("Ted Lasso Scoring Special", "#38b000", 1000, 550);
```  
In the above snippet, we made a call to the newBlankPlayCanvas method, but the user may call any of the API methods using the hattrick object.

### Documentation
https://hattrickjs.herokuapp.com/Hattrick.html
