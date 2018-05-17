var express = require('express');
var router = express.Router();
var resume_dal = require('./dal/resume_dal');
var school_dal= require('./dal/school_dal');



router.get('/all', function(req, res, next) {
    resume_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('resume/resume_view_all', {accounts:result, resume:result});

            //res.render('resume/resume_view_all', {resume: result[0]});
        }
    })

});



router.get('/edit', function(req, res) {

    school_dal.getinfo(req.query.school_id, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/ResumeUpdate', {school: result[0][0], address_result: result[1]})
        }
    })
});


router.get('/add/selectuser', function(req, res) {
    res.render('resume/resume_add');
});

router.get('/add', function(req, res){
    resume_dal.getinfo(req.query.account_id, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('resume/resume_add', {account_id: req.query.account_id, skills: result[0], schools: result[1], companies: result[2]});
        }
    });
});

router.get('/add', function (req, res)
{
    resume_dal.getAlls(req.query.account_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resume_add', {school_result: result[0], skill_result: result[1], company_result: result[2], resume: result[3][0], account_id: req.query.account_id});
        }
    });
});


router.get('/delete', function(req, res) {
    resume_dal.delete(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/resume/all' + "?&was_successful_delete=1");
        }
    });
});
module.exports = router;
