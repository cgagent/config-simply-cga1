
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Github, Clock, Package, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Search from '@/components/Search';

interface GitHubRepository {
  id: string;
  name: string;
  owner: string;
  orgName: string;
  packageTypes: string[];
  lastRun: string;
  isConfigured: boolean;
  workflows: {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    buildNumber?: number;
    lastRun?: string;
  }[];
}

interface RepositoryTableProps {
  repositories: GitHubRepository[];
  selectedOrg: { id: string; name: string };
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onConfigureClick: (repo: GitHubRepository) => void;
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({
  repositories,
  selectedOrg,
  searchTerm,
  setSearchTerm,
  onConfigureClick
}) => {
  const filteredRepos = repositories
    .filter(repo => repo.orgName === selectedOrg.name)
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm mb-8">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Tabs defaultValue="all" className="w-full max-w-[400px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="configured">Configured</TabsTrigger>
              <TabsTrigger value="not-configured">Not Configured</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Search 
            onSearch={setSearchTerm} 
            className="w-full sm:w-64"
            placeholder="Search repositories..."
          />
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Repository</TableHead>
            <TableHead>Package Types</TableHead>
            <TableHead>Last Run</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRepos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No repositories found
              </TableCell>
            </TableRow>
          ) : (
            filteredRepos.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Github className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-xs text-muted-foreground">{repo.owner}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {repo.packageTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{repo.lastRun}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      repo.isConfigured 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    )}
                  >
                    {repo.isConfigured ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        <span>Configured</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3" />
                        <span>Not Configured</span>
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onConfigureClick(repo)}
                    icon={<Settings className="h-4 w-4" />}
                  >
                    Configure
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RepositoryTable;
