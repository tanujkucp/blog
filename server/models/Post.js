let getPostTemplate = function (parameters, extras) {
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
    if (extras !== null && !template.hasOwnProperty('username')) {
        //the hashed form of password
        template.username = extras.username;
    }
    if (extras !== null && !template.hasOwnProperty('created_at')) {
        //the hashed form of password
        template.created_at = extras.created_at;
    }
    return template;
};


module.exports = {
    getPostTemplate: getPostTemplate
};
