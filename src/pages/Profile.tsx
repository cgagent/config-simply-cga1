
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileDetails from '@/components/profile/ProfileDetails';
import { useProfileState } from '@/components/profile/useProfileState';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  
  // In a real app, this would come from authentication context
  // For now we'll use hardcoded data matching the NavBar user
  const initialUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    lastLoginDate: new Date().toISOString(),
    developerApp: true
  };

  const {
    user,
    editValues,
    avatarOptions,
    handleInputChange,
    handleAvatarSelect,
    handleBlur,
    formatDate
  } = useProfileState(initialUser);

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <Card className="border border-blue-200/20 bg-gradient-to-b from-blue-950/50 to-gray-950/80 shadow-lg">
          <CardHeader>
            <ProfileHeader 
              user={user}
              editValues={editValues}
              avatarOptions={avatarOptions}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              handleAvatarSelect={handleAvatarSelect}
            />
          </CardHeader>
          
          <Separator className="bg-blue-500/20" />
          
          <CardContent className="pt-6 space-y-6">
            <ProfileDetails
              email={user.email}
              role={user.role}
              lastLoginDate={user.lastLoginDate}
              developerApp={user.developerApp}
              formatDate={formatDate}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
