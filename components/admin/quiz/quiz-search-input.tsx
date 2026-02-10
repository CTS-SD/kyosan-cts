"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../ui/input-group";

export const QuizSearchInput = () => {
  const [query, setQuery] = useQueryState("q");
  const [inputValue, setInputValue] = useState(query ?? "");
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setQuery(debouncedValue || null);
  }, [debouncedValue, setQuery]);

  return (
    <InputGroup className="bg-background">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        className="grow"
        placeholder="問題を検索"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </InputGroup>
  );
};
