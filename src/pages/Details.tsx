import { movie } from "@/delete";
import { Badge, Share2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function Details() {
  const { imdbId } = useParams(); // This will extract the imdbId from the URL
  const [parsedData, setParsedData] = useState<any>(movie);

  // useEffect(() => {
  //   console.log(imdbId); // Log the imdbId to the console
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios(
  //         `https://search.imdbot.workers.dev/?tt=${imdbId}`
  //       );
  //       console.log("fetchingData", response.data);
  //       const htmlContent = cheerio.load(response.data);
  //       setParsedData(htmlContent);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [imdbId]); // Fetch data when imdbId changes
  return (
    <div>
      Details Page
      <Badge>{movie.type}</Badge>
      <Share2 />
      <div>{parsedData}</div>
    </div>
  );
}
