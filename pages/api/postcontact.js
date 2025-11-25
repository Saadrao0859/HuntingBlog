// import * as fs from "fs";

// // http://localhost:3000/api/postcontact

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     let data = await fs.promises.readdir("contactdata");
//     fs.promises.writeFile(
//       `contactdata/${data.length + 1}.json`,
//       JSON.stringify(req.body),
//       () => {}
//     );
//     res.status(200).json(req.body);
//   } else {
//     res.status(200).json(["allBlogs"]);
//     // name , email, desc, phone
//   }
// }

import { MongoClient } from "mongodb";

// Use local MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/blogdb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let client;

    try {
      console.log("🔗 Connecting to local MongoDB...");
      client = new MongoClient(uri);
      await client.connect();

      const db = client.db("blogdb");
      const collection = db.collection("contacts");

      console.log("📝 Inserting contact data:", req.body);

      const result = await collection.insertOne({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        desc: req.body.desc,
        createdAt: new Date(),
      });

      console.log("✅ Contact saved to MongoDB with ID:", result.insertedId);

      res.status(200).json({
        success: true,
        message: "Thank you for contacting us! We will get back to you soon.",
        id: result.insertedId,
      });
    } catch (error) {
      console.error("❌ MongoDB Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Error submitting form. Please try again.",
      });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
