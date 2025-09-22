import { useState } from "react";
import finanzas from '../assets/images/finanzas3.png';
import { FiHome, FiList, FiCalendar, FiMessageSquare, FiSettings, FiBarChart2 } from "react-icons/fi";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className={`h-screen ${expanded ? 'w-64' : 'w-20'} bg-[#4B0082] text-white flex flex-col p-4 transition-all duration-300`}>
      <div className="flex justify-center mb-8 mt-2 ">
        <button onClick={() => setExpanded((prev) => !prev)} className="focus:outline-none">
          <img src={finanzas} alt="Finanzas" className="w-10 h-10 object-contain" />
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        <div className="relative group">
          <a href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiHome size={22} />
            {expanded && <span>Dashboard</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Dashboard</span>
          )}
        </div>
        <div className="relative group">
          <a href="/movimientos" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiList size={22} />
            {expanded && <span>Movimientos</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Movimientos</span>
          )}
        </div>
        <div className="relative group">
          <a href="#schedule" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiCalendar size={22} />
            {expanded && <span>Schedule</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Schedule</span>
          )}
        </div>
        <div className="relative group">
          <a href="#messages" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiMessageSquare size={22} />
            {expanded && <span>Messages</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Messages</span>
          )}
        </div>
        <div className="relative group">
          <a href="#settings" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiSettings size={22} />
            {expanded && <span>Settings</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Settings</span>
          )}
        </div>
        <div className="relative group">
          <a href="#analytics" className="flex items-center gap-3 p-2 rounded hover:bg-[#623483ff] transition-colors">
            <FiBarChart2 size={22} />
            {expanded && <span>Analytics</span>}
          </a>
          {!expanded && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">Analytics</span>
          )}
        </div>
      </nav>
    </aside>
  );
}
