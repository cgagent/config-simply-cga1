
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Button from '@/components/Button';

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

interface WorkflowSectionProps {
  selectedRepo: GitHubRepository | null;
}

const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  selectedRepo
}) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm p-5">
      <h2 className="text-lg font-medium mb-4">Repository Workflows</h2>
      {selectedRepo ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Manage workflows for {selectedRepo.name}
          </p>
          {selectedRepo.workflows.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRepo.workflows.map(workflow => (
                  <TableRow key={workflow.id}>
                    <TableCell>{workflow.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={workflow.status === 'active' ? 'default' : 'outline'}
                        className={workflow.status === 'active' ? 'bg-green-500' : ''}
                      >
                        {workflow.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No workflows configured for this repository
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Select a repository to view its workflows
        </div>
      )}
    </div>
  );
};

export default WorkflowSection;
