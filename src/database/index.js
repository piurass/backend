import Sequelize from 'sequelize';

// models
import Profile from '../app/models/Profile';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Profile, User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.connection));
    }
}

export default new Database();
