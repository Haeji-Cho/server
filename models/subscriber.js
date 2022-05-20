module.exports = (sequelize, Sequelize) => {
    const Course = require("./course")(sequelize, Sequelize);
    class Subscriber extends Sequelize.Model {
        static async findByPKAndUpdate(id, params){
            try{
                let subscriber = await Subscriber.findByPK(id);
                if(subscriber){
                    subscriber = await Subscriber.update(params, {
                        where: {id: id}
                    });
                }
                return subscriber;
            }catch(err){
                console.log(err);
            }
        }
        static async findByPKAndRemove(id){
            try{
                let subscriber = await Subscriber.findByPK(id);
                if(subscriber){
                    subscriber = await Subscriber.destroy({
                        where: {id: id}
                    });
                }
                return subscriber;
            }catch(err){
                console.log(err);
            }
        }
        getInfo(){
            return 'Name: ${this.name} Email: ${this.name} Zip Code: ${this.zipCode}';
        }
    };

    Subscriber.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primatyKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
        }
    },{
        sequelize,
        modelName: 'subscriber'
    });
    return Subscriber;
};

