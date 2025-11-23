import React, { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";
import fs from "fs";

// step 1: Find the file corresponding to the slug
//step 2: display the blog post content data

const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
  }
  const [blog, setBlog] = useState(props.myBlog);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{blog && blog.title} </h1>
        <hr />
        {blog && (
          <div
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className={styles.content}
          ></div>
        )}
      </main>
    </div>
  );
};
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-learn-flask" } },
      { params: { slug: "how-to-learn-nextjs" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`blogData/${slug}.json`, "utf8");
  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}

export default Slug;
