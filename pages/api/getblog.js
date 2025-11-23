//http://localhost:3000/api/getblog?slug=how-to-learn-javaScript
import fs from "fs";

export default async function handler(req, res) {
  fs.readFile(`blogData/${req.query.slug}.json`, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog found" });
      return;
    }
    console.log(req.query.slug);
    res.status(200).json(JSON.parse(data));
  });

  // const slug = req.query?.slug;
  // if (!slug) {
  //   return res.status(400).json({ error: "Missing slug" });
  // }

  // const safeSlug = path.basename(slug);
  // const filePath = path.join(process.cwd(), "blogData", `${safeSlug}.json`);

  // try {
  //   const data = await fs.promises.readFile(filePath, "utf8");
  //   try {
  //     const parsed = JSON.parse(data);
  //     return res.status(200).json(parsed);
  //   } catch (parseErr) {
  //     console.error("Invalid JSON in file:", filePath, parseErr);
  //     return res.status(500).json({ error: "Invalid blog JSON" });
  //   }
  // } catch (err) {
  //   console.error("Could not read file:", filePath, err);
  //   return res.status(404).json({ error: "Blog post not found" });
  // }
}
