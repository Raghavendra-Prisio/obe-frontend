import { Outlet } from "react-router";

const App = () => {
  return (
    <div className={`w-full h-screen flex flex-col bg-neutral-50`}>
      <Outlet />
    </div>
  );
};

export default App;
