import axios from "axios";
const baseurl = "https://newsapi.org/v2";

// export type newsDataFRomNetwork = {
//   urlToImage: string;
//   title: string;
// };
const FetchNewHome = async () => {
  const response = await axios({
    method: "GET",
    url: `${baseurl}/top-headlines?country=in&apiKey=c4d0e1a6021549cc927dfdd126384be5
    `,
  });

  console.log(response.data.articles[0].title);
  return response.data.articles;
};
export default FetchNewHome;
