const Contact = require('../models/Contact');

exports.create = (req, res) => {
    const contact = new Contact({
        object: req.body.object,
        date: req.body.date,
        content: req.body.content,
        companyId: req.body.companyId,
    });

    contact
        .save()
        .then(() => res.status(201).json({ message: 'Contact créé' }))
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.readOne = (req, res) => {
    Contact.findOne({ _id: req.params.id })
        .then((contact) => res.status(200).json(contact))
        .catch((error) => res.status(400).json({ error }));
};

exports.update = (req, res) => {
    Contact.updateOne(
        { _id: req.params.id },
        {
            object: req.body.object,
            date: req.body.date,
            content: req.body.content,
        }
    )
        .then(() => res.status(200).json({ message: 'Contact modifié' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
    Contact.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Contact supprimé' }))
        .catch((error) => res.status(400).json({ error }));
};
