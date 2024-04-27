import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span className="">
        {total} restaurants found in {city}
        <Link
          to="/"
          className="text-sm ml-1 font-semibold underline cursor-pointer text-blue-500"
        >
          Change location
        </Link>
      </span>
      Insert sort dropdown here
    </div>
  );
};

export default SearchResultInfo;
