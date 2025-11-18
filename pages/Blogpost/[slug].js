import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";
import path from "path";

// step 1: Find the file corresponding to the slug
//step 2: display the blog post content data

const slug = (props) => {
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

export async function getStaticProps(context) {
  // use params for dynamic routes (not context.query)
  const { slug } = context.params;

  let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
  let myBlog = await data.json();
  return {
    props: { myBlog }, // will be passed to the page component as props
  };
}

// minimal getStaticPaths so Next.js can build dynamic page
export async function getStaticPaths() {
  return {
    paths: [], // no pre-rendered paths
    fallback: "blocking", // generate pages on demand
  };
}

export default slug;
