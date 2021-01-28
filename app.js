const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Base url
app.get("/", (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Deji Odetayo",
      github: "@deejaycodes",
      email: "dejiodetayo@gmail.com",
      mobile: "08164428547",
      twitter: "@dejiodetayo",
    },
  });
});

//check REQUIRED FIELDS
//check RULE FIELDS
//check FIELD type(if it matched what is in the model)
//check if JSON Payload is valid - that is key:value pairs
//check if field specified in the rule is missing from the data passed
//if rule is successfuly validated
//if rul validation fails

app.post(
  "/https://deji-rule-validation-api.herokuapp.com/",
  async (req, res) => {
    let { rule, data } = req.body;
    try {
      //Check all required fields passed(i.e rule and data)
      // if (!req.body.rule || !req.body.data) {
      //   return res.json({
      //     message: "[rule and data] are required.",
      //     status: "error",
      //     data: null,
      //   });
      // }

      //Check if rule field is passed
      if (!req.body.rule) {
        return res.json({
          message: "[rule] is required.",
          status: "error",
          data: null,
        });
      }

      //Check if data field is passed
      if (!req.body.data) {
        return res.json({
          message: "[data] is required.",
          status: "error",
          data: null,
        });
      }

      //check if passed rule field is of the correct type
      const ruleField = req.body.rule;
      let isObject = ruleField instanceof Object;
      const ruleFieldType = typeof ruleField;
      console.log(isObject);
      if (!isObject) {
        return res.json({
          message: `[rule] should be an object and not a ${ruleFieldType}`,
          status: "error",
          data: null,
        });
      }

      // //Check if passed data field is of the correct type
      const dataField = req.body.data;
      const isObjectt = dataField instanceof Object;
      const dataFieldType = typeof dataField;
      console.log(isObjectt);
      if (!isObjectt) {
        return res.json({
          message: `[data] should be an Object and not a ${dataFieldType}`,
          status: "error",
          data: null,
        });
      }

      //Check if valid json is passed
      //code here

      //Check if rule is validated or not
      if (rule.condition === "gte") {
        let dataField = rule.field;

        const trueValidate = data[dataField] >= rule.condition_value;
        if (trueValidate) {
          return res.json({
            message: `field ${dataField} successfully validated.`,
            status: "success",
            data: {
              validation: {
                error: "false",
                field: rule.field,
                field_value: data[dataField],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        } else {
          return res.json({
            message: `field ${dataField} failed validation.`,
            status: "error",
            data: {
              validation: {
                error: "true",
                field: rule.field,
                field_value: data[dataField],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
      } else if (rule.condition === "eq") {
        let dataField = rule.field;
        const trueValidate = data[dataField] === rule.condition_value;
        if (trueValidate) {
          return res.json({
            message: `field ${dataField} successfully validated.`,
            status: "success",
            data: {
              validation: {
                error: "false",
                field: rule.field,
                field_value: data[dataField],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.json({
          message: `field ${dataField} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: "true",
              field: rule.field,
              field_value: data[dataField],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      } else if (rule.condition === "neq") {
        let dataField = rule.field;
        const trueValidate = data[dataField] < rule.condition_value;
        if (trueValidate) {
          return res.json({
            message: `field ${dataField} successfully validated.`,
            status: "success",
            data: {
              validation: {
                error: "false",
                field: rule.field,
                field_value: data[dataField],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }
        return res.json({
          message: `field ${dataField} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: "true",
              field: rule.field,
              field_value: data[dataField],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      } else if (rule.condition === "gt") {
        let dataField = rule.field;
        const trueValidate = data[dataField] > rule.condition_value;
        if (trueValidate) {
          return res.json({
            message: `field ${dataField} successfully validated.`,
            status: "success",
            data: {
              validation: {
                error: "false",
                field: rule.field,
                field_value: data[dataField],
                condition: rule.condition,
                condition_value: rule.condition_value,
              },
            },
          });
        }

        return res.json({
          message: `field ${dataField} failed validation.`,
          status: "error",
          data: {
            validation: {
              error: "true",
              field: rule.field,
              field_value: data[dataField],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      }
    } catch (error) {
      console.log("error");
    }
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  );
});
