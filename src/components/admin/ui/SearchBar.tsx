import { useState } from "react";
import type { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "Search...",
  defaultValue = "",
  onSubmit,
  className = "",
}: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </form>
  );
};

export default SearchBar;
