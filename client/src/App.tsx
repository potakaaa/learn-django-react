import { useEffect, useState } from "react";
import axios from "axios";
import { error } from "console";
import { send } from "process";

const App = () => {
  type Post = {
    id: number;
    title: string;
    body: string;
  };

  const [data, setData] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: Post[] = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const handleSendPost = () => {
    console.log(title);
    console.log(body);
    const newPost = {
      id: data.length + 1,
      title: title,
      body: body,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}posts/`, newPost)
      .then((response) => {
        setData([...data, response.data]);
      })
      .catch((error) =>
        console.error(
          "Error creating post: ",
          error.response?.data || error.message
        )
      );
    setTitle("");
    setBody("");
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex justify-center items-center flex-col gap-5">
      {data.length > 0 &&
        data.map((post) => (
          <div
            className="text-center flex flex-col justify-center items-center"
            key={post.id}
          >
            <h1 key={post.id} className="text-white text-2xl text-center">
              {post.title}
            </h1>
            <div className="flex flex-col">
              <p className="text-white text-base text-center">{post.id}</p>
              <p className="text-white text-base text-center">{post.body}</p>
            </div>
          </div>
        ))}
      <input
        className="rounded-full h-10 w-52 px-3"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        className="rounded-full h-10 w-52 px-3"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button
        className="bg-white px-4 py-1 rounded-xl"
        onClick={handleSendPost}
      >
        Send Post
      </button>
    </div>
  );
};

export default App;
