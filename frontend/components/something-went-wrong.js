import { Heading1 } from "./heading";
import Text from "./text";

export default function SomethingWentWrong() {
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Heading1 text="Something went wrong, Please try again later." />
      <Text text="Our team has been notified and we will fix this as soon as possible." />
    </div>
  );
}
