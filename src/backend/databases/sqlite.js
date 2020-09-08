const Sequelize = require("sequelize");

const sequelize = new Sequelize({
	  dialect: "sqlite",
	  storage: "./database.sqlite"
	});
const users = sequelize.define("user", {
	  name: {
	    type: Sequelize.STRING,
	    allowNull: false
	  },
	  email: {
	    type: Sequelize.STRING,
	    unique: true,
	    allowNull: false
	  },
	  password: {
	    type: Sequelize.STRING,
	    allowNull: false
	  }
	});
	const lists = sequelize.define("list",{

		item: {
			    type: Sequelize.STRING,
			    allowNull: false
			  },
			  edit: {
			    type: Sequelize.BOOLEAN,
			    allowNull: false
			  },
			  done: {
			    type: Sequelize.STRING,
			    allowNull: false
			  },
			user_id: {
				type: Sequelize.INTEGER,
			}
	});
	sequelize
	  .sync()
	  .then(() =>
	    console.log(
	      "users table has been successfully created, if one doesn't exist"
	    )
	  )
	  .catch(error => console.log("This error occurred"));

	module.exports = {
		users: users,
		lists: lists
    };
				