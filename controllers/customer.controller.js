const db = require("../models");
const config = require("../config/auth.config");
const Customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if(!req.body.fullname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    const customer = {
        fullname:      req.body.fullname,
        email:      req.body.email,
        phone:   req.body.phone,
        address:    req.body.address
    }

    Customer.create(customer).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the Tutorial"
        })
    })
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const fullname = req.query.fullname;
    var condition = fullname ? { fullname: { [Op.iLike]: `%${fullname}%` } } : null;

    Customer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Customer.destroy({
        where:{id: id}
    }).then(num=>   {
        if(num ==1) {
        res.send({
            message: "Tutorial was deleted successfully!"
        });
        } else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}.  Maybe Tutorial was not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} Tutorials were deleted successfull`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while removing all tutorials."
        })
    })
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Customer.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err=> {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving tutorials."
            })
        })
};