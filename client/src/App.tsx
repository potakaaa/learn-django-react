import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

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
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex justify-center items-center">
      <p className="font-bold text-4xl text-white">{data[0].id}</p>
    </div>
  );
};

export default App;
