const db = require('../database/queries')

const getUsers = async () => {
  return (await db.query('SELECT * FROM users ORDER BY id ASC')).rows
};

const UpdateUsers  = async(id, name, email) => {
  console.log("Valor id:", id);
  let linhasAfetadas = (await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])).rowCount;

  console.log('Linhas afetadas:', linhasAfetadas);
  return;
};


  module.exports = {
    getUsers,
    UpdateUsers,
  }

