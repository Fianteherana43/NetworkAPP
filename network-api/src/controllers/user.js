const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé !', userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Email incorrect' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Email incorrect' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


