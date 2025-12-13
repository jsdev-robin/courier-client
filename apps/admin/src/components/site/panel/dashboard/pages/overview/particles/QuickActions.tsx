import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 grid-cols-2">
          <div className="bg-green-500/5 text-green-500">d</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
