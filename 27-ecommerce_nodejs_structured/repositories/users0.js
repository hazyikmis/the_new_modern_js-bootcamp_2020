const fs = require("fs"); //internal
const crypto = require("crypto"); //internal

class UsersRepository {
  //constructor function ARE NOT ASYNC functions in natural...
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename!");
    }

    this.filename = filename;

    //we are using "sync" version of functions (accessSync & writeFileSync) here because, in constructors its not possible to use async-await structure
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    //Open the file called this.filename
    //Read its content
    //parse the content
    //return the parsed data

    /*
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8"
    });
    //console.log(contents);
    const data = JSON.parse(contents);
    return data;
    */

    //very simplified version, no need extra variables: contents, data, ...
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8"
      })
    );
  }

  async create(attrs) {
    //attrs: {email:"abc@xyz.com", password: "myPassword"}
    //get a random id for this new user/record
    //Get all records from this.filename
    //Add/push new user to records
    //write the updated records back to this.filename

    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    //await fs.promises.writeFile(this.filename, JSON.stringify(records)); //created another function "writeAll" and moved to that function
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2) //2nd parameter is a function could be used when writing to the file (for ex: converting upper case); 3rd parameter is indentation
    );
  }

  randomId() {
    //return Math.random() * 99999999;
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id); //we are not using "this.getOne()", because after finding&changing the record, we are going to write it back

    if (!record) {
      throw new Error(`User with id: ${id} could not be found!`);
    }

    Object.assign(record, attrs); //copies attrs onto records
    //record: { email: 'test2@test.com', password: 'myPassword', id: '34944081', city: "Leuven" }
    //attrs: { email: 'test999@test.com', password: 'notMyPassword', id: '34944081', something:"ok" }
    //after Object.assign:
    //record: {email: 'test999@test.com', password: 'notMyPassword', id: '34944081', city: "Leuven", something:"ok"}

    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      //iterating over a collection/array
      let found = true;
      for (let key in filters) {
        //iterating over a object keys
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

//you can write down code below, and run "node users.js" on the terminal JUST TO TEST the code above quickly
//test-1
//new UsersRepository();

//test-2 (creating users.json if its not exist)
//const repo = new UsersRepository("users.json");

//test-3 (getAll)
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   //await repo.getAll(); //if getAll only console.logs, not returns anything at the beginning
//   const users = await repo.getAll();
//   console.log(users);
// };
// test();

//test-4 (create ne record)
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   await repo.create({ email: "test2@test.com", password: "myPassword" });
//   const users = await repo.getAll();
//   console.log(users);
// };
// test();

//test-5 (getOne)
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   const user = await repo.getOne("8e0dca2e");
//   console.log(user);
// };
// test();

//test-6 (delete)
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   await repo.delete("34944081");
//   const users = await repo.getAll();
//   console.log(users);
// };
// test();

//test-7 (update)
// const test = async () => {
//   const repo = new UsersRepository("users.json");
//   await repo.update("e27b49cc", {
//     email: "test9099099@test.com",
//     city: "Leuven"
//   });
//   const users = await repo.getAll();
//   console.log(users);
// };
// test();

//test-8 (search, getOneBy)
const test = async () => {
  const repo = new UsersRepository("users.json");
  const user = await repo.getOneBy({
    email: "test9099099@test.com",
    password: "myPassword"
  }); //search according to one or more attributes
  console.log(user);
};
test();
