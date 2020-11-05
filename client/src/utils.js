const service = {

  // returns an array of all the paths
  // in the given repo
  getFolderPaths: function(repo) {
    var folderPaths = [];

    // generate path strings and totalNode counts
    (function recurse(folder, folderPath) {
      if (folder.children) {
        folderPath += folder.name + '/';

        var total = folder.children.reduce(function(prev, cur) {
          return prev + recurse(cur, folderPath);
        }, 1);

        folderPaths.unshift({
          pathName: folderPath,
          totalNodes: total
        });

        return total;
      } else {
        return 1;
      }

    })(repo, '');

    // take off trailing slashes
    folderPaths.forEach(function(path) {
      path.pathName = path.pathName.slice(0, -1);
    });

    return folderPaths;
  },

  // return the portion of a repo object
  // indicated by the given folderPath
  getFolder: function(repo, folderPath, depth) {
    var folder = repo;
    var props = folderPath.split('/');
    for (var i = 1; i < props.length; i++)  {
      for (var j = 0; j < folder.children.length; j++) {
        if (folder.children[j].name === props[i]) {
          folder = folder.children[j];
          break;
        }
      }
    }

    if (typeof depth === 'undefined')
      return folder;

    // CURRENTLY UNUSED (because depth is always undefined):
    // in case I ever implement a "depth" dropdown,
    // this prunes the folder to the given depth
    var prunedFolder = (function recurse(tree, depth) {
      if (tree.children) {
        if (depth === 0)
          return null;
        else {
          return {
            name: tree.name,
            children: tree.children.map(child => {
              return recurse(child, depth - 1);
            }).filter(child => !!child)
          };
        }
      } else {
        var newTree = {};
        for (var key in tree)
          if (tree.hasOwnProperty(key))
            newTree[key] = tree[key];
        return newTree;
      }
    })(folder, depth);

    return prunedFolder;
  },

  // get an array for all of the languages
  // in the given folder
  getLanguages: function(folder) {
    var languagesObj = {};

    // traverse the given folder and calculate
    // the file and line folders
    (function recurse(node) {

      if (node.language) {
        var lang = node.language;

        if (!languagesObj[lang])
          languagesObj[lang] = {
            files: 0,
            lines: 0
          };

        languagesObj[lang].files++;
        languagesObj[lang].lines += node.size;
      }

      if (node.children)
        node.children.forEach(recurse);

    })(folder);

    // convert the obj to an array
    var languagesArr = [];
    Object.keys(languagesObj).forEach(function(langName, index) {
      languagesObj[langName].language = langName;
      languagesObj[langName].class = 'lang-' + index;
      languagesArr.push(languagesObj[langName]);
    });

    return languagesArr;
  },

  // NOTE: this modifies the languages array
  sortLanguages: function(languages, sortParams) {
    var prop = sortParams.sortCol;
    var sortFactor = sortParams.sortDesc ? 1 : -1;
    languages.sort(function (a, b) {
      return sortFactor * (b[prop] > a[prop] ? 1 : -1);
    });
  },

  // NOTE: this modifies the json object
  applyLanguageColorsToJson: function(json, languages) {
    // set up an object of language colors
    var languageColors = {};
    languages.forEach(function(lang) {
      languageColors[lang.language] = {
        color: lang.color,
        class: lang.class
      };
    });

    // apply colors to nodes
    (function recurse(node) {
      //node.color = node.language ? languageColors[node.language].color : null;
      node.class = node.language ? languageColors[node.language].class : null;
      if (node.children)
        node.children.forEach(recurse);
    })(json);
  },

  centerViz: function() {
    var viz = document.getElementById('visualization'),
        vizHeight = viz.offsetHeight,
        vizWidth = viz.offsetWidth;

    var app = document.getElementsByClassName('app-container')[0],
        appHeight = app.offsetHeight,
        appWidth = app.offsetWidth;

    // handle situation where viz is smaller than viewport
    // create top and left margins
    var topMargin = Math.max(appHeight - vizHeight, 0) / 2.0;
    var leftMargin = Math.max(appWidth - vizWidth, 0) / 2.0;
    viz.style.marginTop = topMargin + 'px';
    viz.style.marginLeft = leftMargin + 'px';

    // viz larger than viewport
    // scroll to the right place
    var scrollTop = (vizHeight - appHeight) / 2.0;
    var scrollLeft = (vizWidth - appWidth) / 2.0;
    app.scrollTop = scrollTop;
    app.scrollLeft = scrollLeft;
  }

};

export default service
