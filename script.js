import { config } from "dotenv";
config();
import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({
  apiKey: process.env.API_KEY, // This is also the default, can be omitted
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "user", content: input },
      {
        role: "system",
        content: "You are an expert in tennis, tennis rackets and tennis strings, you will ask the client what type of game he or she has and depending on the answer you will advice wich racket, string, and string tension he or she should use and why."
      }
    ],
  });
  console.log(res.choices[0].message.content);
  userInterface.prompt();
});
