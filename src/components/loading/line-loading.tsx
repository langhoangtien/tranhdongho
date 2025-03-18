export function LineLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-1 w-[60%] max-w-[360px] overflow-hidden rounded-[3px] bg-slate-300 dark:bg-slate-400">
        <div className="loading-screen right-0 top-0 h-1 w-[60%] rounded-[3px] bg-slate-800 dark:bg-slate-50"></div>
      </div>
    </div>
  );
}
