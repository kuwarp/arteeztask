
const User= require('../DB/authSchema')
const bcrypt = require('bcrypt');

const login= async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addUser= async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={
    addUser,
    login

}