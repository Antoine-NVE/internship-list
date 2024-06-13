const mongoose = require('mongoose');

const Company = require('../models/Company');

exports.create = (req, res) => {
    const company = new Company({
        name: req.body.name,
        discovery: req.body.discovery,
        status: req.body.status,
    });

    company
        .save()
        .then(() => res.status(201).json({ message: 'Entreprise créée' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.readAll = (req, res) => {
    Company.aggregate([
        {
            $lookup: {
                from: 'contacts',
                localField: '_id',
                foreignField: 'companyId',
                as: 'contacts',
            },
        },
    ])
        .then((companies) => res.status(200).json(companies))
        .catch((error) => res.status(400).json({ error }));
};

exports.readOne = (req, res) => {
    Company.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id),
            },
        },
        {
            $lookup: {
                from: 'contacts',
                localField: '_id',
                foreignField: 'companyId',
                as: 'contacts',
            },
        },
        {
            $limit: 1,
        },
    ])
        .then((companies) => {
            // aggregate() retourne toujours un array, on garde donc seulement l'index 0
            const company = companies[0];
            res.status(200).json(company);
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.update = (req, res) => {
    Company.updateOne(
        { _id: req.params.id },
        {
            name: req.body.name,
            discovery: req.body.discovery,
            status: req.body.status,
        }
    )
        .then(() => res.status(200).json({ message: 'Entreprise modifiée' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
    Company.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Entreprise supprimée' }))
        .catch((error) => res.status(400).json({ error }));
};
