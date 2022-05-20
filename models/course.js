module.exports = (sequelize, Sequelize) => {
    class Course extends Sequelize.Model {
        static async findByPKAndUpdate(id, params){
            let course = await Course.findByPK(id);
            if(course){
                course = await Course.update(params, {
                    where: {id: id}
                });
            }
            return course;
            
        }
        static async findByPKAndRemove(id){
            try{
                let course = await Course.findByPK(id);
                if(course){
                    course = await Course.destroy({
                        where: {id: id}
                    });
                }
                return course;
            } catch (err){
                console.log(err);
                }
            }
        };
        Course.init({
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
            },
            maxStudents: {
                type: Sequelize.INTEGER, 
                defaultValue: 0,
                min: 0
            },
            cost: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                min: 0
            }
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'course'
        });
        return Course;
    }

