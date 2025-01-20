import { useEffect, useState } from "react";
import { getRequest} from "./services/api-service";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Quiz from "./components/Quiz";
import { Questions } from "./types/questions";


function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Questions>({
    questions: [], 
})

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        await getRequest('/v1/populate-countries')
        const { data: response } = await getRequest('/v1/countries');       
        setData(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <Router>
          <Routes>
              <Route path='/' element={<Quiz quiz={data} />}/>
          </Routes>
      </Router>
    )}
    </div>
 

  )
}
export default App
