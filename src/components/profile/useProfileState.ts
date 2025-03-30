
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  lastLoginDate: string;
  developerApp: boolean;
}

interface EditValues {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export const useProfileState = (initialUser: UserProfile) => {
  const [user, setUser] = useState(initialUser);
  
  const [editValues, setEditValues] = useState<EditValues>({
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: 'https://github.com/shadcn.png'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarSelect = (url: string) => {
    setEditValues(prev => ({
      ...prev,
      avatarUrl: url
    }));
    
    // Apply avatar change immediately
    handleSave();
  };

  const handleSave = () => {
    if (!editValues.firstName || !editValues.lastName) {
      toast({
        title: "Error",
        description: "First name and last name are required.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call
    setUser(prev => ({
      ...prev,
      firstName: editValues.firstName,
      lastName: editValues.lastName,
    }));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  // Auto-save when user stops typing
  const handleBlur = () => {
    handleSave();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Avatar options - in a real app these would be from a proper source
  const avatarOptions = [
    { id: 'avatar1', url: 'https://github.com/shadcn.png', label: 'Default' },
    { id: 'avatar2', url: 'https://i.pravatar.cc/150?img=1', label: 'Avatar 1' },
    { id: 'avatar3', url: 'https://i.pravatar.cc/150?img=2', label: 'Avatar 2' },
    { id: 'avatar4', url: 'https://i.pravatar.cc/150?img=3', label: 'Avatar 3' },
  ];

  return {
    user,
    editValues,
    avatarOptions,
    handleInputChange,
    handleAvatarSelect,
    handleBlur,
    formatDate
  };
};
