function checkBody(form, fields) {
    let response = true ; 

    for (let i in fields) {
        if (form[fields[i]] === '' || form[fields[i]] === undefined) {
            response = false;
            break
        }
    }

    return response

}


module.exports = {checkBody}