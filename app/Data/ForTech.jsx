import axios from "axios";
import { tech } from "../../apiKeys";

const baseurl = "https://newsapi.org/v2";

// export type newsDataFRomNetwork = {
//   urlToImage: string;
//   title: string;
// };
const FetchNewtech = async () => {
  const response = await axios({
    method: "GET",
    url: tech,
  });

  console.log(response.data.articles[0].title);
  return response.data.articles;
};
export default FetchNewtech;
