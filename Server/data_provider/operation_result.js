var createResponseObject = function(status, data) {
    return {
        statusCode : status,
        responseData : data
    }
}
module.exports.createResponseObject = createResponseObject;