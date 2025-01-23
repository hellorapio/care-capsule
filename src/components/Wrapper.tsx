// export default function Wrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return<div className="mx-auto w-full px-10 md:px-32">{children}</div>;
// }



export default function Wrapper({
  children,
  backgroundClass = "bg-transparent",
}: {
  children: React.ReactNode;
  backgroundClass?: string;
}) {
  return (
    <div className={`mx-auto w-full px-10 md:px-32 ${backgroundClass}`}>
      {children}
    </div>
  );
}