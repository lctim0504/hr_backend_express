import Joi from 'joi';

export const leaveSchema = Joi.object({
  employee_id: Joi.string().required(),
  on_board_date: Joi.date().required(),
  female: Joi.bool().required()
});
