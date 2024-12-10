import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInput } from "@/hooks/useInput";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { searchThreads } from "@/states/threads/action";

export const SearchInput = ({ className = "" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, onSearchQueryChange, setSearchQuery] = useInput("");
    const dispatch = useDispatch();
    // Initialize search from URL only on mount
    useEffect(() => {
        const searchFromUrl = searchParams.get('search');
        if (searchFromUrl) {
            setSearchQuery(searchFromUrl);
        }
    }, []);

    const handleSearch = (e) => {
        onSearchQueryChange(e);
        if (e.target.value.trim() !== "") {
            setSearchParams({ search: e.target.value });
        } else {
            setSearchParams();
        }
        dispatch(searchThreads(e.target.value));
    };


    const handleClear = () => {
        setSearchQuery("");
        setSearchParams();
        dispatch(searchThreads(""));
    };

    return (
        <div className={`relative ${className}`}>
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
            />
            <Input
                placeholder="Search discussions..."
                className="pl-10 pr-10 bg-gray-50 dark:bg-gray-700 border-none"
                value={searchQuery}
                onChange={handleSearch}
            />
            {searchQuery && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
                    onClick={handleClear}
                >
                    <X className="text-gray-400" size={16} />
                </Button>
            )}
        </div>
    );
};

SearchInput.propTypes = {
    className: PropTypes.string,
};