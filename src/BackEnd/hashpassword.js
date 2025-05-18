const bcrypt = require('bcrypt');

const password = "Sanjay016"; // Replace with the actual password you want to hash

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Hashed password:", hashedPassword);
    }
});
