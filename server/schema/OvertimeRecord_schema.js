import Joi from 'joi';

export const overtimeRecordSchema = Joi.object({
  seq: Joi.number().integer(),
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().required(),
  leave_type_id: Joi.number().integer().required(),
  reason: Joi.string(),
  sub_name: Joi.string(),
  permit: Joi.boolean(),
  permit_time: Joi.date(),
  create_time: Joi.date(),
});