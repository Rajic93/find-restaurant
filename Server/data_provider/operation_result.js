var createResponseObject = function(status, data) {
    return {
        statusCode : status,
        repsonseData : data
    }
}
module.exports.createResponseObject = createResponseObject;