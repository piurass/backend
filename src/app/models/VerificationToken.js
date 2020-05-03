import Sequelize, { Model } from 'sequelize';

// eslint-disable-next-line import/no-cycle
import User from './User';

class VerificationToken extends Model {
    static init(sequelize) {
        super.init(
            {
                userId: Sequelize.INTEGER,
                token: Sequelize.STRING,
            },
            { sequelize, tableName: 'verificationtokens' }
        );

        return this;
    }
}

/*
VerificationToken.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
    foreignKeyConstraint: true,
});
*/

export default VerificationToken;
