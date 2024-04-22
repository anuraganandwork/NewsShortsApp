import axios from "axios";
import { Home } from "../../apiKeys";

// export type newsDataFRomNetwork = {
//   urlToImage: string;
//   title: string;
// };
const FetchNewHome = async () => {
  const response = await axios({
    method: "GET",
    url: Home,
  });

  console.log(response.data.articles[0].title);
  return response.data.articles;
};
export default FetchNewHome;
