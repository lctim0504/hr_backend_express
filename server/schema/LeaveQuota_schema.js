import Joi from 'joi';

export const employeeSchema = Joi.object({
    employee_id: Joi.string().required(),
    on_board_date: Joi.date().required(),
    special_quota: Joi.number().integer().required(),
    funeral_quota: Joi.number().integer().required(),
    marriage_quota: Joi.number().integer().required(),
    prenatal_quota: Joi.number().integer().required(),
    maternity_quota: Joi.number().integer().required(),
    remark: Joi.string().allow(null),
});
