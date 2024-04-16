import axios from "axios";
const baseurl = "https://newsapi.org/v2";

const FetchNewHealth = async () => {
  const response = await axios({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=health&apiKey=c4d0e1a6021549cc927dfdd126384be5`,
  });

  console.log(response.data.articles[8].title);
  const r = response.data.articles;
  return r.slice(5, r.length);
};
export default FetchNewHealth;
