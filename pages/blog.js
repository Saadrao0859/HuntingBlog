import React, { useEffect, useState } from "react";
import styles from "@/styles/Blog.module.css";
import Link from "next/link";
import fs from "fs";
import InfiniteScroll from "react-infinite-scroll-component";
//Step 1: Collect all the data from Blogdata directory
//Step 2: Iterate through and display the data
const Blog = (props) => {
  const [blogs, setBlogs] = React.useState(props.allBlogs);
  const [count, setcount] = useState(2);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs?count=${count + 2}`);
    setcount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };
  return (
    <div className={styles.main}>
      <div className={styles.popblogs}>
        <h2>Popular Blogs</h2>
        {/* <InfiniteScroll
          dataLength={blogs.length}
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4 className={styles.loading}>Loading...</h4>}
          endMessage={
            <p className={styles.endMessage} style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        > */}
        {blogs.map((blogitem) => {
          return (
            <div key={blogitem.title} className={styles.mainblogiteam}>
              <Link href={`/Blogpost/${blogitem.slug}`}>
                <h2>{blogitem.title}</h2>
              </Link>
              <p className={styles.blogsp}>
                {" "}
                {blogitem.metadesc.substr(0, 160)}
              </p>
              <Link
                href={`/Blogpost/${blogitem.slug}`}
                className={styles.btnhome}
              >
                Learn more
              </Link>
            </div>
          );
        })}
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogData");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < allCount; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(`blogData/` + item, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }

  return {
    props: { allBlogs, allCount },
  };
}
export default Blog;
