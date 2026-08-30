import { Text } from "../../components/Typography";

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-green-600 px-4 py-1.5">
      <Text
        variant="strong"
        size="xs"
        className="!text-white uppercase tracking-widest"
      >
        {children}
      </Text>
    </span>
  );
}
