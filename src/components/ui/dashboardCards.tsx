import ImageComponent from "../ImageComponent/ImageComponent";
import { MoveRight } from "lucide-react";

interface BaseDashboardCardProps {
  variant?: "manager" | "admin";
}

interface ManagerCardProps extends BaseDashboardCardProps {
  variant?: "manager";
  icon: string;
  title: string;
  value: number;
  color: string;
}

interface AdminCardProps extends BaseDashboardCardProps {
  variant: "admin";
  icon?: string;
  title: string;
  value: number | string;
  Day?: string;
  color: string;
  width?: string;
  subtitle?: string;
  staffBadge?: string;
  Badge?: string;
  dropdown?: string;
  tag?: string;
  isActionCard?: boolean;
  onClick?: () => void;
}

type DashboardCardProps = ManagerCardProps | AdminCardProps;

export default function DashboardCard(props: DashboardCardProps) {
  const { variant = "manager" } = props;

  if (variant === "manager") {
    const { icon, title, value, color } = props as ManagerCardProps;

    return (
      <div className={`rounded-lg p-4 ${color} flex-1`}>
        <div className="flex flex-col gap-4">
          <div className="">
            <ImageComponent src={icon} alt="icon" width={60} height={60} />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-normal text-gray-500">{title}</p>
            <p className="text-4xl font-semibold text-gray-500">{value}</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    icon,
    title,
    value,
    Day,
    subtitle,
    Badge,
    staffBadge,
    dropdown,
    tag,
    color,
    width,
    isActionCard,
    onClick
  } = props as AdminCardProps;
  return (
    <div
      className={`${color} text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity ${width}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-8">
        <div>
        {icon && (
          <ImageComponent src={icon} alt="card" width={50} height={50} className="bg-[#6987F9] p-2 rounded-full" />
        )}
        </div>

        <div className="flex flex-col">
          <p className="text-base font-medium text-white">{title}</p>
          <div>
            <p className="text-3xl font-bold leading-tight text-white">{value}</p>
            <p className="text-base font-medium text-white">{Day}</p>
            {dropdown && (
              <select className="bg-white/20 text-xs rounded px-2 py-1 text-white mt-2">
                <option>{dropdown}</option>
              </select>
            )}
            {staffBadge && (
              <span className="bg-[#192B7F] text-xs text-[#19F0FF] rounded-full px-2 py-0.5">
                {staffBadge}
              </span>
            )}
          </div>
        </div>
        </div>
        <div className="flex items-end flex-col justify-evenly h-[100px]">
          <MoveRight />
          <div className="flex justify-between items-center mt-1">
            {subtitle && <p className="text-xs">{subtitle}</p>}
            {Badge && (
              <span className="bg-[#192B7F] text-xs text-[#19F0FF] rounded-full px-2 py-0.5">
                {Badge}
              </span>
            )}
          {tag && (
            <span className="text-base font-medium text-white">{tag}</span>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
