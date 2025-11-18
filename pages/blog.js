import React, { useEffect } from "react";
import styles from "@/styles/Blog.module.css";
import Link from "next/link";

//Step 1: Collect all the data from Blogdata directory
//Step 2: Iterate through and display the data
const Blog = (props) => {
  console.log(props);
  const [blogs, setBlogs] = React.useState(props.allBlogs);
  useEffect(() => {}, []);
  return (
    <div className={styles.main}>
      <div className={styles.popblogs}>
        <h2>Popular Blogs</h2>
      </div>
      {blogs.map((blogitem) => {
        return (
          <div key={blogitem.title} className={styles.mainblogiteam}>
            <Link href={`/Blogpost/${blogitem.slug}`}>
              <h2>{blogitem.title}</h2>
            </Link>
            <p className={styles.blogsp}> {blogitem.metadesc.substr(0, 160)}</p>
          </div>
        );
      })}
      {/* <div className={styles.mainblogiteam}>
        <div className="blogitem">
          <Link href={"/Blogpost/learn-javascript"}>
            <h2>How to learn javascript in 2025 ?</h2>
            <p>Java script is used to build a logic for the web</p>
          </Link>
        </div>
        <div className="blogitem">
          <h2>How to learn javascript in 2025 ?</h2>
          <p>Java script is used to build a logic for the web</p>
        </div>
        <div className="blogitem">
          <h2>How to learn javascript in 2025 ?</h2>
          <p>Java script is used to build a logic for the web</p>
        </div>
      </div> */}
    </div>
  );
};

export async function getStaticProps(context) {
  let data = await fetch("http://localhost:3000/api/blogs");
  let allBlogs = await data.json();

  // .then((a) => {
  //   return a.json();
  // })
  // .then((parsed) => {
  //   setBlogs(parsed);
  // });
  return {
    props: { allBlogs }, // will be passed to the page component as props
  };
}

export default Blog;
