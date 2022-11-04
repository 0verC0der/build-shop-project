import mongoose from 'mongoose'
// Модель даних інструменту
const toolModel = new mongoose.Schema({
        title:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('tool', toolModel);