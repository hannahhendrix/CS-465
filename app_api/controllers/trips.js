const mongoose = require('mongoose'); // Register model
const Trip = require('../models/travlr'); // ✅ This *is* your model


// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
  try {
      const q = await Trip.find({}).exec();
      return res.status(200).json(q);
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsFindByCode = async(req, res) => {
  try {
      const q = await Trip.find({ code: req.params.tripCode }).exec();
      if (!q || q.length === 0) {
          return res.status(404).json({ message: "Trip not found" });
      }
      return res.status(200).json(q);
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
};


const tripsAddTrip = async(req, res) => {
  try {
      const trip = await Trip.create({
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
      });
      return res.status(201).json(trip);
  } catch (err) {
      return res.status(400).json(err);
  }
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
          { code: req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          { new: true } // Return the updated document
        ).exec();
    
        if (!updatedTrip) {
          return res.status(404).json({ message: 'Trip not found.' });
        }
    
        return res.status(200).json(updatedTrip);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    };


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};