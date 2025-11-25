// import * as fs from "fs";

// http://localhost:3000/api/postcontact

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
import * as fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const dir = path.join(process.cwd(), "contactdata");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const files = fs.readdirSync(dir);
      const filename = `contact-${Date.now()}.json`;

      fs.writeFileSync(
        path.join(dir, filename),
        JSON.stringify(
          {
            ...req.body,
            id: filename,
            createdAt: new Date().toISOString(),
          },
          null,
          2
        )
      );

      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully!",
        id: filename,
      });
    } catch (error) {
      console.error("File system error:", error);
      res.status(500).json({
        success: false,
        message: "Error submitting form. Please try again.",
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
