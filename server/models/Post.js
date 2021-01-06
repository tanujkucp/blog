let getPostTemplate = function (parameters) {
    if ((!parameters.title || !parameters.body)) {
        return null;
    }
    let template = {};
    for (let key in parameters) {
        switch (key) {
            case 'title':
            case 'body' :
            case 'image' :
                template[key] = (parameters[key]).trim();
                break;
            case 'tags':
                template[key] = parameters[key];
                break;
        }
    }
    return template;
};


module.exports = {
    Post: getPostTemplate
};
