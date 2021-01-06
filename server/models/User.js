let getUserTemplate = function (parameters,extras) {
    if ((!parameters.username || !parameters.name)) {
        return null;
    }
    let template = {};
    for (let key in parameters) {
        switch (key) {
            case 'username':
            case 'name':
            case 'email':
            case 'age':
                template[key] = (parameters[key]).trim();
                break;
        }
    }

    if (extras !== null && !template.hasOwnProperty('password')) {
        //the hashed form of password
        template.password = extras.password;
    }
    return template;
};

module.exports = {
    getUserTemplate: getUserTemplate,
};
