var fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function mergeValues(values, content) {
    for(var key in values) {
        content = content.replaceAll("{{" + key + "}}", values[key]);
    }
    return content;
}

function view(templateName, values, response) {
    var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding : "utf8"});
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents + "\n");
};

module.exports.view = view;