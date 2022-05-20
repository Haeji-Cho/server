module.exports = (sequelize, Sequelize) => {
    const Course = require("./course")(sequelize, Sequelize);
    const Subscriber = require("./User")(sequelize, Sequelize);
    class User extends Sequelize.Model {
        static async findByPKAndUpdate(id, params){
            let user = await User.findByPK(id);
            if(user){
                user = await User.update(params, {
                    where: {id: id}
                });
            }
            return user;
            
        }
        static async findByPKAndRemove(id){
            let user = await User.findByPK(id);
            if(user){
                user = await User.destroy({
                     where: {id: id}
                });
            }
            return user;
        }
    };

    User.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primatyKey: true
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        fullname: {
            type: Sequelize.STRING,
            get(){
                return '${this.firstname}, ${this.lastname}';
            }
        },
        email: {
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: true
        },
        zipCode: {
            type: Sequelize.INTEGER,
            validate: {
                min: 10000,
                max: 99999
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        SubscriberAccount: {
            type: Sequelize.INTEGER,
            refernces: {
                model: Subscriber,
                key: 'id'
            }
        }
    },
    {
        hooks: {
            beforeSave: async (user) =>{
                if(user.SubscriberAccount === undefined){
                    try {
                        let subscriber = await Subscriber.findOne({
                            where: {
                                email: user.email
                            }
                    });
                        console.groupCollapsed(subscriber);
                        user.SubscriberAccount = subscriber;
                    }catch(err){
                        console.log('Error in connecting Subscriber: ${err.message}'
                        );
                    }
                }
                else{
                    console.log(user.SubscriberAccount);
                }
            }
        },
        sequelize,
        modelName: 'user'
    });
    return User;
};

