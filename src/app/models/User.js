import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        const prvt_key = 'mega';
        const public_key = 'hack';
        super.init(
            {
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                private_key: Sequelize.STRING,
                public_key: Sequelize.STRING,
                id_profile: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: 'users',
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
                user.private_key = await bcrypt.hash(
                    user.password + prvt_key,
                    8
                );
                user.public_key = await bcrypt.hash(
                    user.password + public_key,
                    8
                );
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
