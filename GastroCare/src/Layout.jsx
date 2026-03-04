export default function Layout({ children, currentPageName }) {
  return (
    <div className="font-sans antialiased">
      <style>{`
        :root {
          --primary: #FF7F50;
          --primary-dark: #e8602e;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: #f9fafb; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        input[type=text]:focus { outline: none; }
      `}</style>
      <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative shadow-xl">
        {children}
      </div>
    </div>
  );
}