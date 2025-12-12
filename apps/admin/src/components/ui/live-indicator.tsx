const LiveIndicator = () => {
  return (
    <span className="text-xs text-green-500 relative">
      {/* <span className="flex absolute top-[5px] size-1.5">
        <span className="animate-ping absolute inline-flex size-full rounded-full bg-green-400 opacity-75 dark:bg-green-600" />
        <span className="relative inline-flex rounded-full size-1.5 bg-green-500" />
      </span> */}
      <span className="ps-2.5">Live</span>
    </span>
  );
};

export default LiveIndicator;
