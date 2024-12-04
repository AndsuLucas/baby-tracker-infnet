export default interface CustomButtonProps {
  label: string;
  onClick: () => void;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
  props?: object;
}
