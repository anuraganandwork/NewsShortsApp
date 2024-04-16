import axios from "axios";
const baseurl = "https://newsapi.org/v2";

// export type newsDataFRomNetwork = {
//   urlToImage: string;
//   title: string;
// };
const FetchNewBusiness = async () => {
  const response = await axios({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=business&apiKey=c4d0e1a6021549cc927dfdd126384be5
  `,
  });

  console.log(response.data.articles[0].title);
  const r = response.data.articles;
  return r.slice(15, r.length);
};
export default FetchNewBusiness;
