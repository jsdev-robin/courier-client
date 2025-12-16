'use client';

import {
  useGetSessionsQuery,
  useSignoutSessionMutation,
} from '@/libs/features/services/auth/authApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Skeleton } from '@repo/ui/components/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { formatDistanceToNow } from 'date-fns';
import { LogOut, Monitor, Smartphone, Tablet } from 'lucide-react';
import { toast } from 'sonner';
import SessionOutAll from './particles/SessionOutAll';

const Sessions = () => {
  const { data, isLoading: dataLoading } = useGetSessionsQuery();
  const [signoutSession, { isLoading }] = useSignoutSessionMutation();

  const handleSessionOut = async (token: string) => {
    await toast.promise(signoutSession(token).unwrap(), {
      loading: 'Kicking that device out...',
      success: (res) => res?.message || DEFAULT_SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardAction>
              <SessionOutAll />
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device & Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Logged In</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              {dataLoading ? (
                <TableBody>
                  {[...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {data?.data.sessions.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.deviceInfo?.deviceType === 'mobile' ? (
                            <span className="size-10 flex items-center justify-center rounded-md bg-blue-500/5 text-blue-500">
                              <Smartphone />
                            </span>
                          ) : item.deviceInfo?.deviceType === 'tablet' ? (
                            <span className="size-10 flex items-center justify-center rounded-md bg-purple-500/5 text-purple-500">
                              <Tablet />
                            </span>
                          ) : (
                            <span className="size-10 flex items-center justify-center rounded-md bg-green-500/5 text-green-500">
                              <Monitor />
                            </span>
                          )}
                          <div className="flex flex-col capitalize">
                            <span>
                              {item.deviceInfo?.deviceType ||
                                item.deviceInfo?.os}
                            </span>
                            <span>
                              {item.location?.city}, {item.location?.country}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.ip}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(item.loggedInAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(new Date(item.lastActivityAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>{item.riskScore}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status ? 'default' : 'destructive'}
                        >
                          {item.status ? 'Active' : 'Revoked'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={item.status ? 'destructive' : 'outline'}
                          size="sm"
                          onClick={() => handleSessionOut(item.token)}
                          disabled={isLoading || !item.status}
                        >
                          <LogOut />
                          {item.status ? ' Sign Out' : ' Signed Out'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Sessions;
