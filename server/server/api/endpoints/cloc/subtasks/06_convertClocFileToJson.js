////////////////// IMPORTS /////////////////////

const fs = require('fs'),
      config = require('@config'),
      Log = require('@log');

///////// GET TREE FROM CLOC OUTPUT //////////

/**
 * Convert a simple json object into another specifying children as an array
 * Works recursively
 *
 * example input:
 * { a: { b: { c: { size: 12 }, d: { size: 34 } }, e: { size: 56 } } }
 * example output
 * { name: a, children: [
 *   { name: b, children: [
 *     { name: c, size: 12 },
 *     { name: d, size: 34 }
 *   ] },
 *   { name: e, size: 56 }
 * ] } }
 */

function getChildren(json) {
  var children = [];
  if (json.language) return children;
  for (var key in json) {
    var child = { name: key };
    if (typeof json[key].size !== 'undefined') {
      // value node
      child.size = json[key].size;
      child.language = json[key].language;
    } else {
      // children node
      var childChildren = getChildren(json[key]);
      if (childChildren) child.children = childChildren;
    }
    children.push(child);
    delete json[key];
  }
  return children;
}

// convert the text in a cloc file to JSON
function clocToJson(clocData) {
  var lines = clocData.split("\n");
  lines.shift(); // drop the header line

  var json = {};
  lines.forEach(function(line) {
    var cols = line.split(',');
    var filename = cols[1];
    if (!filename) return;
    var elements = filename.split(/[\/\\]/);
    var current = json;
    elements.forEach(function(element) {
      if (!current[element]) {
        current[element] = {};
      }
      current = current[element];
    });
    current.language = cols[0];
    current.size = parseInt(cols[4], 10);
  });

  json = getChildren(json)[0];
  json.name = 'root';

  return json;
}

function getTree(ctrl) {
  return new Promise((resolve, reject) => {
    // attempt to read the cloc file
    let inFile = `${config.paths.repo(ctrl.repo.repoId)}/${config.cloc.dataFile}`;
    fs.readFile(inFile, 'utf8', function(err, clocData) {
      if (err)
        if (err.code === 'ENOENT')
          // if cloc did not create a file (e.g., because there are no
          // code files in the repo), create dummy json
          resolve({
            name: "root",
            children: []
          });
        else
          reject(new Error(err));
      else
        resolve(clocToJson(clocData));
    });
  });
}

///////// GET IGNORED FILES FROM CLOC OUTPUT //////////

function cleanIgnoredText(ignoredText, folderName) {
  var regex = new RegExp(folderName + '/', 'g');
  return ignoredText.split('\n').slice(1).map(function(line) {
    return line.replace(regex, '');
  }).join('\n');
}

function getIgnored(ctrl) {
  return new Promise((resolve, reject) => {
    let inFile = `${config.paths.repo(ctrl.repo.repoId)}/${config.cloc.ignoredFile}`;
    fs.readFile(inFile, 'utf8', function(err, ignoredText) {
      if (err)
        reject(new Error(err));
      else
        resolve(cleanIgnoredText(ignoredText, ctrl.repo.name));
    });
  });
}

///////////// UNITE TREE AND IGNORED FILES /////////

// converts a cloc file to json
function convertClocFileToJson(ctrl) {
  Log(2, '6. Converting Cloc File To Json');
  ctrl.resp.update('\nConverting cloc file to json...');

  return Promise.all([
    getTree(ctrl),
    getIgnored(ctrl)
  ]).then(([tree, ignored]) => {
    ctrl.repo.cloc = {
      tree,
      ignored
    };
    return ctrl;
  });
}

//////////// EXPORTS //////////////

module.exports = convertClocFileToJson;
