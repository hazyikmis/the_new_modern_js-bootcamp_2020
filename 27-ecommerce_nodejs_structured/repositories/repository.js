const fs = require("fs"); //internal
const crypto = require("crypto"); //internal

module.exports = class Repository {
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

  async create(attrs) {
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);

    return attrs;
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
};
