const fs = require("fs"); //internal
const crypto = require("crypto"); //internal

const util = require("util");
const scrypt = util.promisify(crypto.scrypt);

const Repository = require("./repository");

//class UsersRepository {
class UsersRepository extends Repository {
  async create(attrs) {
    //attrs: {email:"abc@xyz.com", password: "myPassword"}
    //get a random id for this new user/record
    //Get all records from this.filename
    //Add/push new user to records
    //write the updated records back to this.filename

    attrs.id = this.randomId();

    //hashing password - start
    const salt = crypto.randomBytes(8).toString("hex");

    //normally crypto.scrypt function should be called with a callback:
    //crypto.scrypt(attrs.password, salt, 64, (err, buff) => {
    //  const hashed = buff.toString("hex");
    //});

    const buff = await scrypt(attrs.password, salt, 64); //this is the promisified version of "crypto.scrypt"
    //hashing password - end

    //records.push(attrs);
    const record = {
      ...attrs,
      password: `${buff.toString("hex")}.${salt}`
    };
    //salt added to the end of the hashed password: "hashedpwd.salt"
    //console.log(record);

    const records = await this.getAll();
    records.push(record);

    //await fs.promises.writeFile(this.filename, JSON.stringify(records)); //created another function "writeAll" and moved to that function
    await this.writeAll(records);

    //return attrs; //there is a plain password stored in attrs, but not in record
    return record;
  }

  async comparePasswords(saved, supplied) {
    //saved -> password saved in our database: "hashedpwd.salt"
    //supplied -> password (as a plain text) given to us by a user trying to sign in: "pwd"

    // const result = saved.split(".");
    // const hashed = result[0];
    // const salt = result[1];
    const [hashed, salt] = saved.split(".");
    const hashedBuffer = await scrypt(supplied, salt, 64);
    const hashedSupplied = hashedBuffer.toString("hex");
    return hashed === hashedSupplied;
  }
}

//EXPORT METHOD 1 (This method is prone to errors)
//module.exports = UsersRepository;
//IN ANOTHER FILE:
//const UsersRepository = require("./users");
//const repo = new UsersRepository("users.json");

//YET IN ANOTHER FILE:
//const UsersRepository = require("./users");
//const repo = new UsersRepository("user.json"); //notice the error in filename!!!

//EXPORT METHOD 2
module.exports = new UsersRepository("users.json");
//IN ANOTHER FILE:
//const repo = require("./users");

//YET IN ANOTHER FILE:
//const repo = require("./users");
