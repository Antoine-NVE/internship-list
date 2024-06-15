const mongoose = require('mongoose');

const Company = require('../models/Company');
const Contact = require('../models/Contact');

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
    Company.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name,
            discovery: req.body.discovery,
            status: req.body.status,
        }
    )
        .then((company) => {
            if (!company) {
                res.status(404).json({ error: 'Entreprise inexistante' });
            } else {
                res.status(200).json({ message: 'Entreprise modifiée' });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
    mongoose
        .startSession()
        .then((session) => {
            // On crée une transaction pour s'assurer que tout soit supprimé en même temps
            session.startTransaction();

            // On supprime les contacts dans la transaction
            Contact.deleteMany({ companyId: req.params.id })
                .session(session)
                .then(() => {
                    // On supprime l'entreprise dans la transaction
                    Company.findOneAndDelete({ _id: req.params.id })
                        .session(session)
                        .then((company) => {
                            // On vérifie que l'entreprise existe bien
                            if (!company) {
                                session.abortTransaction().then(() => {
                                    session.endSession();
                                    res.status(404).json({ error: 'Entreprise inexistante' });
                                });
                            } else {
                                // On exécute la transaction
                                session.commitTransaction().then(() => {
                                    session.endSession();
                                    res.status(200).json({ message: 'Entreprise et contacts supprimés' });
                                });
                            }
                        })
                        // Erreur au niveau de la suppression de l'entreprise
                        .catch((error) => {
                            session.abortTransaction().then(() => {
                                session.endSession();
                                res.status(400).json({ error });
                            });
                        });
                })
                // Erreur au niveau de la suppression des contacts
                .catch((error) => {
                    session.abortTransaction().then(() => {
                        session.endSession();
                        res.status(400).json({ error });
                    });
                });
        })
        // Erreur au niveau de la création de session
        .catch((error) => res.status(500).json({ error }));
};
