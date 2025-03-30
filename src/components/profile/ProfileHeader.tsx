
import React from 'react';
import { Input } from '@/components/ui/input';
import { CardTitle, CardDescription } from '@/components/ui/card';
import ProfileAvatar from './ProfileAvatar';

interface ProfileHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
  editValues: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  avatarOptions: Array<{
    id: string;
    url: string;
    label: string;
  }>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleAvatarSelect: (url: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  editValues,
  avatarOptions,
  handleInputChange,
  handleBlur,
  handleAvatarSelect
}) => {
  return (
    <div className="flex flex-row items-center gap-4 pb-2">
      <ProfileAvatar 
        firstName={user.firstName}
        lastName={user.lastName}
        avatarUrl={editValues.avatarUrl}
        avatarOptions={avatarOptions}
        onAvatarSelect={handleAvatarSelect}
      />
      <div>
        <CardTitle className="text-2xl font-bold text-white">
          <Input
            name="firstName"
            value={editValues.firstName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="bg-transparent border-none p-0 text-2xl font-bold text-white focus-visible:ring-0 w-auto inline-block mr-2"
            placeholder="First Name"
          />
          <Input
            name="lastName"
            value={editValues.lastName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="bg-transparent border-none p-0 text-2xl font-bold text-white focus-visible:ring-0 w-auto inline-block"
            placeholder="Last Name"
          />
        </CardTitle>
        <CardDescription className="text-blue-300/80">
          {user.role}
        </CardDescription>
      </div>
    </div>
  );
};

export default ProfileHeader;
