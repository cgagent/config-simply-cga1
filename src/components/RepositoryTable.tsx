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
    <div className="space-card rounded-lg border-blue-800/30 shadow-lg mb-8 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-blue-800/30 bg-blue-900/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Tabs defaultValue="all" className="w-full max-w-[400px]">
            <TabsList className="grid grid-cols-3 bg-blue-950/40 border border-blue-800/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-800/30 data-[state=active]:text-blue-100">All</TabsTrigger>
              <TabsTrigger value="configured" className="data-[state=active]:bg-blue-800/30 data-[state=active]:text-blue-100">Configured</TabsTrigger>
              <TabsTrigger value="not-configured" className="data-[state=active]:bg-blue-800/30 data-[state=active]:text-blue-100">Not Configured</TabsTrigger>
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
        <TableHeader className="bg-blue-950/30">
          <TableRow className="border-blue-800/30 hover:bg-transparent">
            <TableHead className="w-[300px] text-blue-200">Repository</TableHead>
            <TableHead className="text-blue-200">Package Types</TableHead>
            <TableHead className="text-blue-200">Last Run</TableHead>
            <TableHead className="text-blue-200">Status</TableHead>
            <TableHead className="text-right text-blue-200">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRepos.length === 0 ? (
            <TableRow className="hover:bg-blue-900/10 border-blue-800/30">
              <TableCell colSpan={5} className="h-24 text-center text-blue-300/70">
                No repositories found
              </TableCell>
            </TableRow>
          ) : (
            filteredRepos.map((repo) => (
              <TableRow key={repo.id} className="border-blue-800/30 hover:bg-blue-900/10 transition-colors">
                <TableCell className="font-medium text-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-800/20 border border-blue-700/30 flex items-center justify-center">
                      <Github className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-xs text-blue-300/70">{repo.owner}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {repo.packageTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 bg-blue-900/20 text-blue-200 border-blue-700/40">
                        <Package className="h-3 w-3" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-blue-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400/80" />
                    <span>{repo.lastRun}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      repo.isConfigured 
                        ? "bg-emerald-950/20 text-emerald-300 border-emerald-700/30" 
                        : "bg-amber-950/20 text-amber-300 border-amber-700/30"
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
                    variant="primary" 
                    size="sm"
                    onClick={() => onConfigureClick(repo)}
                    icon={<Settings className="h-4 w-4" />}
                    className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 border border-blue-500/20 shadow-md"
                  >
                    Set
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
