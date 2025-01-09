import axios from "axios";

const API_KEY = "d43cd5c4e6194764abfaa2e2c9c8dc43";
const BASE_URL = "https://newsapi.org/v2/everything?q=tesla&from=2024-12-08&sortBy=publishedAt&apiKey=d43cd5c4e6194764abfaa2e2c9c8dc43";

export const fetchArticle  = async(query = "general", from = "", to = "", sortBy = "publishedAt")=>{
    const params = {
        q : query || "general",
        from,
        to,
        sortBy : "publishedAt",
        apiKey: API_KEY
    }
    try {
        const response = await axios.get(BASE_URL,{params});
        console.log(response.data.articles);
        return response.data.articles;
    }catch(error){
        console.log("error fetching news article",error);
        throw error;
    }
}