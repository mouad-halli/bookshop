import Joi from "joi"
import { validator } from "./validator"
import { EMAIL_REGEX, PASSWORD_REGEX, WORLD_CHARACTERS_REGEX } from "../constants/regex"

const updateUserInformationSchema = Joi.object({
    firstname: Joi.string().min(4)
    .regex(WORLD_CHARACTERS_REGEX)
    .max(35)
    .messages({
        "string.pattern.base": '"firstname" must only contain valid characters'
    }),
    lastname: Joi.string().min(4)
    .regex(WORLD_CHARACTERS_REGEX).max(35)
    .messages({
        "string.pattern.base": '"lastname" must only contain valid characters'
    }),
    email: Joi.string().
    regex(EMAIL_REGEX)
    .messages({
        "string.pattern.base": '"email" invalid'
    }),
    isSeller: Joi.boolean()
})

const updateUserPasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(28)
    .regex(PASSWORD_REGEX).required()
    .messages({
        "string.pattern.base": '"newPassword" must contain min 8 characters, 1 symbol, 1 upercase, 1 lowercase and a number'
    }),
    passwordConfirmation: Joi.ref('newPassword')
})

const upsertUserAddressSchema = Joi.object({
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().regex(/^\d{5}(-\d{4})?$/).messages({'string.pattern.base': `"zipCode" invalid Zip Code.`}).required()
})

export const validateUpdateUserInformation = validator(updateUserInformationSchema, { abortEarly: true })
export const validateUpdateUserPassword = validator(updateUserPasswordSchema, { abortEarly: true })
export const validateUpsertUserAddress = validator(upsertUserAddressSchema, { abortEarly: true })