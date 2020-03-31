const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the posts below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/reactpostcontent"
);

const postSeed = [
    {
        title: "Infection Control",
        username: "annonymous",
        body: "The best wasys to control infection while either working in a residential facility or in the home/ community starts with the carer. Being aware about their own safety and the safety of others. Washing their hands is a simple but effective measure. ",
        date: new Date(Date.now())
    },
    {
        title: "What shoes are best to wear",
        username: "annonymous",
        body: "A good shoe is comfortable, water proof and provides good support",
        date: new Date(Date.now())
    },
    {
        title: "Where should I work? Residential or Community?",
        username: "annonymous",
        body: "What are the benefits and disadvantages or working in an aged care facility compared to working in the community?",
        date: new Date(Date.now())
    },
    {
        title: "Where can I find the Aged Care Quality Standards?",
        username: "annonymous",
        body: "Go the the following website for the Aged Care Quality Standards in Australia. https://www.agedcarequality.gov.au/providers/standards",
        date: new Date(Date.now())
    },
    {
        title: "Who do I talk to to report abuse of the elderly?",
        username: "annonymous",
        body: "First duty of care is to report to your supervisor and you should complete an incident report. Usually this is enough for your employer to start the ball rolling. However, if it is for someone like an elderly neighbour you should try talking to them first then ",
        date: new Date(Date.now())
    },
    {
        title: "What education is required to work in Aged Care?",
        username: "annonymous",
        body: "It depends on where in Aged care you want to work. The minimum requirement is a certificate III, but can be expanded to a diploma, bachelors degree, masters degree, PhD ",
        ddate: new Date(Date.now())
    },
];

db.Post
    .remove({})
    .then(() => db.Post.collection.insertMany(postSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });