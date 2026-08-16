const Feature = ({ icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="w-11 h-11 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
        {icon}
      </div>

      <h3 className="text-[10px] font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-[9px] text-slate-500">{description}</p>
    </div>
  );
};

export default Feature;
