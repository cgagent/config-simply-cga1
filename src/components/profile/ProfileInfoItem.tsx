
import React from 'react';

interface ProfileInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  icon,
  label,
  value
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-blue-900/30 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-blue-300/60">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
};

export default ProfileInfoItem;
