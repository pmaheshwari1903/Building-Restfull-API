import Joi from 'joi';
import BaseDto from '../../../common/dto/base.dto.js';

class resetPasswordDto extends BaseDto{
    static schema = Joi.object({
        token : Joi.string().required(),
        resetPassword : Joi.string().min(8).required()
    })
}

export default resetPasswordDto