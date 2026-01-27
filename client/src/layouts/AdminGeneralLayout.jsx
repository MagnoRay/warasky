import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

export default function AdminGeneralLayout() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="w-full max-w-7xl mx-auto px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
