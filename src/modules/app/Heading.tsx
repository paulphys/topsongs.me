interface IProps {
  className?: string;
  text: string;
}

export default function Heading({ className, text }: IProps) {
  return (
    <h1 className={`mb-2 inline-block px-12 text-2xl font-semibold text-white ${className}`}>
      {text}
    </h1>
  );
}
