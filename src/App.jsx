import { Routes, Route, useNavigate, useRoutes } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import Test from "./components/Test.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function App() {

  const modalBState = useSelector((state) => state?.modalBslice);
  const modalAState = useSelector(state => state.modalAslice)
  
  const [isHome, setIsHome] = useState(true)
  const navigate = useNavigate()


  // console.log("history", history);

  useEffect(() => {
    if (modalAState) {
      navigate('problem-2/?modal-a')
      setIsHome(false)
    } else if (modalBState) {
      navigate('problem-2/?modal-b')
      setIsHome(false)
    } else {
       if(!isHome){
         navigate('problem-2/')
       }
    }

  }, [modalAState,modalBState])

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
        </Route>
        <Route path="test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
