const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Base url
app.get("/", (req, res) => {
  res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Deji Odetayo",
      github: "@deejaycodes",
      email: "dejiodetayo@gmail.com",
      mobile: "08164428547",
    },
  });
});

app.post("/validate-rule", async (req, res) => {
  let { rule, data } = req.body;
  try {
    //Check if rule field is passed
    if (!req.body.rule) {
      return res.status(400).json({
        message: "rule is required.",
        status: "error",
        data: null,
      });
    }

    //Check If the field specified in the rule object is missing from the data passed.
    let count = 0;
    for (let element in data) {
      if (rule.field === element) {
        count++;
      }
    }
    if (count > 0) {
      console.log("correct");
    } else {
      return res.status(400).json({
        message: `field ${rule.field} is missing from data.`,
        status: "error",
        data: null,
      });
    }

    //Check if data field is passed
    if (!req.body.data) {
      return res.status(400).json({
        message: "data is required.",
        status: "error",
        data: null,
      });
    }

    //check if passed rule field is of the correct type
    let ruleField = req.body.rule;
    let isObject = ruleField instanceof Object;
    if (!isObject) {
      return res.status(400).json({
        message: "rule should be an object.",
        status: "error",
        data: null,
      });
    }

    //Check if passed data field is of the correct type
    const dataField = req.body.data;
    const isObjectt = dataField instanceof Object;
    if (!isObjectt) {
      return res.status(400).json({
        message: "data should be an object.",
        status: "error",
        data: null,
      });
    }

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
    res.status(400).json({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  );
});

module.exports = app;
