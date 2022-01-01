//Dependencies required for application to run
const   http = require('http'), //Provides the HTTP server functionalities
        path = require('path'), //Provides utilities for working with file and directory paths
        express = require('express'), //Allow app to respond to HTTP requests, defines the routing and renders back the required content
        fs = require('fs'), //Allow to work with the file system: read and write files back
        xmlParse = require('xslt-processor').xmlParse, //Allow to work with XML files
        xsltProcess = require('xslt-processor').xsltProcess, //Allows us to utilize XSL Transformations
        xml2js = require('xml2js'); //XML <-> JSON conversion
        check = require('express-validator'); //Provides input validation

//Creating server
const   router = express(), 
        server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views'))); //Send static content from "views" folder
router.use(express.urlencoded({extended: true})); //Allow the data sent from the client to be encoded in a URL targeting our end point
router.use(express.json()); //Include support for JSON

// Function to read in XML file and convert it to JSON
function XMLtoJSON(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr) {
      if (err) throw (err);
      xml2js.parseString(xmlStr, {}, cb);
    });
};
  
//Function to convert JSON to XML and save it
function JSONtoXML(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
};

//Transforming XML & XSL files into a text/html document
router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('SkyBlueSmartHome.xml', 'utf8'),
        xsl = fs.readFileSync('SkyBlueSmartHome.xsl', 'utf8');

    console.log(xml);
    console.log(xsl);

    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);

    console.log(doc);
    console.log(stylesheet);

    let result = xsltProcess(doc, stylesheet);

    console.log(result);

    res.end(result.toString());

});

//Function to Append a product
router.post('/post/json', function (req, res) {

    function appendJSON(obj) {

        console.log(obj)

        XMLtoJSON('SkyBlueSmartHome.xml', function (err, result) {
            if (err) throw (err);
            
            result.menu.section[obj.sec_n].entry.push({'item': obj.item, 'price': obj.price});

            console.log(JSON.stringify(result, null, "  "));

            JSONtoXML('SkyBlueSmartHome.xml', result, function(err){
                if (err) console.log(err);
            });
        });
    };

    appendJSON(req.body);

    res.redirect('back');

});

//Function to delete a product
router.post('/post/delete', function (req, res) {

    function deleteJSON(obj) {

        console.log(obj)

        XMLtoJSON('SkyBlueSmartHome.xml', function (err, result) {
            if (err) throw (err);
            
            delete result.menu.section[obj.section].entry[obj.entree];

            console.log(JSON.stringify(result, null, "  "));

            JSONtoXML('SkyBlueSmartHome.xml', result, function(err){
                if (err) console.log(err);
            });
        });
    };

    deleteJSON(req.body);

    res.redirect('back');

});

// //Function to check input
// router.post('/post/json', [
//     check('item').isLength({ min: 3 }).trim().escape(),
//     check('price').isNumeric().isLength({ min: 0}),
//   ], (req, res) => {
//     const item  = req.body.name
//     const price = req.body.email
//   }) 

//Telling server to listen for connections on port 3000
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});
