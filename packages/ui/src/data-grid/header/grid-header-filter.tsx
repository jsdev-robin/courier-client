'use client';

import { Column, RowData } from '@tanstack/react-table';
import { format, startOfDay } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '../../components/button';
import { Calendar } from '../../components/calendar';
import DebouncedInput from '../../components/debounced-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/select';
import { cn } from '../../lib/utils';
import { useDataGrid } from '../contexts/data-grid-contexts';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | 'text'
      | 'number'
      | 'tel'
      | 'url'
      | 'color'
      | 'range'
      | 'select'
      | 'dateRange'
      | 'date'
      | 'datetime-local'
      | 'month'
      | 'time'
      | 'week';
  }
}

const GridHeaderFilter = <T,>({ column }: { column: Column<T, unknown> }) => {
  const { isLoading } = useDataGrid();

  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const [sortedUniqueSelectValues, setSortedUniqueSelectValues] = useState<
    (string | boolean)[]
  >([]);

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  console.log(sortedUniqueSelectValues);

  useEffect(() => {
    if (!isLoading && filterVariant === 'select') {
      const values = Array.from(column.getFacetedUniqueValues().keys())
        .sort()
        .slice(0, 5000);
      setSortedUniqueSelectValues(values as string[]);
    } else {
      setSortedUniqueSelectValues([]);
    }
  }, [filterVariant, column, isLoading]);

  useEffect(() => {
    if (filterVariant === 'dateRange') {
      if (date?.from && date?.to) {
        column.setFilterValue([date.from.toISOString(), date.to.toISOString()]);
      } else {
        column.setFilterValue(undefined);
      }
    }
  }, [date, column, filterVariant]);

  useEffect(() => {
    if (!columnFilterValue && filterVariant === 'dateRange') {
      setDate(undefined);
    }
  }, [columnFilterValue, filterVariant]);

  return column.getCanFilter() ? (
    <div className="p-1.5 border-t border-border w-full">
      {filterVariant === 'range' ? (
        <div className="flex gap-1.5">
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder="Min"
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder="Max"
          />
        </div>
      ) : filterVariant === 'select' ? (
        <Select
          value={columnFilterValue?.toString() ?? ''}
          onValueChange={(value) =>
            column.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select value" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {sortedUniqueSelectValues.map((value) => {
                const stringValue =
                  typeof value === 'boolean' ? String(value) : value;
                return (
                  <SelectItem
                    value={stringValue}
                    key={stringValue}
                    className="capitalize"
                  >
                    {stringValue}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : filterVariant === 'dateRange' ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'justify-start text-left font-normal w-full truncate',
                !date && 'text-muted-foreground',
              )}
            >
              {date?.from && date?.to ? (
                <>
                  {format(date.from, 'MMM dd')} - {format(date.to, 'MMM dd')}
                </>
              ) : (
                <span>Pick a date</span>
              )}
              <ChevronDown className="ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1.5" align="end">
            <Calendar
              mode="range"
              selected={date}
              onSelect={(selected) => {
                if (selected?.from && selected?.to) {
                  const from = new Date(selected.from);
                  const to = new Date(selected.to);
                  from.setHours(0, 0, 0, 0);
                  to.setHours(23, 59, 59, 999);
                  setDate({ from, to });
                } else {
                  setDate(undefined);
                }
              }}
              numberOfMonths={2}
              disabled={(d) =>
                d > startOfDay(new Date()) || d < new Date('1900-01-01')
              }
            />
          </PopoverContent>
        </Popover>
      ) : filterVariant &&
        [
          'text',
          'time',
          'date',
          'datetime-local',
          'month',
          'week',
          'number',
          'tel',
          'url',
          'color',
        ].includes(filterVariant) ? (
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          type={filterVariant}
          value={(columnFilterValue ?? '') as string}
        />
      ) : (
        <div className="h-9 opacity-0 invisible" />
      )}
    </div>
  ) : null;
};

export default GridHeaderFilter;
