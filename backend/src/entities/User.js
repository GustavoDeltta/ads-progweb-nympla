class User {
    constructor(name, email, password, dob)
    {
        this.id = 0;
        this.name = name;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.role = "user";
    }
}

module.exports = User;