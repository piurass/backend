import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import NodeRSA from 'node-rsa';
import sshpk from 'sshpk';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                private_key: Sequelize.TEXT,
                public_key: Sequelize.TEXT,
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

                const key = new NodeRSA({ b: 512 });
                key.generateKeyPair();

                const keyPem = key.exportKey('public');
                const keyPk = sshpk.parseKey(keyPem, 'pem');
                const sshKey = keyPk.toString('ssh');

                user.private_key = key.exportKey('private');
                user.public_key = sshKey;
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
