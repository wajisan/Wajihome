

exports.myMsgError = function (res, message, err) {
    return res.status(500).json({
        title: 'Error',
        message: message,
        err: err
    });
}

exports.myMsgErrorClient = function (res, message, err) {
    return res.status(400).json({
        title: 'Error',
        message: message,
        err: err
    });
}

exports.myMsgSuccess = function (res, message) {
    return res.status(200).json({
        title: 'Success',
        message: message,
        //err: err
    });
}
