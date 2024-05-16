import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavHeader from "./component/NavHeader";
import Dashboard from "./page/Dashboard";
import Fund from "./page/Fund";
import Member from "./page/Member";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<NavHeader />}>
          <Route index element={<Dashboard />} />
          <Route path="member" element={<Member />} />
          <Route path="fund" element={<Fund />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;