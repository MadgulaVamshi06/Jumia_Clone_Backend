const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword; 
    } catch (error) {
        console.log("error", error); 
        throw new Error("Error hashing password"); 
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log("error", error); 
        throw new Error("Error comparing password"); 
    }
}

// Export the functions
module.exports = { hashPassword, comparePassword };
