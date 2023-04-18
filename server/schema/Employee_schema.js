import Joi from 'joi';

export const employeeSchema = Joi.object({
  employee_id: Joi.string().required(),
  name: Joi.string().required(),
  department_id: Joi.string().required(),
  work_type_id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  isSupervisor: Joi.boolean().required(),
  email: Joi.string().email()
});

export const postEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  department_id: Joi.string().required(),
  work_type_id: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  isSupervisor: Joi.boolean().required(),
  email: Joi.string().email()
});

export const updateEmployeeSchema = Joi.object({
  id: Joi.string(),
  isSupervisor: Joi.boolean().required()
});

