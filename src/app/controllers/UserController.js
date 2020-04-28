import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const { id, email } = await User.create(req.body);

        return res.json({
            user: {
                id,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id } = await user.update(req.body);

        return res.json({
            id,
            email,
        });
    }

    async list(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }
}

export default new UserController();
