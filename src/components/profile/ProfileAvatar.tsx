
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';

interface AvatarOption {
  id: string;
  url: string;
  label: string;
}

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  avatarOptions: AvatarOption[];
  onAvatarSelect: (url: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  firstName,
  lastName,
  avatarUrl,
  avatarOptions,
  onAvatarSelect
}) => {
  return (
    <div className="relative group">
      <Avatar className="h-16 w-16 border-2 border-blue-500/30 ring-4 ring-blue-400/10 cursor-pointer">
        <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
        <AvatarFallback className="text-lg">
          {firstName[0]}{lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <UserCircle className="h-4 w-4 text-white" />
      </div>
      
      {/* Avatar selector popup */}
      <div className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-wrap gap-3 bg-gray-900/90 p-3 rounded-lg border border-blue-500/20 backdrop-blur-md z-10 w-64">
        <p className="w-full text-sm text-blue-300 mb-1">Select Avatar</p>
        {avatarOptions.map(avatar => (
          <div 
            key={avatar.id}
            className={`cursor-pointer p-1 rounded-full ${avatarUrl === avatar.url ? 'bg-blue-500 ring-2 ring-blue-300' : 'bg-transparent hover:bg-blue-900/30'}`}
            onClick={() => onAvatarSelect(avatar.url)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatar.url} alt={avatar.label} />
              <AvatarFallback>{avatar.label[0]}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAvatar;
