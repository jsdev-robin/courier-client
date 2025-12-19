'use client';

import { useFindAgentsQuery } from '@/libs/features/services/agent/agentApi';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Table, useDataGridQuery } from '@repo/ui/data-grid/index';
import Link from 'next/link';
import useAgentColumns from './particles/useAgentColumns';

const AgentList = () => {
  const { queryArgs, tableProps } = useDataGridQuery();
  const columns = useAgentColumns();
  const { data, isError, isLoading } = useFindAgentsQuery(queryArgs);

  return (
    <section>
      <div className="wrapper">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/account/dashboard/overview">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Agents</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Agents Management</CardTitle>
              <CardDescription>View and manage all Agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table
                {...tableProps}
                data={data?.data}
                columns={columns}
                isError={isError}
                isLoading={isLoading}
                pin={{ right: ['actions'] }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AgentList;
