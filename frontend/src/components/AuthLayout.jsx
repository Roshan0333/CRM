export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="w-[380px] bg-white rounded-md shadow-lg p-5">
        
        <div className="bg-blue-600 text-white text-center p-4 rounded-md mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-xs">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
