import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {postToolValidation, loginValidation, registerValidation} from './validations.js';

import { checkAuth, handleValidationErrors} from './utils/erector.js';
import { UserController, PostController} from './controllers/erector.js'


mongoose.connect('mongodb+srv://nikita1:wwwwww@cluster0.7yahcpw.mongodb.net/shop?retryWrites=true&w=majority')
.then(() => console.log('DB Connected'))
.catch((err) => {console.log(err)});

const PORT = 4444;

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/upload', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/catalogue', PostController.getAll);
app.get('/catalogue/:id', PostController.getOne);
app.post('/catalogue', checkAuth, postToolValidation, handleValidationErrors, PostController.create);
app.delete('/catalogue/:id', checkAuth, PostController.remove);
app.patch('/catalogue/:id', checkAuth, postToolValidation, handleValidationErrors, PostController.update);  


app.listen(PORT, (err) => {
    if (err){
        return console.log(err);
    }

    console.log(`Server started on port ${PORT}`)
});