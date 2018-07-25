const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Users = db.define('users', {

//PERSONAL INFO
  firstName: {
    type: Sequelize.STRING,
    allowNull: false // Unsure if we can allow null
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false // Unsure if we can allow null
  },
  email:{
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING //ADD HOOK
  },

//SECURITY   
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  
//ADDRESS
  userAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userZip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },


//ADMIN STATUS
  isAdmin: {
    type: Sequelize.ENUM("Admin", "notAdmin"),
    defaultValue: "notAdmin"
  },
})

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}



/**
 * classMethods
 */
Users.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Users.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

Users.setFullName = function () {
  this.fullName = this.firstname + " " + this.lastName;
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}



Users.beforeCreate(setSaltAndPassword)
Users.beforeUpdate(setSaltAndPassword)
Users.afterCreate(setFullName)

module.exports = {Users}