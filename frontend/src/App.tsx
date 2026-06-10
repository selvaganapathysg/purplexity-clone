import { BrowserRouter, Route } from "react-router";





export function App() {
  return (
    <BrowserRouter>
      <Route path="/auth" element = {<Auth/>}></Route>    
    </BrowserRouter>
  );
}

export default App;
