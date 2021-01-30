const { expect, assert } = require("chai");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Rule validation", async () => {
  it("should call base ", async () => {
    const res = await chai.request(app).get("/");
    expect(res.statusCode).to.equal(200);
  });

  it("should return valid data ", async () => {
    const res = await chai.request(app).get("/");
    expect(res.body.data.name).to.equal("Deji Odetayo");
    expect(res.body.data.email).to.equal("dejiodetayo@gmail.com");
  });

  it("should throw an error If a required field isn't passed", async () => {
    const res = await chai
      .request(app)
      .post("/validate-rule")
      .send({
        data: {
          name: "John Gill",
          age: 67,
          status: "Married",
          children: 10,
        },
      });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("rule is required.");
  });

  it("should throw an error If a field is of the wrong type ", async () => {
    const res = await chai
      .request(app)
      .post("/validate-rule")
      .send({
        rule: "ruler",
        data: {
          name: "John Gill",
          age: 67,
          status: "Married",
          children: 10,
        },
      });

    expect(res.body.status).to.equal("error");
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("rule should be an object.");
  });

  it("should throw an error If an invalid JSON payload is passed", async () => {
    const res = await chai.request(app).post("/validate-rule").send(Hello);
    expect(res.body.status).to.equal("error");
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("Invalid JSON payload passed.");
  });
});
