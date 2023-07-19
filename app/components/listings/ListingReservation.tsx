'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onStartTime: (value: string) => void;
  onEndTime: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  startTime: string;
  endTime: string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onStartTime,
  onEndTime,
  onSubmit,
  disabled,
  disabledDates,
  startTime,
  endTime
}) => {
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-center">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => 
            onChangeDate(value.selection)}
        />
      </div>
      <hr />
      <div className="text-center mt-2">
        <div className="font-light text-neutral-600">
          Start Time
        </div>
        <div>
          <input
            required
            type="text"
            value={startTime}
            onChange={(event) => onStartTime(event.target.value)}
            placeholder={startTime}
            className="text-center border-neutral-300 border border-solid border-1 rounded-md"
          />
        </div>
        <div className="font-light text-neutral-600">
          End Time
        </div>
        <div>
          <input
            required
            type="text"
            value={endTime}
            onChange={(event) => onEndTime(event.target.value)}
            placeholder={endTime}
            className="text-center border-neutral-300 border border-solid border-1 rounded-md"
          />
        </div>
      </div>
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;