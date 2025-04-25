import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 bg-slate-800 text-white">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white text-right py-4 px-25 font-serif">
        Leandro Yepes
      </footer>
    </div>
  );
};

export default Layout;
