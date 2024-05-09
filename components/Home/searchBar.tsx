'use client'
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  cardData: {
    id: string;
    title: string;
    thumbnail: string;
    category: string;
    rating: {
      stock: number;
    };
    price: number;
  }[];
  onSearch: (filteredData: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ cardData, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortedByPrice, setSortedByPrice] = useState<boolean>(false);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((searchTerm: string) => {
    const filteredData = cardData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredData);
  }, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    debouncedSearch(inputValue);
  };

  const handleSortByPrice = () => {
    const sortedData = [...cardData].sort((a, b) => a.price - b.price);
    if (sortedByPrice) {
      onSearch(cardData);
    } else {
      onSearch(sortedData);
    }
    setSortedByPrice(!sortedByPrice);
  };

  return (
    <div className="search-bar">
      <form className="search">
        <input
          type="text"
          className="search_input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" viewBox="0 0 411.98 411.98"
          className="search_icon"
          onClick={handleSortByPrice}
        >
        <g>
          <path d="M252.939,268.071c1.489,1.98,1.483,4.711-0.035,6.686L149.058,409.835c-1.046,1.354-2.663,2.146-4.374,2.146
            c-1.703,0-3.325-0.792-4.371-2.146L36.473,274.744c-0.769-0.993-1.144-2.175-1.144-3.356c0-1.147,0.363-2.329,1.102-3.322
            c1.501-1.969,4.129-2.707,6.434-1.809l68.757,27.166V5.5c0-3.044,2.477-5.5,5.515-5.5h55.109c3.038,0,5.503,2.456,5.503,5.5
            v287.923l68.76-27.166C248.813,265.358,251.45,266.097,252.939,268.071z M318.798,121.452v103.495h28.176V89.953h-21.757
            l-32.356,17.318l6.289,24.784L318.798,121.452z M376.651,306.036c0,32.816-12.513,51.832-23.016,62.004
            c-10.138,9.941-24.087,16.385-39.26,18.116c-4.351,0.686-8.854,1.059-13.122,1.059c-1.129,0-2.181-0.03-3.162-0.077l-5.763-0.277
            v-26.103l6.679,0.697c3.139,0.319,6.774-0.029,12.194-0.573c8.559-1.176,16.296-4.746,22.153-10.284
            c3.907-3.541,7.081-7.832,9.511-12.833c-5.592,2.519-11.834,3.818-18.584,3.818c-24.541,0-42.351-18.37-42.351-43.68
            c0-27.888,21.096-49.728,48.025-49.728C358.328,248.182,376.651,270.891,376.651,306.036z M347.725,303.956
            c0-9.322-1.868-30.996-19.092-30.996c-10.687,0-18.146,9.787-18.146,23.82c0,12.17,6.903,20.037,17.578,20.037
            c8.239,0,15.332-3.688,18.985-9.877C347.382,306.396,347.725,305.657,347.725,303.956z"/>
        </g>
        </svg>
      </form>
    </div>
  );
};

export default SearchBar