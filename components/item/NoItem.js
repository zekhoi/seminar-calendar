export default function NoItem({ children }) {
  return (
    <>
      <div className="flex items-center justify-center h-40">
        <div className="w-full py-2 font-medium text-center">{children}</div>
      </div>
    </>
  );
}
