const Company = require('../models/Company');
const Contact = require('../models/Contact');

exports.create = (req, res) => {
    // Il faut vérifier l'intégrité du companyId, ainsi que l'existance de l'entreprise
    Company.findOne({ _id: req.params.companyId })
        .then((company) => {
            if (!company) {
                // Si l'entreprise n'existe pas
                res.status(400).json({ error: 'Entreprise inexistante' });
            } else {
                const contact = new Contact({
                    object: req.body.object,
                    date: req.body.date,
                    content: req.body.content,
                    companyId: req.params.companyId,
                });

                contact
                    .save()
                    .then(() => res.status(201).json({ message: 'Contact créé' }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        // Si le companyId n'est pas correct (caractères manquants par exemple)
        .catch((error) => res.status(400).json({ error }));
};

exports.readOne = (req, res) => {
    Contact.findOne({ _id: req.params.id })
        .then((contact) => {
            if (!contact) {
                res.status(404).json({ error: 'Contact inexistant' });
            } else {
                res.status(200).json(contact);
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.update = (req, res) => {
    Contact.findOneAndUpdate(
        { _id: req.params.id },
        {
            object: req.body.object,
            date: req.body.date,
            content: req.body.content,
        },
        {
            runValidators: true,
        }
    )
        .then((contact) => {
            if (!contact) {
                res.status(404).json({ error: 'Contact inexistant' });
            } else {
                res.status(200).json({ message: 'Contact modifié' });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
    Contact.findOneAndDelete({ _id: req.params.id })
        .then((contact) => {
            if (!contact) {
                res.status(404).json({ error: 'Contact inexistant' });
            } else {
                res.status(200).json({ message: 'Contact supprimé' });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
