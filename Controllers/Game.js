const { models } = require('../Models');
const Games = models.Game

const getAll = async (req, res) => {
  data = await Games.findAll({ where: { user_id: decodedToken.id } });
  if (data && data.length > 0)
    res.send({ status_code: 200, message: "data found", data: data })
  else
    res.send({ status_code: 400, message: "No data found" })
}

const getById = async (req, res) => {
  id = req.params.id;
  data = await Games.findOne({ where: { id, user_id: decodedToken.id } });
  if (data)
    res.send({ status_code: 200, message: "data found", data: data })
  else
    res.send({ status_code: 400, message: "No data found" })
}

const create = async (req, res) => {
  req.body.user_id=decodedToken.id;
  const result = await Games.create(req.body);
  if (result)
    res.send({ status_code: 200, message: "data inserted successfully", data: result.toJSON() })
  else
    res.send({ status_code: 400, message: "Unable to insert data" })
}

const update = async (req, res) => {
  id = req.body.id;
  const result = await Games.update(req.body, { where: { id, user_id: decodedToken.id } });
  if (result) {
    data = await Games.findByPk(id)
    res.send({ status_code: 200, message: "data updated successfully", data: data })
  }
  else
    res.send({ status_code: 400, message: "Unable to update data" })
}

const _delete = async (req, res) => {
  id = req.params.id;

  result = await Games.destroy({
    where: { id, user_id: decodedToken.id }
  });
  if (result)
    res.send({ status_code: 200, message: "Data deleted successfully" })
  else
    res.send({ status_code: 400, message: "Unable to delete data" })
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
}