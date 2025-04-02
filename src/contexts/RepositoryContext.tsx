import React, { createContext, useContext, ReactNode } from 'react';
import { Repository } from '@/types/repository';
import { useCILocalStorage } from '@/hooks/useCILocalStorage';

interface RepositoryContextType {
  repositories: Repository[];
  updateRepositoryStatus: (repoName: string, packageType: string) => void;
  addRepository: (repository: Repository) => void;
  removeRepository: (repoName: string) => void;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const useRepositories = () => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepositories must be used within a RepositoryProvider');
  }
  return context;
};

interface RepositoryProviderProps {
  children: ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({ children }) => {
  const { repositories, updateRepositoryStatus, addRepository, removeRepository } = useCILocalStorage();

  return (
    <RepositoryContext.Provider value={{
      repositories,
      updateRepositoryStatus,
      addRepository,
      removeRepository
    }}>
      {children}
    </RepositoryContext.Provider>
  );
}; 