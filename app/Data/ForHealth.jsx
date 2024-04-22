import axios from "axios";
import { health } from "../../apiKeys";

const baseurl = "https://newsapi.org/v2";

const FetchNewHealth = async () => {
  const response = await axios({
    method: "GET",
    url: health,
  });

  console.log(response.data.articles[8].title);
  const r = response.data.articles;
  return r.slice(5, r.length);
};
export default FetchNewHealth;
