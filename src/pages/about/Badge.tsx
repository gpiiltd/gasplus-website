import { Text } from "../../components/Typography";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center ">
      <Text
        variant="strong"
        size="sm"
        className="!text-[#5F973C] !font-extrabold uppercase tracking-widest"
      >
        {children}
      </Text>
    </span>
  );
}
