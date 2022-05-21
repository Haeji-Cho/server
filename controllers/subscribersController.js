const { rmSync } = require("fs");
const { NOW } = require("sequelize");

const db = require("../models/index"),
Subscriber = db.subscriber,
Course = db.Course,
getSubscriberParams = body => {
    return {
        name: body.name,
        email: body.email,
        zipCode: parseInt(body.zipCode)
    };
};

module.exports = {
    index: async(req, res, next) => {
        try {
            let subscribers = await Subscriber.findAll();
            res.locals.subscribers = subscribers;
            next();
        }
        catch(error){
            console.log('Error fetching subscribers: ${error.message}');
            next(error);
        };
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: async(req, res, next) => {
        let subscriberParams = getSubscriberParams(req.body);
        try{
            let subscriber = await Subscriber.create(subscriberParams);
            res.locals.redirect = "/subscribers";
            res.locals.subscriber = subscriber;
            next();
        }catch(error){
            console.log('Error saving subscriber: ${error.message}');
            next(error);
        };
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: async(req, res, next) => {
        try{
            let subscriberId = req.params.id;
            let subscriber = await Subscriber.findByPk(subscriberId);
            res.locals.subscriber = subscriber;
            next();
        }catch(error) {
            console.log('Error fetching subscriber by ID: ${error.message}');
            next(error);
        };
    },
    showView: async(req,res) => {
        let subscriberId = req.params.id;
        let subscriber = await Subscriber.findByPk(subscriberId)
        res.render("subscribers/show", {subscriber: subscriber});
    },
    edit: async(req, res, next)=> {
        try {
            let subscriberId = req.params.id;
            let subscriber = await Subscriber.findByPk(subscriberId);
            res.render("subscribers/edit", {
                subscriber: subscriber
            });
        }catch(error){
            console.log('Error fetching subscriber by ID: ${error.message}');
            next(error);
        };
    },
    update: async(req, res, next) => {
        let subscriberId = req.params.id,
        subscriberParams = getSubscriberParams(req.body);
        console.log(subscriberParams);
        try{
            let subscriber = await Subscriber.findByPKAndUpdate(subscriberId, subscriberParams);
            res.locals.redirect = '/subscribers/${subscriberId}';
            res.locals.subscriber = subscriber;
            next();
        }catch(error) {
            console.log('Error updating subscriber by ID: ${error.messge}');
            next(error);
        };
    },
    delete: async(req, res, next) => {
        let subscriberId = req.params.id;
        try{
            let subscriber = await Subscriber.findByPKAndRemove(subscriberId);
            res.locals.redirect = "/subscriber";
            next();
        }catch(error){
            console.log('Error deleting subscriber by ID: ${error.message}');
            next();
        };
    }
};
