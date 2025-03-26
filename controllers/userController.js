const UserModel = require('../models/userModel');

class UserController {
    // Login
    static async login(req, res) {
        const { firstName, lastName, email } = req.body;

        // Validation
        const nameRegex = /^[a-zA-Z]{3,}$/;
        if (!firstName || !lastName || !nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return res.status(400).json({ success: false, message: 'First name and last name must be at least 3 characters and alphabets only' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        const user = UserModel.findUser(firstName, lastName, email);
        if (user) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }

    // Add user
    static async addUser(req, res) {
        const { firstName, lastName, email, mobile } = req.body;
        const newUser = UserModel.addUser(firstName, lastName, email, mobile);
        res.status(201).json({ message: 'User added', user: newUser });
    }

    // Get all users
    static async getAllUsers(req, res) {
        const users = UserModel.getAllUsers();
        res.status(200).json(users);
    }

    // Update user
    static async updateUser(req, res) {
        const { id } = req.params;
        const { email, mobile } = req.body;
        const updatedUser = UserModel.updateUser(id, email, mobile);

        if (updatedUser) {
            res.status(200).json({ message: 'User updated', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    // Delete user
    static async deleteUser(req, res) {
        const { id } = req.params;
        const deletedUser = UserModel.deleteUser(id);

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    static  async searchUser (req,res){
        const{query}=req.query;
        const results=UserModel.searchUser(query);
        res.status(200).json(results);
    }
}

module.exports = UserController;
