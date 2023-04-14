import Joi from 'joi';

//基本欄位
export const leaveRecordSchema = Joi.object({
  seq: Joi.number().integer(),
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().required(),
  leave_type_id: Joi.number().integer().required(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
  hr_permit: Joi.boolean().allow(null),
  sv_permit: Joi.boolean().allow(null),
  permit_time: Joi.date().allow(null),
  create_time: Joi.date().allow(null),
});
//創建時的參數
export const createLeaveRecordSchema = Joi.object({
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().optional(),
  leave_type_id: Joi.number().integer().required(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
});
//更新時的參數
export const updateLeaveRecordSchema = Joi.object({
  hours: Joi.number().required(),
  permit_id: Joi.string().required(),
  hr_permit: Joi.boolean().required(),
  permit_time: Joi.date().required(),
  sv_permit: Joi.boolean().required(),
});
//大量更新時的參數 
export const updateBulkLeaveRecordSchema = Joi.object({
  seq: Joi.number().integer().required(),
  sv_permit: Joi.boolean(),
  hr_permit: Joi.boolean(),
  permit_time: Joi.date(),
  permit_id: Joi.string().required(),
});