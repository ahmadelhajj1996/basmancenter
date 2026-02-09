import AppRoutes from "./config/router";
import Backtop from "./components/Backtop";


function App() {
  

  return (
    <>
      <div className="m-0 w-full min-h-screen transform-none filter-none" >
        <AppRoutes />
      </div>
      <Backtop />
    </>
  );
}

export default App;
