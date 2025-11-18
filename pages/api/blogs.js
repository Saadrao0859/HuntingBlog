//http://localhost:3000/api/blogs
import * as fs from "fs";

export default async function handler(req, res) {
  let data = await fs.promises.readdir("blogData");
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log(item);
    myfile = await fs.promises.readFile(`blogData/` + item, "utf-8");
    console.log(myfile);
    allBlogs.push(JSON.parse(myfile));
  }
  res.status(200).json(allBlogs);

  // fs.readdir("blogData", (err, files) => {
  //   if (err) {
  //     res.status(500).json({ error: "Could not read blog directory" });
  //     return;
  //   }
  //   const blogFiles = files.filter((file) => file.endsWith(".json"));
  //   const blogs = blogFiles.map((file) => {
  //     const data = fs.readFileSync(`blogData/${file}`, "utf-8");
  //     return JSON.parse(data);
  //   });
  //   res.status(200).json(blogs);
  // });
}
