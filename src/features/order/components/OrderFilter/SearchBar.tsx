import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

interface Party {
  id: string;
  name: string;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: Party[];
  isLoadingSuggestions?: boolean;
  onSuggestionSelect?: (party: Party) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search parties...",
  suggestions = [],
  isLoadingSuggestions = false,
  onSuggestionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input value
  const filteredSuggestions = suggestions.filter((party) =>
    party.name.toLowerCase().includes(value.toLowerCase())
  );

  // Show dropdown when there's input and suggestions
  const showDropdown =
    isOpen && (filteredSuggestions.length > 0 || isLoadingSuggestions);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (party: Party) => {
    onChange(party.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSuggestionSelect?.(party);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputFocus = () => {
    if (value || filteredSuggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          className="block w-full rounded-md border-0 py-2.5 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all duration-200"
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        {suggestions.length > 0 && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {isLoadingSuggestions ? (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Loading suggestions...
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <>
              {filteredSuggestions.map((party, index) => (
                <div
                  key={party.id}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                    index === highlightedIndex
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSuggestionClick(party)}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3">
                      {party.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{party.name}</div>
                      <div className="text-xs text-gray-500">
                        ID: {party.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : value ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No parties found matching "{value}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
