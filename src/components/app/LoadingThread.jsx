import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoadingThreadList = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="flex-1">
                <CardTitle>
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </CardTitle>
                <CardDescription>
                  <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-64 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};