
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  GitBranch, 
  Users,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/home', icon: <Home className="w-5 h-5" /> },
  { name: 'CI', path: '/repositories', icon: <GitBranch className="w-5 h-5" /> },
  { name: 'User Management', path: '/users', icon: <Users className="w-5 h-5" /> },
];

interface SideNavigationProps {
  className?: string;
  onHomeLinkClick?: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ className, onHomeLinkClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // CI Configuration page is part of the repositories section
  const isActive = (path: string) => {
    if (path === '/repositories' && location.pathname === '/ci-configuration') {
      return true;
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    if (path === '/home' && location.pathname === '/home' && onHomeLinkClick) {
      // If we're already on home and clicked home again, trigger the callback
      onHomeLinkClick();
    } else {
      navigate(path);
    }
  };
  
  return (
    <nav className={cn("py-2", className)}>
      <ul className="flex items-center space-x-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <li key={item.path}>
              <button
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary",
                  active 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-foreground hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavigation;
