import { STRING } from 'sequelize';
import { schema } from '../configServer';
import { addInstance } from '../app/helper/ModelInstanceHelper';
const UserSchema = {
    firstname: {
        type: STRING,
        allowNull: false,
    },
    lastname: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        // validate: {
        //     isEmail: true,
        // }
        allowNull: false
    }
}

export default function(app){
    const instance=app.sequelizeClient.define(schema.USERS, UserSchema);
    addInstance(schema.USERS,instance);
}