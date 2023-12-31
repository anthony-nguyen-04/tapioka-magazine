import express, { Request, Response } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";

// import { fileURLToPath } from "url";
// import path, { dirname } from "path";
import { allowedOrigins } from "./allowedOrigins.js";
import { html } from "./html.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

interface IEmailRequestBody {
  name: string,
  email: string,
  subject: string,
  message: string
}

interface IEmailRequest extends Request {
  body: IEmailRequestBody
}

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const port = Number(process.env.PORT) || 3001;

const app = express();

// app.use(cors({
//   origin: allowedOrigins
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(express.static("../frontend/build"));

app.post("/email", async (req: IEmailRequest, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message; 

    const data = await resend.emails.send({
      from: "TAPIOKA CONTACT FORM <tapioka@resend.dev>",
      to: ["ouaasa.magazine@gmail.com"],
      subject,
      html:
        `
        <strong> NAME: ${name}</strong> <br/>
        <strong> EMAIL: ${email}</strong> <br/>
        <strong> MESSAGE: ${message}</strong> <br/>
        `
    });

    res.status(200).send({data});
  } catch (error) {
    res.status(500).send({error});
  }
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "..", "frontend", "build", "index.html"));
// });

app.get("/*", (req, res) => res.type('html').send(html));

app.listen(port, () => {console.log("RUNNING")});