const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;

    const [user] = await connection('users')
      .insert({ name, email, password })
      .returning('*');

    return res.json(user);
  }
};