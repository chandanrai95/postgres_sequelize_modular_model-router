import { STRING } from 'sequelize';
import { schema } from '../configServer';
import { addInstance } from '../app/helper/ModelInstanceHelper';

const PostsSchema = {
    title : {
        type: STRING,
        allowNull: false,
    },
    description : {
        type: STRING,
        allowNull: false,
    }
}

export default function(app){
    const  instance=app.sequelizeClient.define(schema.POSTS, PostsSchema);
    addInstance(schema.POSTS, instance)
}