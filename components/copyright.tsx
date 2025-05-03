import Text from "./text";

export default function Copyright() {
  const year = new Date().getFullYear();
  return <Text text={`© ${year} searchify`} />;
}
