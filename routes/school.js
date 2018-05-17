var express = require('express');
var router = express.Router();
var school_dal = require('./dal/school_dal');
var address_dal = require('./dal/address_dal');

/* Get user listing. */
router.get('/all', function(req, res, next) {
    school_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('school/school_view_all', {schools: result, school_name: result,
                was_successful_delete: req.query.was_successful_delete});
        }
    })

});

router.get('/add', function(req, res) {
    // passing all the query parameters (req.query to the insert
    //function instead of each individually
    address_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('school/school_add', {address_result: result[0]})
        }
    })
});

router.get('/edit', function(req, res) {

    school_dal.getinfo(req.query.school_id, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('school/SchoolUpdate', {school: result[0][0], address_result: result[1]})
        }
    })
});

router.get('/insert', function(req, res) {
    school_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/school/all');
        }
    });
});

router.get('/update', function(req, res) {
    school_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/school/all');
        }
    });
});
router.get('/delete', function(req, res) {
    school_dal.delete(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/school/all' + "?&was_successful_delete=1");
        }
    });
});
module.exports = router;