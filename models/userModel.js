let users = [
    { id: 1, firstName: 'Chitta', lastName: 'Mohapatra', email: 'chitta@example.com', mobile: '1234567890' },
    { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobile: '0987654321' }
];

class UserModel {
    // Get all users
    static getAllUsers() {
        return users;
    }

    // Find user by credentials (for login)
    static findUser(firstName, lastName, email) {
        return users.find(u => u.firstName === firstName && u.lastName === lastName && u.email === email);
    }

    // Add a new user
    static addUser(firstName, lastName, email, mobile) {
        const newUser = { id: users.length + 1, firstName, lastName, email, mobile };
        users.push(newUser);
        return newUser;
    }

    // Update user by ID
    static updateUser(id, email, mobile) {
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex !== -1) {
            users[userIndex].email = email || users[userIndex].email;
            users[userIndex].mobile = mobile || users[userIndex].mobile;
            return users[userIndex];
        }
        return null;
    }

    // Delete user by ID
    static deleteUser(id) {
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex !== -1) {
            return users.splice(userIndex, 1)[0];
        }
        return null;
    }
    //search
    static searchUser(query){
        return users.filter(u=>u.email==query||u.mobile===query);
    }

}

module.exports = UserModel;
