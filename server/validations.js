import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Некоректний email').isEmail(),
    body('password', 'Неправильний пароль').isLength({min: 5})
];

export const registerValidation = [
    body('email', 'Некоректний email').isEmail(),
    body('password', 'Неправильний пароль').isLength({min: 5}),
    body('fullName', 'Ім\'я занадто коротке').isLength({min: 3})
];

export const postToolValidation = [
    body('title', 'Некоректна назва').isLength({min: 3}).isString(),
    body('price', 'Ціна не є числом або менше 0').isNumeric(),
    body('amount', 'Цей текст не являєтся числом або менше 0').optional().isNumeric(),
    body('brand', 'Надто коротке ім\'я бренду').optional().isLength({min: 3}).isString(),
    body('model', 'Надто коротке ім\'я моделі').optional().isLength({min: 3}).isString(),
    body('description', 'Не правильний опис').optional().isLength({min: 3}).isString(),
    body('image','Не є ссилкой на картинку').optional().isString()
];