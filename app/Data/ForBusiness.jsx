import axios from "axios";
import { business } from "../../apiKeys";

const baseurl = "https://newsapi.org/v2";

// export type newsDataFRomNetwork = {
//   urlToImage: string;
//   title: string;
// };
const FetchNewBusiness = async () => {
  const response = await axios({
    method: "GET",
    url: business,
  });

  console.log(response.data.articles[0].title);
  const r = response.data.articles;
  return r.slice(15, r.length);
};
export default FetchNewBusiness;
