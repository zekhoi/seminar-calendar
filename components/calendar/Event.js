import MonthEvent from "../item/MonthEvent";
import PastEvent from "../item/PastEvent";

export default function Event({ data }) {
  return (
    <>
      <div className="flex flex-col justify-between w-full max-w-sm gap-y-8">
        <MonthEvent data={data} />
        <PastEvent data={data} />
      </div>
    </>
  );
}
