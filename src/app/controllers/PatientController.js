import axios from 'axios';

import Blockchain from '../models/Blockchain';
import User from '../models/User';

import ChainApi from '../../services/ChainApi';

class PatientController {
    async store(req, res) {
        const { userId } = req;
        const { public_key } = await User.findByPk(userId);

        const json = { user: userId, public_key, data: req.body };

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
}

export default new PatientController();
