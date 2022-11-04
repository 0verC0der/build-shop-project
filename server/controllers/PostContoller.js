import toolModel from '../models/Tool.js';

//функція знаходження одного інструменту
export const getOne = async (req, res) => {
    try{ 
        const toolID = req.params.id; 
        toolModel.findOne(
            {
                _id: toolID
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Сталася помилка'
                    });           }
                if (!doc) {
                    return res.status(404).json({
                     message: 'Такого товару не існує'
                    });  
                }
                res.json(doc);
            }
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Сталася помилка'
        });
    }

}; 
//функція виведення всіх інструментів
export const getAll = async (req, res) => {
    try{
        const toolsID = await toolModel.find();

        res.json(toolsID);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Невдалось знайти інструмент'
        });
    };
};

export const update = async (req, res) => {
    try {
        const toolID = req.params.id;
        
        await toolModel.updateOne(
            {
                _id: toolID
            },
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                amount: req.body.amount,
                img: req.body.img
            }
        );
        res.json({
            message: "Данні успішно оновлені"
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: 'Невдалось оновити данні'
        });
    }
}

//функція видалення інструменту
export const remove = async (req, res) => {
    const toolID = req.params.id;
    toolModel.findOneAndDelete(
        {
        _id: toolID
        }, 
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Невдалось видалити товар'
                });
            }
            if (!doc) {
                console.log(err);
                return res.status(400).json({
                    message: 'Такого товару не існує'
                });
            }
            res.json({
                message: 'Товар успішно видалено'
            })
        }
    )
};

//функція додавання інструменту
export const create = async (req, res) => {
    try{
        const doc = new toolModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            amount: req.body.amount,
            img: req.body.img
        });

        const createTool = await doc.save();

        res.json(createTool);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Невдалось додати інструмент'
        });
    }
};