export default function Wrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full px-10 md:px-32">{children}</div>;
}
