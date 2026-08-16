const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-10 border border-slate-200 rounded-lg px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};
export default Input;
