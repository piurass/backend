/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

import Blockchain from '../models/Blockchain';
import User from '../models/User';

import ChainApi from '../../services/ChainApi';

class PatientController {
    async store(req, res) {
        const { userId } = req;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User ID not found' });
        }

        const json = {
            user: userId,
            public_key: user.public_key,
            data: req.body,
        };

        const { baseUrl } = ChainApi.init();

        try {
            const { data } = await axios.post(
                `${baseUrl}/add_transaction`,
                json
            );

            try {
                await Blockchain.create({
                    id_user: userId,
                    id_block: data.index,
                    id_type: 'patients',
                });
            } catch (error) {
                console.log('Err Blockchain---->');
                console.log(error);
            }

            return res
                .status(201)
                .json({ user: userId, index: data.index, type: 'patients' });
        } catch (error) {
            console.log('Err add_transaction---->');
            console.log(error);
        }

        return res.status(400).json({ error: 'Error add_transaction' });
    }

    async listId(req, res) {
        const { id } = req.params;
        const id_type = 'patients';

        if (!id) {
            return res.status(400).json({ error: 'Id not informed' });
        }

        // Usado para descriptografar o transactions
        // const { private_key } = await User.findOne({ where: { id } });

        const blockchain = await Blockchain.findOne({
            where: { id_user: id, id_type },
            attributes: ['id_block'],
        });

        if (!blockchain) {
            return res.status(400).json({ error: 'Id block not found' });
        }

        const { baseUrl } = ChainApi.init();

        try {
            const { data } = await axios.get(
                `${baseUrl}/get_block/${blockchain.id_block}`
            );

            // TODO: Avaliar pois retorno do transactions virá criptografado

            const objArr = data.block.transactions;

            for (const prop in objArr) {
                if (typeof objArr[prop].data.patients !== 'undefined') {
                    return res.status(200).json(objArr[prop].data.patients);
                }
            }
        } catch (error) {
            console.log('Err get_block');
            console.log(error);
        }

        return res.status(204).json({ status: 'Blockchain not found' });
    }
}

export default new PatientController();
