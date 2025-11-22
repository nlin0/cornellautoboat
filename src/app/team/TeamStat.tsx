interface TeamStatProps {
  icon: React.ReactNode;
  label: string;
}

export default function TeamStat({ icon, label }: TeamStatProps) {
  return (
    <li className="flex flex-col items-center gap-2">
      {icon}
      {label}
    </li>
  );
}

