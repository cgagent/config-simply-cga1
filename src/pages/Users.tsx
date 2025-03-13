
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCog, Calendar, Mail, Shield, Code } from 'lucide-react';
import UserForm from '@/components/UserForm';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

const UsersPage: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      lastLoginDate: '2023-10-15T14:30:00Z'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Developer',
      lastLoginDate: '2023-10-14T09:15:00Z'
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      role: 'Developer',
      lastLoginDate: '2023-10-13T16:45:00Z'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (userData: User) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => user.id === userData.id ? userData : user));
      toast({
        title: "User updated",
        description: `${userData.firstName} ${userData.lastName}'s information has been updated.`
      });
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: String(Date.now()), // Simple ID generation
        lastLoginDate: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      toast({
        title: "User added",
        description: `${newUser.firstName} ${newUser.lastName} has been added to the team.`
      });
    }
    setIsFormOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs font-medium">User Management</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Button onClick={handleAddUser} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role === 'Admin' ? (
                          <>
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="font-medium text-primary">Admin</span>
                          </>
                        ) : (
                          <>
                            <Code className="h-4 w-4 text-indigo-500" />
                            <span className="font-medium text-indigo-500">Developer</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(user.lastLoginDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditUser(user)}
                        className="gap-2"
                      >
                        <UserCog className="h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {isFormOpen && (
        <UserForm 
          user={editingUser} 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default UsersPage;
