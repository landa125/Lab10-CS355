var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */

var connection = mysql.createConnection(db.config);

/*exports.getAll = function(callback) {
    // stored procedure to call
    var query = 'select first_name, last_name, resume_name\n' +
        'from account\n' +
        'inner join resume on account.account_id = resume.resume_id;';

    // call the stored procedure
    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
*/
exports.getAll = function(callback) {
    var query = 'select * from resume r join account a on a.account_id = r.account_id;';
    //var query = 'CALL resume_getall';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAlls = function(account_id, callback) {
    var query = 'CALL add_page_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [params.resume_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};