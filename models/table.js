const Sequelize = require('sequelize')
const moment = require('moment')

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid:{
                type: Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            userpw:{
                type: Sequelize.STRING(40),
                allowNull : false,
            },
            username:{
                type: Sequelize.STRING(40),
                allowNull : false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'User',
            tableName:'users',
            charset: 'utf8',
            collate:'utf8_general_ci'
        })
    }
}

module.exports = {
    User
}