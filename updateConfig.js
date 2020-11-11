const fs = require("fs");

const contents = fs.readFileSync("config.production.json");
const config = JSON.parse(contents);
const externalURL = process.env.url || process.env.RENDER_EXTERNAL_URL;
config.mail.transport = "SMTP";
config.mail.options.service = "Mailgun";
config.mail.options.auth.user = process.env.mail__options__auth__user;
config.mail.options.auth.pass = process.env.mail__options__auth__pass;
if (externalURL) {
  // update the URL in the config
  config.url = externalURL;
  fs.writeFileSync("config.production.json", JSON.stringify(config, null, 2));
}
