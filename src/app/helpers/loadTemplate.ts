import { compile } from "handlebars";
import fs from "fs";

const loadTemplate = (fileName, context) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`src/templates/${fileName}`, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let template = compile(data);
        let html    = template(context);
        resolve(html);
      }
    });
  });
};


export default loadTemplate;